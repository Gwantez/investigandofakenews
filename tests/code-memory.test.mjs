import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../code-memory.js', import.meta.url), 'utf8');
const validProfile = { participant_code: 'AURORACORAL1', is_teacher: false };
const key = 'ifn.remembered-code.v1';

function browser(options = {}) {
  const storage = options.storage || new Map(), cookies = options.cookies || new Map();
  const state = { now: Date.now(), blockStorage: !!options.blockStorage, blockCookies: !!options.blockCookies };
  const elements = new Map(['code', 'code-memory-banner', 'remembered-code-hint', 'code-memory-status',
    'created-memory-status', 'code-memory-forget', 'code-memory-settings'].map(id => [id, {
      value: '', hidden: true, disabled: false, textContent: '', showModal() { this.open = true; },
    }]));
  const cookieWrites = [], toasts = [];
  const document = {
    getElementById: id => elements.get(id) || null,
    get cookie() {
      return [...cookies.entries()].filter(([, v]) => v.expiresAt > state.now)
        .map(([k, v]) => k + '=' + v.value).join('; ');
    },
    set cookie(text) {
      if (state.blockCookies) return;
      cookieWrites.push(text);
      const [entry] = text.split(';'), at = entry.indexOf('=');
      const name = entry.slice(0, at), value = entry.slice(at + 1);
      const maxAge = Number(text.match(/Max-Age=(\d+)/)[1]);
      cookies.set(name, { value, expiresAt: state.now + maxAge * 1000 });
    },
  };
  const events = {};
  const window = { app: { toast: text => toasts.push(text) }, cloud: { profile: null },
    addEventListener: (name, handler) => { events[name] = handler; } };
  const localStorage = {
    getItem(k) { if (state.blockStorage) throw Error('blocked'); return storage.get(k) || null; },
    setItem(k, value) { if (state.blockStorage) throw Error('blocked'); storage.set(k, value); },
    removeItem(k) { if (state.blockStorage) throw Error('blocked'); storage.delete(k); },
  };
  const context = { window, document, localStorage,
    Date: class extends Date { static now() { return state.now; } },
    fetch() { throw Error('A lembrança de código não pode fazer requisições.'); } };
  vm.runInNewContext(source, context);
  return { memory: window.codeMemory, window, elements, storage, cookies, state, cookieWrites, toasts, events };
}

test('antes da escolha não guarda código nem preferência e não altera a entrada', () => {
  const b = browser();
  assert.equal(b.elements.get('code-memory-banner').hidden, false);
  assert.equal(b.memory.rememberStudent(validProfile), false);
  assert.equal(b.storage.size, 0);
  assert.equal(b.cookieWrites.length, 0);
  assert.equal(b.elements.get('code').value, '');
});

test('aceitar sem aluno autenticado grava apenas a preferência, sem código no cookie', () => {
  const b = browser();
  assert.equal(b.memory.choose(true), true);
  assert.equal(b.storage.size, 0);
  assert.equal(b.memory.preference(), 'accepted');
  assert.equal(b.elements.get('code-memory-banner').hidden, true);
  const cookie = b.cookieWrites.at(-1);
  assert(cookie.includes('SameSite=Strict; Secure'));
  assert(cookie.includes('Max-Age=2592000'));
  assert(cookie.includes('Path=/investigandofakenews/'));
  assert(!cookie.includes('AURORACORAL1'));
});

test('depois do consentimento lembra só o código do aluno e preenche após recarregar', () => {
  const b = browser();
  b.memory.choose(true);
  assert.equal(b.memory.rememberStudent(validProfile), true);
  const stored = JSON.parse(b.storage.get(key));
  assert.deepEqual(Object.keys(stored).sort(), ['code', 'expiresAt']);
  assert.equal(stored.code, validProfile.participant_code);
  assert.equal(stored.expiresAt - b.state.now, 30 * 24 * 60 * 60 * 1000);
  assert(b.cookieWrites.every(c => !c.includes(stored.code)));
  const reopened = browser({ storage: b.storage, cookies: b.cookies });
  assert.equal(reopened.elements.get('code').value, validProfile.participant_code);
  assert.equal(reopened.elements.get('remembered-code-hint').hidden, false);
  // Não há chamada de login; preencher o campo exige que a pessoa decida entrar.
  assert.equal(reopened.window.cloud.profile, null);
});

