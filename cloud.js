'use strict';
// A autorização real é aplicada pelo banco, pelas políticas do arquivo SQL.
const cloud={
 client:null,user:null,profile:null,pending:null,saving:false,busy:false,channel:null,teacherLoading:false,realtimeState:null,
 status(t){document.getElementById('cloud-status').textContent=t},
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
 async enter(){
  if(this.busy)return;this.busy=true;
  try{
   const code=document.getElementById('code').value.trim().toUpperCase();
   const p=await this.authenticate(document.getElementById('cloud-email').value.trim(),document.getElementById('cloud-password').value);
   document.getElementById('cloud-password').value='';
   if(p.is_teacher||code!==p.participant_code)throw Error('Use o código atribuído a esta conta. Professores entram pela Área do professor.');
   await this.loadStudent(true);
  }catch(e){document.getElementById('login-error').textContent=e.message;this.status('Entrada não concluída.');}
  finally{this.busy=false;}
 },
 enqueue(r){
  if(!this.user||this.profile?.is_teacher||r.participant_code!==this.profile?.participant_code){this.status('Sem conta de aluno conectada.');return false;}
  this.pending={user_id:this.user.id,participant_code:r.participant_code,record:JSON.parse(JSON.stringify(r))};
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
   }catch(e){this.status('Falha ao salvar. Mantenha a página aberta e clique em Tentar salvar.');this.saving=false;return;}
  }
  this.saving=false;this.status('Salvo no banco online ✓');
 },
 async teacher(){
  if(!this.user||!this.profile?.is_teacher){document.getElementById('cloud-teacher').showModal();return;}
  this.startTeacher();await this.refreshTeacher();
 },
 async teacherLogin(form){
  if(this.busy)return;this.busy=true;
  try{const p=await this.authenticate(form.elements.email.value.trim(),form.elements.password.value);form.elements.password.value='';if(!p.is_teacher)throw Error('Esta conta não tem acesso de professor.');document.getElementById('cloud-teacher').close();await this.teacher();}
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
   if(p.data.is_teacher){window.navigationApp.ready=true;await window.navigationApp.open(window.navigationApp.path()==='/inicio'?(window.navigationApp.last()||'/professor'):window.navigationApp.path())}
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
  if(this.pending||this.saving){app.toast('Aguarde Salvo no banco online antes de sair.');return;}
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
