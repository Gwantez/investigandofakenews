# MídiaCheck

Atividades de educação midiática com pré-teste, missões, pós-teste e avaliação de experiência.

Site: https://gwantez.github.io/midiacheck/

O site usa GitHub Pages e Supabase. A chave de `config.js` é publicável; o banco aplica autenticação e RLS. Nenhuma senha ou chave secreta é necessária no repositório.

## Contas

As contas são cadastradas pelo responsável em Supabase > Authentication > Users. Cada conta precisa de um perfil em `profiles`: UUID da conta, código único e `is_teacher` (false para alunos, true para professor). O aluno entra com código, e-mail e senha. O professor entra pela Área do professor.

O professor tem leitura dos resultados e exportação CSV. Clique em Atualizar para buscar novos resultados. Aguarde "Salvo no banco online" antes de fechar a página. Use uma aba/dispositivo por conta por vez.

Perguntas, gabaritos e cálculo de pontuação estão no cliente. Esta versão não garante integridade contra consulta ao código ou alteração de dados enviados pelo aluno. Importação de backups e migração automática do pacote local não estão implementadas.

Supabase JS 2.117.2 está incluído em vendor sob licença MIT.
