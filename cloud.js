'use strict';
// A autorização real é aplicada pelo banco, pelas políticas do arquivo SQL.
const cloud={
 client:null,user:null,profile:null,pending:null,saving:false,busy:false,
 status(t){document.getElementById('cloud-status').textContent=t},
 setup(){
  const c=window.MIDIACHECK_CONFIG;
  if(!window.supabase||!c?.url.startsWith('https://')||!c.key||c.key.includes('COLE_'))throw Error('Preencha config.js com a URL e a chave publicável do Supabase.');
  if(!this.client)this.client=window.supabase.createClient(c.url,c.key,{auth:{persistSession:false}});
 },
 async authenticate(email,password){
  this.setup();
  if(this.pending||this.saving)throw Error('Aguarde o salvamento antes de trocar de conta.');
  const {data,error}=await this.client.auth.signInWithPassword({email,password});
  if(error)throw Error('E-mail ou senha incorretos, ou conta não confirmada.');
  const p=await this.client.from('profiles').select('*').eq('id',data.user.id).single();
  if(p.error){await this.client.auth.signOut();this.user=null;this.profile=null;throw Error('Conta sem perfil. Execute o cadastro SQL indicado no guia.');}
  this.user=data.user;this.profile=p.data;app.records={};app.student=null;
  return p.data;
 },
 async enter(){
  if(this.busy)return;this.busy=true;
  try{
   const code=document.getElementById('code').value.trim().toUpperCase();
   const p=await this.authenticate(document.getElementById('cloud-email').value.trim(),document.getElementById('cloud-password').value);
   document.getElementById('cloud-password').value='';
   if(p.is_teacher||code!==p.participant_code)throw Error('Use o código atribuído a esta conta. Professores entram pela Área do professor.');
   const {data,error}=await this.client.from('progress').select('record').eq('user_id',this.user.id).maybeSingle();
   if(error)throw Error('Não foi possível ler o progresso. Confira conexão e as políticas SQL.');
   if(data&&!app.validRecord(data.record))throw Error('Registro incompatível com esta versão.');
   app.student=code;app.records[code]=data?data.record:app.newRecord(code);
   app.records[code].avatar=app.avatarChoice;
   app.save(app.record());app.run=null;app.dashboard();
  }catch(e){document.getElementById('login-error').textContent=e.message;this.status('Entrada não concluída.');}
  finally{this.busy=false;}
 },
 enqueue(r){
  if(!this.user||this.profile?.is_teacher||r.participant_code!==this.profile?.participant_code){this.status('Sem conta de aluno conectada.');return false;}
  this.pending={user_id:this.user.id,participant_code:r.participant_code,record:JSON.parse(JSON.stringify(r))};
  this.retry();return true;
 },
 async retry(){
  if(this.saving||!this.pending)return;
  this.saving=true;
  while(this.pending){
   const next=this.pending;this.status('Salvando online…');
   try{
    const {error}=await this.client.from('progress').upsert(next,{onConflict:'user_id'});
    if(error)throw error;
    if(this.pending===next)this.pending=null;
   }catch(e){this.status('Falha ao salvar. Mantenha a página aberta e clique em Tentar salvar.');this.saving=false;return;}
  }
  this.saving=false;this.status('Salvo no banco online ✓');
 },
 async teacher(){
  if(!this.user||!this.profile?.is_teacher){document.getElementById('cloud-teacher').showModal();return;}
  try{
   let all=[],start=0;
   while(true){const {data,error}=await this.client.from('progress').select('record').order('user_id').range(start,start+499);if(error)throw error;all.push(...data);if(data.length<500)break;start+=500;}
   if(all.some(x=>!app.validRecord(x.record)))throw Error('Há um registro incompatível no banco.');
   app.records=Object.fromEntries(all.map(x=>[x.record.participant_code,x.record]));
   this.renderTeacher.call(app);this.status('Resultados atualizados do banco ✓');
  }catch(e){app.toast('Não foi possível carregar resultados: '+e.message);}
 },
 async teacherLogin(form){
  if(this.busy)return;this.busy=true;
  try{const p=await this.authenticate(form.elements.email.value.trim(),form.elements.password.value);form.elements.password.value='';if(!p.is_teacher)throw Error('Esta conta não tem acesso de professor.');document.getElementById('cloud-teacher').close();await this.teacher();}
  catch(e){document.getElementById('cloud-teacher-error').textContent=e.message;}
  finally{this.busy=false;}
 },
 async logout(){
  if(this.pending||this.saving){app.toast('Aguarde Salvo no banco online antes de sair.');return;}
  if(this.client)await this.client.auth.signOut();this.user=null;this.profile=null;app.records={};app.student=null;app.run=null;app.home();this.status('Conta desconectada.');
 }
};
cloud.renderTeacher=app.teacher;
app.enter=()=>cloud.enter();
app.teacher=()=>cloud.teacher();
app.persist=()=>true; // Registros pessoais não ficam gravados no navegador compartilhado.
app.save=function(r){r.updated_at=new Date().toISOString();this.records[r.participant_code]=r;return cloud.enqueue(r)};
app.restore=()=>app.toast('Importação não disponível nesta versão online. Preserve o backup original.');
window.cloud=cloud;
window.addEventListener('beforeunload',e=>{if(cloud.pending||cloud.saving){e.preventDefault();e.returnValue='';}});
