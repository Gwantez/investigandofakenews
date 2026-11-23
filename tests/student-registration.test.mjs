import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import { webcrypto } from 'node:crypto';
import vm from 'node:vm';
import test from 'node:test';
import { generatedStudentIdentity, nicknamePool } from '../server/student-nicknames.mjs';

const roomId = '11111111-1111-4111-8111-111111111111';
const source = stripTypeScriptTypes((await readFile(new URL('../server/index.ts', import.meta.url), 'utf8'))
  .replace(/^import .*;\n/gm, ''));

function backend(options = {}) {
  let handler, calls = 0;
  const profiles = new Map(options.existing || []);
  const created = [], deleted = [], inserts = [];
  const admin = {
    rpc: async () => ({ data: true, error: null }),
    auth: { admin: {
      async createUser(payload) {
        created.push(payload);
        return { data: { user: { id: 'new-' + created.length } }, error: null };
      },
      async deleteUser(id) {
        deleted.push(id);
        for (const [code, p] of profiles) if (p.id === id) profiles.delete(code);
        return { error: null };
      },
      getUserById: async () => ({ data: { user: { email: 'generated@aluno.midiacheck.invalid' } } }),
      generateLink: async () => options.sessionError ? { error: true }
        : { data: { properties: { hashed_token: 'test-token' } } },
    } },
    from(table) {
      let field, value;
      const query = {
        select() { return this; },
        eq(f, v) { field = f; value = v; return this; },
        async maybeSingle() {
          if (table === 'classrooms') return { data: options.missingRoom ? null
            : { id: roomId, class_number: '1' }, error: null };
          assert.equal(table, 'profiles');
          assert.equal(field, 'participant_code');
          if (options.lookupError) return { error: true };
          return { data: profiles.get(value) || null, error: null };
        },
        async insert(p) {
          inserts.push(p);
          if (options.insertError) return { error: { code: options.insertError } };
          if (options.collideOnce && inserts.length === 1) return { error: { code: '23505' } };
          if (profiles.has(p.participant_code)) return { error: { code: '23505' } };
          profiles.set(p.participant_code, p);
          return { error: null };
        },
      };
      return query;
    },
  };
  const auth = { auth: { verifyOtp: async () => ({ data: { session: {
    access_token: 'test-access', refresh_token: 'test-refresh',
  } } }) } };
  const identity = options.identity || (() => ({ nickname: 'Aurora Coral', code: 'AURORACORAL1' }));
  vm.runInNewContext(source, {
    Deno: { env: { get: k => ({ SUPABASE_URL: 'https://test.invalid',
      SUPABASE_SERVICE_ROLE_KEY: 'service', SUPABASE_ANON_KEY: 'anon' })[k] }, serve: h => { handler = h; } },
    createClient: (_url, key) => key === 'service' ? admin : auth,
    generatedStudentIdentity: n => { calls++; return identity(n, calls); },
    crypto: webcrypto, Request, Response, TextEncoder, Uint8Array, console,
  });
  return {
    created, deleted, inserts, profiles,
    async request(body) {
      const r = await handler(new Request('https://test.invalid', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      }));
      return { status: r.status, body: await r.json() };
    },
  };
}

test('todos os apelidos cabem no código, inclusive turmas com cinco dígitos', () => {
  assert(nicknamePool.length > 7000);
  assert.equal(new Set(nicknamePool.map(x => x.stem)).size, nicknamePool.length);
  for (const p of nicknamePool) {
    assert.match(p.nickname, /^\p{L}+ \p{L}+$/u);
    assert.match(p.stem + '12345', /^[A-Z]{2,15}[0-9]{5}$/);
    assert((p.stem + '12345').length <= 20);
  }
  for (const n of ['1', '01', '301', '12345']) {
    const value = generatedStudentIdentity(n);
    assert(value.code.endsWith(n));
    assert(nicknamePool.some(p => p.nickname === value.nickname && p.stem + n === value.code));
  }
  for (const n of ['', 'abc', '123456', 1, null]) assert.throws(() => generatedStudentIdentity(n));
});

