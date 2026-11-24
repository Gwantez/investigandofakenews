'use strict';
// A preferência fica no cookie; o código de acesso nunca é colocado em cookies.
// Este recurso não faz consultas de IP, chamadas de rede ou entrada automática.
const codeMemory = {
 cookieName: '__Secure-ifn-code-memory-choice',
 storageKey: 'ifn.remembered-code.v1',
 maxAge: 30 * 24 * 60 * 60,
 cookiePath: '/investigandofakenews/',
 dismissed: false,
 preferenceOverride: null,
 storageWarning: '',
 filledCode: null,
 validCode(code) { return typeof code === 'string' && /^[A-Z0-9_-]{3,20}$/.test(code); },
 preference() {
  if (this.preferenceOverride) return this.preferenceOverride;
  try {
   const entry = document.cookie.split(';').map(s => s.trim()).find(s => s.startsWith(this.cookieName + '='));
   const value = entry ? decodeURIComponent(entry.slice(this.cookieName.length + 1)) : '';
   return value === 'v1.accepted' ? 'accepted' : value === 'v1.declined' ? 'declined' : null;
  } catch { return null; }
 },
 setPreference(accepted) {
  const value = accepted ? 'v1.accepted' : 'v1.declined';
  this.preferenceOverride = null;
  try {
   document.cookie = this.cookieName + '=' + value + '; Max-Age=' + this.maxAge + '; Path=' + this.cookiePath + '; SameSite=Strict; Secure';
   if (this.preference() === (accepted ? 'accepted' : 'declined')) return true;
  } catch {}
  this.preferenceOverride = 'declined'; return false;
 },
 removeSaved() { try { localStorage.removeItem(this.storageKey); } catch {} },
 saved() {
  if (this.preference() !== 'accepted') { this.removeSaved(); return null; }
  try {
   const value = JSON.parse(localStorage.getItem(this.storageKey));
   if (value && this.validCode(value.code) && Number.isFinite(value.expiresAt) && value.expiresAt > Date.now()) return value;
  } catch {}
  this.removeSaved(); return null;
 },
 rememberStudent(profile) {
  if (this.preference() !== 'accepted' || !profile || profile.is_teacher || !this.validCode(profile.participant_code)) return false;
  try {
   const value = { code: profile.participant_code, expiresAt: Date.now() + this.maxAge * 1000 };
   localStorage.setItem(this.storageKey, JSON.stringify(value));
   if (localStorage.getItem(this.storageKey) !== JSON.stringify(value)) throw Error('storage');
   this.storageWarning = ''; this.render(); return true;
  } catch {
   this.removeSaved();
   this.storageWarning = 'Este navegador não permitiu guardar o código. Anote ou copie seu código para voltar.';
   this.render(); window.app?.toast(this.storageWarning); return false;
  }
 },
 prefill() {
  const value = this.saved(), input = document.getElementById('code');
  if (value && input && !input.value.trim()) { input.value = value.code; this.filledCode = value.code; }
  else if (!value && input && this.filledCode && input.value === this.filledCode) input.value = '';
  if (!value) this.filledCode = null;
  this.render();
 },
 choose(accepted) {
  this.dismissed = true; this.storageWarning = '';
  const saved = this.saved();
  if (!this.setPreference(accepted)) {
   this.removeSaved();
   if (saved && document.getElementById('code')?.value === saved.code) document.getElementById('code').value = '';
   this.storageWarning = 'Não foi possível salvar a preferência neste navegador. O código não será guardado. Anote ou copie seu código.';
   this.render();
   window.app?.toast(this.storageWarning);
   return false;
  }
  if (accepted) {
   this.rememberStudent(window.cloud?.profile);
  } else {
   this.removeSaved();
   if (saved && document.getElementById('code')?.value === saved.code) document.getElementById('code').value = '';
  }
  this.render();
  return true;
 },
 forget(silent = false) {
  const value = this.saved();
  this.dismissed = true; this.removeSaved(); this.setPreference(false); this.storageWarning = '';
  const input = document.getElementById('code');
  if (value && input?.value === value.code) input.value = '';
  this.render();
  if (!silent) window.app?.toast('Código removido deste navegador. Suas respostas continuam salvas na plataforma.');
 },
 render() {
  const value = this.saved(), preference = this.preference();
  const banner = document.getElementById('code-memory-banner');
  if (banner) banner.hidden = this.dismissed || preference !== null;
  const hint = document.getElementById('remembered-code-hint');
  if (hint) hint.hidden = !value;
  const text = this.storageWarning || (value ? 'Um código está salvo neste navegador por até 30 dias. Use “Esquecer código salvo” para removê-lo.'
   : preference === 'accepted' ? 'Opção ativada. O código será guardado após entrar ou criar uma conta de aluno.'
   : 'A opção de lembrar código está desativada. Você pode continuar usando a plataforma normalmente.');
  const status = document.getElementById('code-memory-status');
  if (status) status.textContent = text;
  const created = document.getElementById('created-memory-status');
  if (created) created.textContent = value ? 'Código guardado neste navegador. Ao usar “Sair da conta”, ele será removido.' : 'Anote ou copie seu código. Ele ainda não está guardado neste navegador.';
  const forget = document.getElementById('code-memory-forget');
  if (forget) forget.disabled = !value;
 },
 settings() { this.render(); document.getElementById('code-memory-settings').showModal(); },
 init() { this.prefill(); }
};
window.codeMemory = codeMemory;
codeMemory.init();
window.addEventListener('storage', event => {
 if (event.key === codeMemory.storageKey || event.key === null) codeMemory.prefill();
});