test('outro navegador não herda o código, independentemente da rede', () => {
  const one = browser();
  one.memory.choose(true); one.memory.rememberStudent(validProfile);
  const two = browser();
  assert.equal(two.elements.get('code').value, '');
  assert.equal(two.storage.size, 0);
});

test('remover em outra aba limpa também o campo que havia sido preenchido', () => {
  const one = browser(); one.memory.choose(true); one.memory.rememberStudent(validProfile); one.memory.prefill();
  const two = browser({ storage: one.storage, cookies: one.cookies });
  two.memory.choose(false);
  one.events.storage({ key });
  assert.equal(one.elements.get('code').value, '');
  assert.equal(one.elements.get('remembered-code-hint').hidden, true);
});

test('recusar ou revogar apaga o código e impede salvamentos posteriores', () => {
  const b = browser();
  b.memory.choose(true); b.memory.rememberStudent(validProfile); b.memory.prefill();
  assert.equal(b.memory.choose(false), true);
  assert.equal(b.memory.preference(), 'declined');
  assert.equal(b.storage.has(key), false);
  assert.equal(b.elements.get('code').value, '');
  assert.equal(b.memory.rememberStudent(validProfile), false);
});

test('esquecer remove o código sem alterar perfil ou progresso da conta', () => {
  const b = browser();
  b.window.cloud.profile = validProfile;
  b.memory.choose(true); b.memory.prefill();
  b.memory.forget();
  assert.equal(b.memory.preference(), 'declined');
  assert.equal(b.storage.has(key), false);
  assert.equal(b.window.cloud.profile, validProfile);
  assert.equal(b.elements.get('code').value, '');
  assert(b.toasts.at(-1).includes('respostas continuam salvas'));
});

test('prazo vencido ou consentimento ausente remove código sem preenchê-lo', () => {
  const b = browser();
  b.memory.choose(true); b.memory.rememberStudent(validProfile);
  b.storage.set(key, JSON.stringify({ code: validProfile.participant_code, expiresAt: b.state.now - 1 }));
  assert.equal(b.memory.saved(), null);
  assert.equal(b.storage.has(key), false);
  b.storage.set(key, JSON.stringify({ code: validProfile.participant_code, expiresAt: b.state.now + 10000 }));
  const noConsent = browser({ storage: b.storage });
  assert.equal(noConsent.storage.has(key), false);
  assert.equal(noConsent.elements.get('code').value, '');
});

test('não salva conta de professor e não sobrescreve código digitado manualmente', () => {
  const b = browser(); b.memory.choose(true);
  assert.equal(b.memory.rememberStudent({ participant_code: 'PROF_EXEMPLO', is_teacher: true }), false);
  assert.equal(b.memory.rememberStudent({ participant_code: 'inválido', is_teacher: false }), false);
  b.memory.rememberStudent(validProfile);
  b.elements.get('code').value = 'CEDROSOLAR1';
  b.memory.prefill();
  assert.equal(b.elements.get('code').value, 'CEDROSOLAR1');
});

test('bloqueio de cookies ou armazenamento não quebra a navegação nem guarda código', () => {
  const cookies = browser({ blockCookies: true });
  assert.equal(cookies.memory.choose(true), false);
  assert.equal(cookies.memory.rememberStudent(validProfile), false);
  assert.equal(cookies.storage.size, 0);
  const storage = browser({ blockStorage: true });
  storage.memory.choose(true);
  assert.equal(storage.memory.rememberStudent(validProfile), false);
  assert(storage.toasts.at(-1).includes('não permitiu guardar'));
});
