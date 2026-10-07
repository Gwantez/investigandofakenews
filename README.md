# Investigando FakeNews

Trilha de educação midiática com pré-teste, missões, pós-teste e avaliação.

Site: https://gwantez.github.io/investigandofakenews/

O professor se cadastra com nome, e-mail e senha e cria suas turmas. Outros professores entram na mesma turma com um convite.

O aluno escolhe seu nome e sua turma. Seu código é o nome sem espaços/acentos mais o número da turma, por exemplo JOAO301. Códigos repetidos são recusados; o aluno pode usar nome e sobrenome. A entrada usa somente esse código.

O progresso é salvo automaticamente e retomado ao entrar novamente. O professor acompanha suas turmas em tempo real. Sair da conta fica apenas no menu superior.

GitHub Pages e Supabase com autorização por RLS. Chaves secretas ficam somente na função de servidor. Identificadores técnicos anteriores são preservados para compatibilidade com sessões e backups.

Supabase JS 2.117.2 está incluído em vendor sob licença MIT.

Professores podem excluir alunos das turmas que acompanham na coluna Ações. A confirmação exige digitar o código e remove definitivamente a conta, o perfil e as respostas. O administrador acompanha todas as turmas.