test('cadastro precisa só da turma e ignora nome e código escolhidos no cliente', async () => {
  const b = backend();
  const r = await b.request({ action: 'student-register', classroom_id: roomId,
    name: 'Nome pessoal que não pode ser armazenado', code: 'ESCOLHIDO1' });
  assert.equal(r.status, 200);
  assert.equal(r.body.code, 'AURORACORAL1');
  assert.equal(r.body.session.access_token, 'test-access');
  assert.equal(b.inserts[0].full_name, 'Aurora Coral');
  assert.equal(b.inserts[0].classroom_id, roomId);
  assert.equal(b.inserts[0].is_teacher, false);
  assert.equal(b.inserts[0].code_login, true);
  assert(!JSON.stringify(b.inserts).includes('Nome pessoal'));
  assert(!JSON.stringify(b.created).includes('Nome pessoal'));
});

test('turma inválida ou inexistente não cria conta', async () => {
  const b = backend();
  assert.equal((await b.request({ action: 'student-register', classroom_id: '' })).status, 400);
  assert.equal(b.created.length, 0);
  const other = backend({ missingRoom: true });
  assert.equal((await other.request({ action: 'student-register', classroom_id: roomId })).status, 400);
  assert.equal(other.created.length, 0);
});

test('apelido já usado é sorteado novamente sem alterar o aluno existente', async () => {
  const old = { id: 'old-user', participant_code: 'AURORACORAL1', full_name: 'Aurora Coral' };
  const b = backend({ existing: [['AURORACORAL1', old]],
    identity: (_n, call) => call === 1 ? { nickname: 'Aurora Coral', code: 'AURORACORAL1' }
      : { nickname: 'Cedro Solar', code: 'CEDROSOLAR1' } });
  const r = await b.request({ action: 'student-register', classroom_id: roomId });
  assert.equal(r.body.code, 'CEDROSOLAR1');
  assert.equal(b.created.length, 1);
  assert.equal(b.profiles.get('AURORACORAL1'), old);
});

test('colisão simultânea no UNIQUE tenta outro apelido com a mesma conta nova', async () => {
  const b = backend({ collideOnce: true,
    identity: (_n, call) => call === 1 ? { nickname: 'Aurora Coral', code: 'AURORACORAL1' }
      : { nickname: 'Cedro Solar', code: 'CEDROSOLAR1' } });
  const r = await b.request({ action: 'student-register', classroom_id: roomId });
  assert.equal(r.status, 200);
  assert.equal(r.body.code, 'CEDROSOLAR1');
  assert.equal(b.created.length, 1);
  assert.equal(b.inserts.length, 2);
  assert.equal(b.deleted.length, 0);
});

test('falha na criação do perfil remove somente a conta recém-criada', async () => {
  const b = backend({ insertError: 'XX000' });
  const r = await b.request({ action: 'student-register', classroom_id: roomId });
  assert.equal(r.status, 503);
  assert.deepEqual(b.deleted, ['new-1']);
  assert.equal(b.profiles.size, 0);
});

test('falha na consulta ou excesso de colisões não deixa conta órfã', async () => {
  const lookup = backend({ lookupError: true });
  assert.equal((await lookup.request({ action: 'student-register', classroom_id: roomId })).status, 503);
  assert.equal(lookup.created.length, 0);
  const collisions = backend({ insertError: '23505' });
  assert.equal((await collisions.request({ action: 'student-register', classroom_id: roomId })).status, 503);
  assert.equal(collisions.created.length, 1);
  assert.equal(collisions.inserts.length, 16);
  assert.deepEqual(collisions.deleted, ['new-1']);
});

test('códigos antigos e novos continuam aceitando letras minúsculas no login', async () => {
  const b = backend({ existing: [['JOAO1', { id: 'old-user', code_login: true, is_teacher: false }],
    ['AURORACORAL1', { id: 'new-user', code_login: true, is_teacher: false }]] });
  for (const code of ['joao1', 'auroracoral1']) {
    const r = await b.request({ action: 'student-login', code });
    assert.equal(r.status, 200);
    assert.equal(r.body.session.access_token, 'test-access');
  }
});
