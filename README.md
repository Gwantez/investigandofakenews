# Investigando FakeNews

Trilha de educação midiática com pré-teste, missões, pós-teste e avaliação.

Site: https://gwantez.github.io/investigandofakenews/

O professor se cadastra com nome, e-mail e senha e cria suas turmas. Outros professores entram na mesma turma com um convite.

O aluno escolhe somente a turma. O servidor sorteia um apelido formado por palavras e acrescenta o número da turma ao código, por exemplo AURORACORAL1 (Aurora Coral, turma 1). O cadastro não pede nome, e-mail ou senha do aluno e ignora nomes ou códigos enviados pelo cliente. O código deve ser guardado, pois permite voltar à mesma conta; a entrada aceita letras maiúsculas ou minúsculas.

O apelido é gravado na coluna `full_name` por compatibilidade com os painéis existentes. A unicidade é garantida pela restrição do banco; colisões geram nova tentativa, inclusive em cadastros simultâneos. As contas e respostas anteriores permanecem com seus identificadores originais. Apelidos constituem pseudonimização; não representam, por si só, anonimização irreversível ou aprovação ética da pesquisa.

Ao publicar o backend, inclua `server/index.ts`, `server/student-nicknames.mjs` e a configuração Deno da função `midiacheck-access`. Não coloque chaves administrativas no navegador.

O progresso é salvo automaticamente e retomado ao entrar novamente. O professor acompanha suas turmas em tempo real. Sair da conta fica apenas no menu superior.

GitHub Pages e Supabase com autorização por RLS. Chaves secretas ficam somente na função de servidor. Identificadores técnicos anteriores são preservados para compatibilidade com sessões e backups.

Supabase JS 2.117.2 está incluído em vendor sob licença MIT.

Professores podem excluir alunos das turmas que acompanham na coluna Ações. A confirmação exige digitar o código e remove definitivamente a conta, o perfil e as respostas. O administrador acompanha todas as turmas.
