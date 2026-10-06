'use strict';
// A autorização real é aplicada pelo banco, pelas políticas do arquivo SQL.
const cloud={
 client:null,user:null,profile:null,pending:null,saving:false,busy:false,channel:null,teacherLoading:false,realtimeState:null,
 status(t){this.lastStatus=t;const button=document.getElementById('top-logout');if(button)button.hidden=!this.user;},
 setup(){
  const c=window.MIDIACHECK_CONFIG;
  if(!window.supabase||!c?.url.startsWith('https://')||!c.key||c.key.includes('COLE_'))throw Error('Preencha config.js com a URL e a chave publicável do Supabase.');
  if(!this.client)this.client=window.supabase.createClient(c.url,c.key,{auth:{persistSession:true,autoRefreshToken:true,storage:window.sessionStorage,storageKey:'midiacheck-auth'}});
 },
 async authenticate(email,password){
  this.setup();
  if(this.pending||this.saving)throw Error('Aguarde o salvamento antes de trocar de conta.');
  const {data,error}=await this.client.auth.signInWithPassword({email,password});
  if(error)throw Error('E-mail ou senha incorretos, ou conta não confirmada.');
  const p=await this.client.from('profiles').select('*').eq('id',data.user.id).single();
  if(p.error){await this.client.auth.signOut();this.user=null;this.profile=null;throw Error('Conta sem perfil. Execute o cadastro SQL indicado no guia.');}
  this.stopTeacher();this.user=data.user;this.profile=p.data;app.records={};app.student=null;
  return p.data;
 },
 async access(body){
  this.setup();const {data}=await this.client.auth.getSession();
  const res=await fetch(window.MIDIACHECK_CONFIG.url+'/functions/v1/midiacheck-access',{method:'POST',headers:{'Content-Type':'application/json',apikey:window.MIDIACHECK_CONFIG.key,...(data.session?{Authorization:'Bearer '+data.session.access_token}:{})},body:JSON.stringify(body)});
  const result=await res.json();if(!res.ok)throw Error(result.error||'Não foi possível concluir. Tente novamente.');return result;
 },
 async useSession(session){
  if(this.pending||this.saving)throw Error('Aguarde o salvamento antes de trocar de conta.');
  this.setup();const {data,error}=await this.client.auth.setSession(session);if(error)throw Error('Não foi possível abrir a sessão.');
  const p=await this.client.from('profiles').select('*').eq('id',data.user.id).single();if(p.error)throw Error('Não foi possível carregar sua conta.');
  this.stopTeacher();this.user=data.user;this.profile=p.data;app.records={};app.student=null;
 },
 async enter(){
  if(this.busy)return;this.busy=true;
  try{if(this.pending||this.saving)throw Error('Aguarde o salvamento.');const code=document.getElementById('code').value.trim().toUpperCase();
   const result=await this.access({action:'student-login',code});await this.useSession(result.session);await this.loadStudent(true);
  }catch(e){document.getElementById('login-error').textContent=e.message;this.status('Entrada não concluída.');}
  finally{this.busy=false;}
 },
 async studentSignupScreen(){
  app.show('student-signup');const select=document.getElementById('student-class');
  try{const {classes}=await this.access({action:'classes'});select.innerHTML='<option value="">Selecione sua turma</option>'+classes.map(c=>'<option value="'+c.id+'" data-number="'+Scenes.escape(c.class_number)+'">Turma '+Scenes.escape(c.class_number)+' · '+Scenes.escape(c.teacher_name)+'</option>').join('');document.getElementById('class-help').textContent=classes.length?'Escolha sua turma.':'Seu professor precisa cadastrar a turma antes de você criar o código.'}
  catch(e){document.getElementById('student-signup-error').textContent=e.message;}
 },
 previewCode(){const name=document.getElementById('student-name').value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z]/g,'').toUpperCase(),number=document.getElementById('student-class').selectedOptions[0]?.dataset.number||'';document.getElementById('student-code-preview').textContent=name&&number?'Seu código: '+name+number:'Seu código será seu nome + número da turma, sem espaços. Exemplo: JOAO301.';},
 async registerStudent(form){
  if(this.busy)return;this.busy=true;const button=form.querySelector('[type="submit"]');button.disabled=true;
  try{if(this.user)throw Error('Saia da conta atual antes de criar outro código.');if(this.pending||this.saving)throw Error('Aguarde o salvamento.');const result=await this.access({action:'student-register',name:form.elements.name.value,classroom_id:form.elements.classroom_id.value});
   await this.useSession(result.session);await this.loadStudent(true);this.codeScreen();
  }catch(e){document.getElementById('student-signup-error').textContent=e.message;}
  finally{this.busy=false;button.disabled=false;}
 },
 codeScreen(){if(!this.profile||this.profile.is_teacher)return app.login();document.getElementById('created-code').textContent=this.profile.participant_code;document.getElementById('created-student').textContent=this.profile.full_name+' · Turma '+this.profile.class_number;app.show('student-code')},
 async copyCode(){try{await navigator.clipboard.writeText(this.profile.participant_code);app.toast('Código copiado. Guarde para entrar novamente.')}catch{app.toast('Selecione e copie o código mostrado na tela.')}},
 async registerTeacher(form){
  if(this.busy)return;this.busy=true;const button=form.querySelector('[type="submit"]');button.disabled=true;
  try{if(this.user)throw Error('Saia da conta atual antes de criar outra conta.');const result=await this.access({action:'teacher-register',name:form.elements.name.value,email:form.elements.email.value,password:form.elements.password.value});form.elements.password.value='';document.getElementById('teacher-signup-message').textContent=result.message;if(result.session){await this.useSession(result.session);await this.teacher()}}
  catch(e){document.getElementById('teacher-signup-message').textContent=e.message;}
  finally{this.busy=false;button.disabled=false;}
 },
 async teacherClasses(){
  try{const {classes}=await this.access({action:'teacher-classes'});document.getElementById('teacher-class-list').innerHTML=classes.length?classes.map(c=>'<div class="class-card"><b>Turma '+Scenes.escape(c.class_number)+'</b><p>Convite para outro professor: <code>'+Scenes.escape(c.teacher_invite)+'</code></p></div>').join(''):'<p>Nenhuma turma cadastrada. Crie a primeira turma acima.</p>'}
  catch(e){document.getElementById('class-management-message').textContent=e.message;}
 },
 async createClass(form){const button=form.querySelector('button');button.disabled=true;try{await this.access({action:'create-class',class_number:form.elements.number.value});form.reset();document.getElementById('class-management-message').textContent='Turma criada. Os alunos já podem se cadastrar.';await this.teacherClasses()}catch(e){document.getElementById('class-management-message').textContent=e.message}finally{button.disabled=false}},
 async joinClass(form){const button=form.querySelector('button');button.disabled=true;try{await this.access({action:'join-class',invite:form.elements.invite.value});form.reset();document.getElementById('class-management-message').textContent='Você agora acompanha essa turma.';await this.teacherClasses();await this.teacher()}catch(e){document.getElementById('class-management-message').textContent=e.message}finally{button.disabled=false}},
 enqueue(r){
  if(!this.user||this.profile?.is_teacher||r.participant_code!==this.profile?.participant_code){this.status('Sem conta de aluno conectada.');return false;}
  r.full_name=this.profile.full_name||r.full_name||'';r.class_number=this.profile.class_number||r.class_number||'';
  this.pending={user_id:this.user.id,classroom_id:this.profile.classroom_id||null,participant_code:r.participant_code,record:JSON.parse(JSON.stringify(r))};
  try{sessionStorage.setItem('midiacheck-pending:'+this.user.id,JSON.stringify(this.pending))}catch{this.status('Não foi possível guardar o rascunho nesta aba. Aguarde o salvamento online.');}
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
    if(this.pending===next){this.pending=null;try{sessionStorage.removeItem('midiacheck-pending:'+next.user_id)}catch{}}
   }catch(e){this.status('Falha ao salvar. Nova tentativa automática em instantes.');this.saving=false;if(!this.saveFailureShown){app.toast('Não foi possível salvar agora. Tentaremos novamente automaticamente.');this.saveFailureShown=true;}clearTimeout(this.saveRetryTimer);this.saveRetryTimer=setTimeout(()=>this.retry(),5000);return;}
  }
  this.saving=false;this.saveFailureShown=false;clearTimeout(this.saveRetryTimer);this.status('Salvo no banco online ✓');
 },
 async teacher(){
  if(!this.user||!this.profile?.is_teacher){app.show('teacher-login');return;}
  this.startTeacher();await Promise.all([this.refreshTeacher(),this.teacherClasses()]);
 },
 async teacherLogin(form){
  if(this.busy)return;this.busy=true;
  try{const p=await this.authenticate(form.elements.email.value.trim(),form.elements.password.value);form.elements.password.value='';if(!p.is_teacher)throw Error('Esta conta não tem acesso de professor.');await this.teacher();}
  catch(e){document.getElementById('cloud-teacher-error').textContent=e.message;}
  finally{this.busy=false;}
 },
 async loadStudent(fromLogin=false){
  const uid=this.user.id,code=this.profile.participant_code;
  const {data,error}=await this.client.from('progress').select('record').eq('user_id',uid).maybeSingle();
  if(error)throw Error('Não foi possível recuperar o progresso. Tente entrar novamente; suas respostas não foram apagadas.');
  if(data&&!app.validRecord(data.record))throw Error('Registro incompatível com esta versão.');
  let record=data?data.record:app.newRecord(code),journal=null;
  try{journal=JSON.parse(sessionStorage.getItem('midiacheck-pending:'+uid))}catch{}
  if(journal?.user_id===uid&&journal.participant_code===code&&app.validRecord(journal.record)&&(!data||Date.parse(journal.record.updated_at)>Date.parse(record.updated_at)))record=journal.record;
  app.student=code;app.records={[code]:record};app.run=null;
  if(!data&&fromLogin)record.avatar=app.avatarChoice;
  app.avatarChoice=record.avatar;
  if(!data||record===journal?.record)this.enqueue(record);else this.status('Progresso recuperado do banco ✓');
  window.navigationApp.ready=true;
  // Um rascunho em andamento tem prioridade ao entrar novamente com o código.
  if(fromLogin&&record.draft)app.resume();
  else {const last=window.navigationApp.last();await window.navigationApp.open(fromLogin?(last&&!['/inicio','/entrar'].includes(last)?last:'/trilha'):window.navigationApp.path());}
 },
 async boot(){
  try{
   this.setup();this.status('Recuperando sua sessão…');
   const {data,error}=await this.client.auth.getSession();if(error)throw error;
   if(!data.session){window.navigationApp.ready=true;await window.navigationApp.open();this.status('Entre para conectar ao banco.');return;}
   const {data:verified,error:authError}=await this.client.auth.getUser();if(authError)throw authError;
   const p=await this.client.from('profiles').select('*').eq('id',verified.user.id).single();if(p.error)throw p.error;
   this.user=verified.user;this.profile=p.data;
   if(p.data.is_teacher){window.navigationApp.ready=true;await window.navigationApp.open(['/inicio','/professor/cadastro','/professor/entrar'].includes(window.navigationApp.path())?'/professor':window.navigationApp.path())}
   else await this.loadStudent();
  }catch(e){window.navigationApp.ready=true;this.loginScreen.call(app);document.getElementById('login-error').textContent='Não foi possível recuperar a sessão. Entre novamente para continuar do progresso salvo.';this.status('Não foi possível conectar. Tente novamente.');}
 },
 stopTeacher(){
  clearInterval(this.teacherTimer);clearTimeout(this.teacherDebounce);
  if(this.channel&&this.client)this.client.removeChannel(this.channel);
  this.channel=null;this.realtimeState=null;
 },
 startTeacher(){
  if(this.channel||!this.profile?.is_teacher)return;
  this.channel=this.client.channel('midiacheck-professor:'+this.user.id)
   .on('postgres_changes',{event:'INSERT',schema:'public',table:'progress'},()=>this.scheduleTeacher())
   .on('postgres_changes',{event:'UPDATE',schema:'public',table:'progress'},()=>this.scheduleTeacher())
   .subscribe(state=>{this.realtimeState=state;if(state==='SUBSCRIBED')this.scheduleTeacher();else if(state==='CHANNEL_ERROR'||state==='TIMED_OUT')this.status('Reconectando atualizações. Busca automática a cada 15 segundos.');});
  this.teacherTimer=setInterval(()=>{if(document.visibilityState!=='hidden'&&document.getElementById('teacher').classList.contains('active'))this.refreshTeacher(false)},15000);
 },
 scheduleTeacher(){clearTimeout(this.teacherDebounce);this.teacherDebounce=setTimeout(()=>this.refreshTeacher(false),150)},
 async refreshTeacher(show=true){
  if(!this.profile?.is_teacher)return;
  if(this.teacherLoading){this.teacherAgain=true;return;}
  this.teacherLoading=true;const uid=this.user.id;
  try{
   let all=[],start=0;
   while(true){const {data,error}=await this.client.from('progress').select('record').order('user_id').range(start,start+499);if(error)throw error;all.push(...data);if(data.length<500)break;start+=500;}
   if(this.user?.id!==uid||!this.profile?.is_teacher)return;
   if(all.some(x=>!app.validRecord(x.record)))throw Error('Há um registro incompatível no banco.');
   app.records=Object.fromEntries(all.map(x=>[x.record.participant_code,x.record]));
   if(show||document.getElementById('teacher').classList.contains('active')){
    const term=document.getElementById('search').value,details=document.getElementById('teacher-details'),code=details.classList.contains('hidden')?null:details.dataset.code;
    const scroll=window.scrollY,path=window.navigationApp.path();
    const suspended=window.navigationApp.suspended;window.navigationApp.suspended=true;
    this.renderTeacher.call(app);document.getElementById('search').value=term;app.teacherTable(term);
    if(code&&app.records[code]){app.details(code);window.scrollTo({top:scroll,behavior:'instant'})}
    window.navigationApp.suspended=suspended;
    if(show&&!suspended)window.navigationApp.record('teacher');else if(!show&&window.navigationApp.path()!==path)history.replaceState(null,'','#'+path);
   }
   this.status(this.realtimeState==='SUBSCRIBED'?'Professor: atualizações em tempo real ✓':'Professor: atualização automática ativa ✓');
  }catch(e){this.status('Falha ao atualizar resultados. Nova tentativa automática.');if(show)app.toast('Não foi possível carregar resultados: '+e.message);}
  finally{this.teacherLoading=false;if(this.teacherAgain){this.teacherAgain=false;this.scheduleTeacher()}}
 },
 async logout(){
  if(this.pending||this.saving){app.toast('Ainda estamos salvando suas respostas. Aguarde um instante antes de sair.');return;}
  this.stopTeacher();if(this.client){const {error}=await this.client.auth.signOut({scope:'local'});if(error){app.toast('Não foi possível sair. Tente novamente.');return;}}this.user=null;this.profile=null;app.records={};app.student=null;app.run=null;app.home();window.navigationApp.ready=true;this.status('Conta desconectada.');
 }
};
cloud.renderTeacher=app.teacher;
cloud.loginScreen=app.login;
app.login=function(){if(cloud.user&&!cloud.profile?.is_teacher&&this.record()){if(this.record().draft)this.resume();else this.dashboard()}else cloud.loginScreen.call(this)};
app.enter=()=>cloud.enter();
app.teacher=()=>cloud.teacher();
app.persist=()=>true; // Registros pessoais não ficam gravados no navegador compartilhado.
app.save=function(r){r.updated_at=new Date().toISOString();this.records[r.participant_code]=r;return cloud.enqueue(r)};
app.restore=()=>app.toast('Importação não disponível nesta versão online. Preserve o backup original.');
window.cloud=cloud;
window.addEventListener('beforeunload',e=>{if(cloud.pending||cloud.saving){e.preventDefault();e.returnValue='';}});

window.addEventListener('online',()=>{cloud.retry();if(cloud.profile?.is_teacher)cloud.scheduleTeacher()});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&cloud.profile?.is_teacher)cloud.scheduleTeacher()});
