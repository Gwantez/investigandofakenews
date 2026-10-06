import { createClient } from 'npm:@supabase/supabase-js@2.117.2';
const url=Deno.env.get('SUPABASE_URL')!;
const service=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const anon=Deno.env.get('SUPABASE_ANON_KEY')!;
const options={auth:{persistSession:false,autoRefreshToken:false}};
const admin=createClient(url,service,options);
const cors={'Access-Control-Allow-Origin':'https://gwantez.github.io','Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type','Access-Control-Allow-Methods':'POST, OPTIONS','Cache-Control':'no-store'};
const response=(data:unknown,status=200)=>new Response(JSON.stringify(data),{status,headers:{...cors,'Content-Type':'application/json'}});
const token=(n=12)=>Array.from(crypto.getRandomValues(new Uint8Array(n)),v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();
const cleanName=(v:unknown)=>typeof v==='string'?v.trim().replace(/\s+/g,' ').slice(0,80):'';
const fail=(message:string,status=400)=>{throw {message,status}};
async function sessionFor(userId:string){
 const {data:user,error}=await admin.auth.admin.getUserById(userId);if(error||!user.user?.email)fail('Código não encontrado.',401);
 const {data:link,error:le}=await admin.auth.admin.generateLink({type:'magiclink',email:user.user.email});if(le||!link.properties?.hashed_token)fail('Não foi possível entrar. Tente novamente.',503);
 const auth=createClient(url,anon,options);
 const {data,error:ve}=await auth.auth.verifyOtp({token_hash:link.properties.hashed_token,type:'magiclink'});if(ve||!data.session)fail('Não foi possível abrir a sessão. Tente novamente.',503);
 return {access_token:data.session.access_token,refresh_token:data.session.refresh_token};
}
async function teacher(req:Request){
 const jwt=req.headers.get('Authorization')?.replace(/^Bearer\s+/i,'')||'';
 const {data,error}=await admin.auth.getUser(jwt);if(error||!data.user)fail('Entre com sua conta de professor.',401);
 const {data:p}=await admin.from('profiles').select('*').eq('id',data.user.id).maybeSingle();
 if(!p?.is_teacher)fail('Acesso restrito a professores.',403);return p;
}
Deno.serve(async req=>{
 if(req.method==='OPTIONS')return new Response('ok',{headers:cors});
 if(req.method!=='POST')return response({error:'Use POST.'},405);
 try{
  if(Number(req.headers.get('Content-Length')||0)>8192)fail('Solicitação muito grande.');
  const raw=await req.text();if(raw.length>8192)fail('Solicitação muito grande.');const body=JSON.parse(raw);
  const ip=req.headers.get('x-forwarded-for')||'unknown';
  const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(ip))),v=>v.toString(16).padStart(2,'0')).join('');
  const limits:Record<string,number>={'student-register':60,'student-login':600,'teacher-register':12,'classes':600};
  const {data:allowed,error:rateError}=await admin.rpc('midiacheck_rate_limit',{bucket_key:digest+':'+String(body.action),max_hits:limits[body.action]||120});
  if(rateError)fail('Serviço temporariamente indisponível.',503);if(!allowed)fail('Muitas tentativas. Aguarde um minuto.',429);
  if(body.action==='classes'){
   const {data,error}=await admin.from('classrooms').select('id,class_number,teacher_name').order('class_number');if(error)throw error;return response({classes:data});
  }
  if(body.action==='student-register'){
   const name=cleanName(body.name);if(name.length<2)fail('Informe seu nome.');
   const {data:room}=await admin.from('classrooms').select('id,class_number').eq('id',String(body.classroom_id)).maybeSingle();if(!room)fail('Selecione uma turma cadastrada pelo professor.');
   const stem=name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z]/g,'').slice(0,3).toUpperCase()||'ALU';
   // Código nominal + turma + parte aleatória: colegas com o mesmo nome têm contas diferentes.
   const code=stem+'-'+room.class_number+'-'+token(5);
   const email=crypto.randomUUID()+'@aluno.midiacheck.invalid';
   const {data:user,error:ue}=await admin.auth.admin.createUser({email,email_confirm:true,password:token(32)});if(ue||!user.user)fail('Não foi possível criar seu código.',503);
   const {error:pe}=await admin.from('profiles').insert({id:user.user.id,participant_code:code,is_teacher:false,code_login:true,full_name:name,class_number:room.class_number,classroom_id:room.id});
   if(pe){await admin.auth.admin.deleteUser(user.user.id);fail('Não foi possível cadastrar. Tente novamente.',503);}
   return response({code,session:await sessionFor(user.user.id)});
  }
  if(body.action==='student-login'){
   const code=String(body.code||'').trim().toUpperCase();if(!/^[A-Z0-9_-]{3,20}$/.test(code))fail('Confira seu código.',401);
   const {data:p}=await admin.from('profiles').select('id,is_teacher,code_login').eq('participant_code',code).maybeSingle();
   if(!p||p.is_teacher||!p.code_login)fail('Código não encontrado. Confira o código completo.',401);
   return response({session:await sessionFor(p.id)});
  }
  if(body.action==='teacher-register'){
   const name=cleanName(body.name),email=String(body.email||'').trim(),password=String(body.password||'');if(name.length<2||!email.includes('@')||password.length<8)fail('Informe nome, e-mail e uma senha com pelo menos 8 caracteres.');
   // E-mail é o identificador de entrada. O cadastro não depende de serviço de envio de e-mails.
   // Uma conta nova só acompanha turmas próprias ou recebidas por convite.
   const {data:created,error:ce}=await admin.auth.admin.createUser({email,password,email_confirm:true,user_metadata:{full_name:name}});
   if(ce||!created.user)fail('Não foi possível cadastrar. Se já tem conta com este e-mail, use Entrar como professor.');
   const {error:pe}=await admin.from('profiles').insert({id:created.user.id,participant_code:'PROF_'+token(6),is_teacher:true,full_name:name});
   if(pe){await admin.auth.admin.deleteUser(created.user.id);fail('Não foi possível criar seu perfil. Tente novamente.',503);}
   const auth=createClient(url,anon,options);
   const {data:login,error:le}=await auth.auth.signInWithPassword({email,password});
   if(le||!login.session)return response({message:'Conta criada. Use Entrar como professor com o e-mail e a senha escolhidos.',session:null});
   return response({message:'Conta de professor criada.',session:{access_token:login.session.access_token,refresh_token:login.session.refresh_token}});
  }
  const p=await teacher(req);
  if(body.action==='teacher-classes'){
   let q=admin.from('class_teachers').select('classrooms(id,class_number,teacher_name,teacher_invite)').eq('teacher_id',p.id);
   const {data,error}=await q;if(error)throw error;
   return response({classes:data.map(m=>m.classrooms)});
  }
  if(body.action==='create-class'){
   const number=String(body.class_number||'').trim();if(!/^[0-9]{1,5}$/.test(number))fail('Use de 1 a 5 números para a turma.');
   const {data:room,error}=await admin.from('classrooms').insert({class_number:number,teacher_name:p.full_name||'Professor',teacher_invite:token(12)}).select().single();
   if(error)fail('Essa turma já existe. Para compartilhar a turma, use o convite do professor responsável.');
   const {error:me}=await admin.from('class_teachers').insert({classroom_id:room.id,teacher_id:p.id});if(me){await admin.from('classrooms').delete().eq('id',room.id);throw me;}
   return response({classroom:room});
  }
  if(body.action==='join-class'){
   const invite=String(body.invite||'').trim().toUpperCase();const {data:room}=await admin.from('classrooms').select('id,class_number').eq('teacher_invite',invite).maybeSingle();if(!room)fail('Convite de professor não encontrado.');
   const {error}=await admin.from('class_teachers').upsert({classroom_id:room.id,teacher_id:p.id});if(error)throw error;return response({classroom:room});
  }
  return response({error:'Ação não reconhecida.'},400);
 }catch(e){return response({error:e?.status?e.message:'Não foi possível concluir. Tente novamente.'},e?.status||500)}
});
