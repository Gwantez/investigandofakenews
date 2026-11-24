# Investigando FakeNews

Trilha de educação midiática com pré-teste, missões, pós-teste e avaliação.

Site: https://gwantez.github.io/investigandofakenews/

O professor se cadastra com nome, e-mail e senha e cria suas turmas. Outros professores entram na mesma turma com um convite.

O aluno escolhe somente a turma. O servidor sorteia um apelido formado por palavras e acrescenta o número da turma ao código, por exemplo AURORACORAL1 (Aurora Coral, turma 1). O cadastro não pede nome, e-mail ou senha do aluno e ignora nomes ou códigos enviados pelo cliente. O código deve ser guardado, pois permite voltar à mesma conta; a entrada aceita letras maiúsculas ou minúsculas.

O apelido é gravado na coluna `full_name` por compatibilidade com os painéis existentes. A unicidade é garantida pela restrição do banco; colisões geram nova tentativa, inclusive em cadastros simultâneos. A troca administrativa de apelidos e códigos preserva a conta e suas respostas. Os identificadores anteriores podem ser substituídos, com controle de correspondência mantido separadamente e de forma reservada. Apelidos constituem pseudonimização; não representam, por si só, anonimização irreversível ou aprovação ética da pesquisa.

Ao publicar o backend, inclua `server/index.ts`, `server/student-nicknames.mjs` e a configuração Deno da função `midiacheck-access`. Não coloque chaves administrativas no navegador.

### Lembrança voluntária do código

O balão permite aceitar ou recusar a lembrança do código por até 30 dias. O cookie `__Secure-ifn-code-memory-choice` contém somente a preferência, com `Secure`, `SameSite=Strict` e caminho restrito à aplicação. O código fica em `localStorage`, com vencimento próprio, para não circular em cabeçalhos de cookies. Não há consulta de IP, vínculo por rede, impressão digital do dispositivo ou entrada automática neste recurso.

O preenchimento automático só é ativado após consentimento e para códigos de contas de alunos confirmadas na entrada ou no cadastro. As opções de recusar, esquecer e sair removem o código local sem apagar respostas do banco. A preferência pode ser alterada no rodapé. Em computadores compartilhados, a orientação é não lembrar o código. A funcionalidade não substitui os cuidados éticos da pesquisa, nem elimina os dados de conexão processados pelos provedores de infraestrutura.

O progresso é salvo automaticamente e retomado ao entrar novamente. O professor acompanha suas turmas em tempo real. Sair da conta fica apenas no menu superior.

GitHub Pages e Supabase com autorização por RLS. Chaves secretas ficam somente na função de servidor. Identificadores técnicos anteriores são preservados para compatibilidade com sessões e backups.

Supabase JS 2.117.2 está incluído em vendor sob licença MIT.

Professores podem excluir alunos das turmas que acompanham na coluna Ações. A confirmação exige digitar o código e remove definitivamente a conta, o perfil e as respostas. O administrador acompanha todas as turmas.
