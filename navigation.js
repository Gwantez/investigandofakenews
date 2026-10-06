'use strict';
// URLs com fragmentos funcionam também no GitHub Pages, inclusive ao recarregar.
const navigation={
 suspended:false,ready:false,
 path(){return location.hash.slice(1)||'/inicio'},
 remember(path){if(cloud.user)try{sessionStorage.setItem('midiacheck-route:'+cloud.user.id,path)}catch{}},
 last(){try{return sessionStorage.getItem('midiacheck-route:'+cloud.user.id)}catch{return null}},
 current(id){
  if(id==='module')return '/habilidade/'+(app.moduleIndex+1);
  if(id==='quiz'&&app.run){const r=app.run;return r.mode==='module'?'/missao/'+(r.mi+1)+'/'+(QBANK.modules[r.mi].items.findIndex(q=>q.id===r.ids[0])+1):'/prova/'+r.mode+'/'+(r.index+1)}
  if(id==='exam-result')return '/resultado/'+(app.lastExam?.mode||'diagnostic');
  return ({home:'/inicio',login:'/entrar','student-signup':'/aluno/cadastro','student-code':'/aluno/codigo','teacher-login':'/professor/entrar','teacher-signup':'/professor/cadastro',dashboard:'/trilha',teacher:'/professor',survey:'/avaliacao',result:'/evolucao',achievements:'/conquistas'})[id]||'/inicio';
 },
 record(id){if(this.suspended)return;const path=this.current(id);if(this.path()!==path)history.pushState(null,'','#'+path);this.remember(path);document.title='MídiaCheck · '+({home:'Início',login:'Entrar',dashboard:'Minha trilha',module:'Habilidade',quiz:'Investigação',teacher:'Professor',survey:'Avaliação',result:'Evolução',achievements:'Conquistas','exam-result':'Resultado'}[id]||'Investigação')},
 async open(path=this.path()){
  if(!this.ready)return;
  this.suspended=true;
  try{
   document.querySelectorAll('dialog[open]').forEach(d=>d.close());
   const p=path.split('/').filter(Boolean),page=p[0];
   if(page==='inicio')app.home();
   else if(page==='entrar')cloud.loginScreen.call(app);
   else if(page==='aluno'&&p[1]==='cadastro')await cloud.studentSignupScreen();
   else if(page==='aluno'&&p[1]==='codigo')cloud.codeScreen();
   else if(page==='professor'&&p[1]==='cadastro')app.show('teacher-signup');
   else if(page==='professor'&&p[1]==='entrar')app.show('teacher-login');
   else if(page==='professor'){
    if(cloud.profile?.is_teacher){await cloud.teacher();if(p[1]&&app.records[p[1]])app.details(p[1])}
    else app.show('teacher-login')
   }else if(!app.record())cloud.loginScreen.call(app);
   else if(page==='habilidade')app.module(Number(p[1])-1);
   else if(page==='prova'||page==='missao'){
    const d=app.record().draft;
    if(d){app.resume();if(page==='prova'&&d.mode===p[1])app.jump(Math.max(0,Math.min(d.ids.length-1,Number(p[2])-1||0)))}else app.dashboard();
   }else if(page==='resultado'){if(app.record()[p[1]])app.viewExam(p[1]);else app.dashboard();}
   else if(page==='avaliacao')app.survey();
   else if(page==='evolucao')app.result();
   else if(page==='conquistas')app.achievements();
   else app.dashboard();
  }finally{this.suspended=false;const active=document.querySelector('.screen.active');if(active)this.record(active.id);if(active?.id==='teacher'&&path.startsWith('/professor/')&&!document.getElementById('teacher-details').classList.contains('hidden')&&document.getElementById('teacher-details').dataset.code)this.detail(document.getElementById('teacher-details').dataset.code)}
 },
 detail(code){if(this.suspended)return;const path='/professor/'+encodeURIComponent(code);if(this.path()!==path)history.pushState(null,'','#'+path);this.remember(path)}
};
const originalShow=app.show;
app.show=function(id){originalShow.call(this,id);navigation.record(id)};
const originalRender=app.renderQuestion;
app.renderQuestion=function(){originalRender.call(this);navigation.record('quiz')};
const originalDetails=app.details;
app.details=function(code){originalDetails.call(this,code);document.getElementById('teacher-details').dataset.code=code;navigation.detail(code)};
const originalInit=app.init;
app.init=function(){if(navigation.initialized)return;navigation.initialized=true;navigation.suspended=true;originalInit.call(this);originalShow.call(this,'connecting');navigation.suspended=false;cloud.boot()};
window.addEventListener('hashchange',()=>{if(navigation.ready&&navigation.path()!==navigation.current(document.querySelector('.screen.active')?.id))navigation.open()});
window.navigationApp=navigation;
