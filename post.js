'use strict';
{
 const {q,chat,feed,news,doc,video,search}=Cases;
 QBANK.post=[
 q('pos01',0,'Três portais confirmam?','A notícia apareceu em três páginas, mas os caminhos de origem estão no quadro. Qual material acrescentaria a confirmação mais relevante?',[
 'Um comunicado da organização sobre o mesmo evento, ou uma apuração que a consulte diretamente.',
 'Uma quarta página que reproduza o boletim, informando o link de onde copiou o texto.',
 'Um comparativo das curtidas recebidas pelos três portais que publicaram a informação.',
 'Uma captura com os três títulos lado a lado, mostrando que todos relatam a mesma coisa.'
 ],'Os três caminhos chegam ao mesmo boletim, que se baseia em relato anônimo. Eles multiplicam a circulação, não a confirmação. Uma fonte primária pertinente ou apuração independente acrescentaria evidência sobre a alegação.',
 news('Feira municipal será transferida','A transferência circula em portais desde as 8h. A organização ainda não foi citada em nenhum dos textos.','20/05/2026 • 10:15','Redação',[{label:'Caminhos de origem',text:'Portal A → Boletim Local. Portal B → Portal A. Portal C → Boletim Local.'},{label:'Boletim Local',text:'“Um participante, que não quis se identificar, disse que a feira mudará de lugar.”'}])),
 q('pos02',0,'Autoridade no assunto','Duas pessoas discordam sobre o desempenho de um aplicativo. Qual critério deve orientar a análise das alegações?',[
 'A pertinência da experiência de cada uma, os métodos das evidências e os interesses declarados.',
 'O grau acadêmico mais alto de cada pessoa, independentemente da área e do estudo citado.',
 'A quantidade de anos de cada perfil nas redes, independentemente de sua relação com o tema.',
 'A conclusão de quem divulga dados primeiro, porque a segunda fala pode ser uma reação.'
 ],'Um título acadêmico fora da área não estabelece competência sobre aprendizagem. Uma professora da área também pode errar. Examine o método e os limites do estudo, além da experiência e dos vínculos de ambas.',
 feed('Facebook','Debate sobre o FocoPro','18/04/2026 • 14:25','Autor A: “Sou doutor e garanto que funciona.” Autora B: “O estudo citado não permite essa garantia.”',[{label:'Autor A',text:'Doutorado em geologia; vendedor do aplicativo. Usa três depoimentos como evidência.'},{label:'Autora B',text:'Pesquisadora em educação; apresenta uma avaliação com método e limites. Não declara parceria com o produto.'}],'Duas posições • evidências diferentes')),
 q('pos03',0,'A confirmação circular','Um perfil conhecido diz que confirmou a notícia com outra conta. O encadeamento disponível sustenta qual conclusão?',[
 'A checagem é circular: as duas contas se citam e nenhuma apresenta uma origem verificável para a alegação.',
 'A segunda conta é uma confirmação independente, porque possui nome e endereço diferentes.',
 'A confirmação ficou mais forte quando a primeira conta voltou a citar a segunda.',
 'A ausência de um documento prova que nenhuma mudança de horário poderá acontecer.'
 ],'A cadeia volta à mesma alegação. Isso não acrescenta uma verificação independente e não prova o contrário do boato. É preciso sair do círculo e consultar o responsável pelo horário ou um comunicado rastreável.',
 chat('Linha 8 • passageiros',[['Paulo','A linha muda amanhã. O perfil Rota Clara confirmou com Notícias da Estação.','17:18'],['Luana','Notícias da Estação diz que a fonte é Rota Clara. Ambos só mostram o mesmo print sem data.','17:21']], [{label:'Caminho da confirmação',text:'Rota Clara → Notícias da Estação → Rota Clara. Empresa de transporte não aparece na cadeia.'}])),
 q('pos04',0,'O print do ofício','Um print tem brasão, assinatura e número de ofício. Qual ação verifica melhor se ele representa uma comunicação da instituição?',[
 'Localizar o mesmo ofício no canal conhecido da instituição ou pedir confirmação do número por contato oficial.',
 'Ampliar a assinatura e comparar apenas o estilo da letra com outro print que circulou.',
 'Considerar o documento autêntico porque inclui um número de ofício e a data do dia.',
 'Considerar o documento falso porque chegou por rede social, mesmo tendo indicação de origem.'
 ],'Os elementos visuais podem ser copiados. O canal pelo qual chegou também não determina a autenticidade. O número e a data são pistas úteis para localizar o documento em uma fonte conhecida ou confirmar sua existência.',
 doc('Ofício 084 • uso do ginásio','O print anuncia suspensão de todas as atividades. Mostra brasão, data e assinatura, mas não traz endereço de consulta.',[{label:'Como o arquivo chegou',text:'Imagem encaminhada em um grupo. Não há link para o documento original.'},{label:'Canal conhecido',text:'O ginásio publica comunicados em ginasio.example e atende por um telefone já divulgado nesse site.'}])),
 q('pos05',1,'Publicado hoje, ocorrido antes','A notícia foi atualizada hoje, mas o fato descrito ocorreu em 2023. Qual interpretação combina corretamente as datas?',[
 'A atualização é recente; o evento relatado continua sendo de 2023 e não demonstra uma ocorrência hoje.',
 'A atualização substitui a data do evento e permite anunciar que a interdição aconteceu hoje.',
 'A data antiga torna toda a matéria falsa, inclusive a nota sobre a reabertura da ponte.',
 'A data da rede social é a única relevante, pois é quando o leitor tomou conhecimento.'
 ],'Publicação, atualização e acontecimento são datas diferentes. A atualização recente pode informar uma mudança sobre o evento antigo; ela não transporta a interdição de 2023 para o presente.',
 news('Ponte foi interditada após inspeção','A interdição ocorreu em 17/11/2023. Nota de atualização: a ponte reabriu em janeiro de 2024 após manutenção.','Publicado: 18/11/2023 • atualizado: 04/08/2026','Caderno Cidade',[{label:'Post de hoje',text:'“Ponte interditada agora! A matéria foi atualizada hoje.”'}])),
 q('pos06',1,'A parte que ficou de fora','O post cita uma frase verdadeira do regulamento. Qual conclusão depende da leitura completa apresentada no caso?',[
 'A gratuidade vale para estudantes cadastrados às terças; a legenda omite essas condições.',
 'A gratuidade vale para qualquer visitante, porque a primeira frase não lista restrições.',
 'O regulamento deixou de valer, pois o complemento contradiz a existência de gratuidade.',
 'A gratuidade vale para estudantes todos os dias, porque o dia citado é apenas um exemplo.'
 ],'O complemento define o público e o dia de aplicação. A frase isolada não é inventada, mas sua legenda amplia indevidamente o alcance. Leia as condições antes de interpretar um benefício como universal.',
 doc('Museu do Rio • regulamento de visitas','“O ingresso será gratuito para estudantes. A medida aplica-se às terças-feiras, mediante cadastro prévio.”',[{label:'Post que circula',text:'“Museu com entrada gratuita para todo mundo! Está escrito no regulamento.”'},{label:'Documento consultado',text:'Regulamento vigente, disponível no canal conhecido do museu. O trecho acima está completo.'}])),
 q('pos07',1,'A retificação posterior','Uma matéria foi correta quando publicada às 8h, mas recebeu correção às 10h. Às 11h, qual mensagem descreve melhor a informação vigente?',[
 'A feira ocorrerá no sábado; o anúncio anterior de sexta foi corrigido, conforme a atualização das 10h.',
 'A feira ocorrerá na sexta, porque a publicação original foi a primeira fonte do assunto.',
 'Não há qualquer informação utilizável, pois uma fonte que corrige o texto perde toda a validade.',
 'A feira ocorrerá nos dois dias, porque duas datas diferentes foram divulgadas pela mesma fonte.'
 ],'A fonte explica a correção e apresenta a data vigente. Mencionar a alteração evita que o conteúdo antigo continue circulando. A retificação não autoriza combinar as duas versões como se ambas valessem.',
 news('Feira de ciências: nova data confirmada','Correção às 10h: o evento será no sábado, 22/08. A primeira publicação indicava sexta, 21/08, por erro na leitura da programação.','22/07/2026 • 08:00 • corrigido às 10:00','Redação Escolar',[{label:'Print encaminhado • 11h',text:'Captura da versão das 8h, sem a correção, anunciando sexta-feira.'}])),
 q('pos08',2,'O título e o grupo de comparação','Qual título evita extrapolar os resultados apresentados?',[
 'Em uma amostra de 60 estudantes, quem já tinha hábito de revisão obteve média maior.',
 'Método de revisão aumenta a nota de qualquer estudante em dois pontos.',
 'Pesquisa comprova que revisar uma vez garante aprovação na escola.',
 'Estudantes que não usam o método têm menor capacidade de aprender.'
 ],'O estudo observou um hábito que já existia; não distribuiu o método nem controlou outras diferenças. É possível descrever a média observada, mas não prometer aumento individual ou atribuir capacidade a um grupo.',
 news('MÉTODO ELEVA A NOTA EM DOIS PONTOS','60 estudantes responderam sobre seus hábitos. Quem revisava semanalmente tinha média 8; os demais, 6. Não foram medidos desempenho anterior, tempo de estudo ou apoio familiar.','03/09/2026 • 09:00','Educação em Pauta')),
 q('pos09',2,'A pressão para compartilhar','A mensagem usa uma ameaça de culpa. Qual resposta distingue melhor o recurso emocional da verificação do conteúdo?',[
 'Reconhecer a pressão como sinal para pausar e consultar a origem, sem concluir falsidade apenas pelo tom.',
 'Considerar a ameaça de culpa como prova suficiente de que o alerta foi inventado.',
 'Compartilhar com um aviso de dúvida, porque o custo de esperar é sempre maior.',
 'Dar prioridade ao alerta porque textos mais emocionais indicam testemunhos diretos.'
 ],'O recurso tenta acelerar uma decisão pela emoção. Ele justifica cuidado, mas o tom sozinho não verifica a alegação. Consulte o organizador e o comunicado pertinente antes de repassar.',
 chat('Famílias • oficina',[['Renato','SE VOCÊ NÃO REPASSAR, vai ser culpado por quem perder a vaga! Inscrições encerram em 10 minutos!','12:50'],['Marta','O texto não tem nome do organizador nem endereço do edital.','12:52']], [{label:'Pista disponível',text:'O organizador da oficina tem uma página conhecida com calendário de inscrições.'}])),
 q('pos10',2,'Opinião com um dado verdadeiro','Como classificar o texto sem tratar opinião e fato como se fossem a mesma coisa?',[
 'O valor do orçamento é verificável; “desperdício absurdo” é uma avaliação que depende de critérios.',
 'Como o orçamento é verificável, a avaliação “desperdício absurdo” torna-se um fato demonstrado.',
 'Como há uma opinião, o valor do orçamento não pode ser conferido em documentos.',
 'A comparação moral é mais verificável do que o número porque foi escrita de forma clara.'
 ],'O texto combina um dado com um julgamento. É possível conferir o valor e analisar a opinião com critérios e alternativas, sem transformar um no outro ou descartar todo o conteúdo.',
 feed('Facebook','Marina Leal','Hoje • 15:45','O projeto prevê R$ 40 mil para reformar a quadra. Isso é um desperdício absurdo!',[{label:'Documento citado',text:'Planilha do projeto: total previsto de R$ 40 mil. O post não compara custo, condições da quadra ou propostas alternativas.'}],'Texto de opinião')),
 q('pos11',3,'Por cento ou pontos?','A aprovação passou de 40% para 50%. Qual frase descreve corretamente a mudança usando a base inicial?',[
 'Aumento de 10 pontos percentuais, equivalente a crescimento relativo de 25% sobre os 40% iniciais.',
 'Aumento de 10 pontos percentuais, equivalente a crescimento relativo de 10% sobre a base inicial.',
 'Aumento de 25 pontos percentuais, equivalente a crescimento relativo de 10% sobre a base inicial.',
 'Aumento de 50 pontos percentuais, porque a aprovação final foi de 50% dos respondentes.'
 ],'A diferença entre 50% e 40% é 10 pontos percentuais. O aumento relativo é 10 dividido por 40 = 25%. Essas duas medidas respondem a perguntas diferentes e não devem ser trocadas.',
 doc('Pesquisa de aprovação • duas rodadas','Rodada inicial: 40% de aprovação. Rodada final: 50% de aprovação. Mesmo método e população, para esta comparação.',[{label:'Título publicado',text:'“Aprovação sobe 10%.” O texto não esclarece qual medida usou.'}])),
 q('pos12',3,'A média que esconde a mudança','Os dois grupos tiveram redução na taxa de falha, mas a taxa total subiu. Qual explicação é compatível com os dados?',[
 'A composição mudou: o grupo com maior taxa de falha passou a representar uma parcela muito maior do total.',
 'A taxa de falha aumentou em ambos os grupos, mas a tabela arredondou os resultados para baixo.',
 'A taxa total precisa ser a média simples de 9% e 30%, sem considerar quantos testes houve.',
 'Os dados provam que reduzir falhas em um grupo sempre aumenta falhas no outro grupo.'
 ],'Antes: (9+4)/100 = 13%. Depois: (1+24)/100 = 25%. As taxas caíram em A e B, mas B passou de 10 a 80 testes. Para combinar taxas, leve em conta os tamanhos e a composição dos grupos.',
 doc('Teste de duas rotas de atendimento','ANTES: rota A, 90 testes e 9 falhas (10%); rota B, 10 testes e 4 falhas (40%). DEPOIS: A, 20 testes e 1 falha (5%); B, 80 testes e 24 falhas (30%).',[{label:'Taxa total',text:'Antes: 13 falhas em 100 testes. Depois: 25 falhas em 100 testes. Os números são dados simulados para análise.'}])),
 q('pos13',3,'O ensaio piloto','Qual afirmação evita atribuir a todos os estudantes um resultado que o teste não demonstrou?',[
 'O piloto mostrou um resultado nesse grupo; é preciso analisar seleção, comparação e replicação antes de generalizar.',
 'O piloto comprova a eficácia para todos, pois 12 participantes já permitem uma conclusão definitiva.',
 'O resultado demonstra falta de eficácia, pois qualquer piloto com voluntários deve ser negativo.',
 'A eficácia pode ser generalizada se os voluntários publicarem depoimentos sobre o aplicativo.'
 ],'O piloto pode gerar uma hipótese, mas o grupo é pequeno e selecionado por adesão. Sem comparação adequada e replicação, o resultado não sustenta eficácia universal. Isso não permite concluir ineficácia, tampouco substituir método por depoimentos.',
 news('Teste piloto avalia ferramenta de revisão','12 voluntários de uma turma usaram a ferramenta. Houve melhora na segunda prova. Não houve grupo de comparação e as provas tinham dificuldades diferentes.','10/09/2026 • 17:10','Caderno Aprender',[{label:'Material promocional',text:'“Eficácia comprovada para qualquer aluno.” A frase se apoia apenas nesse piloto.'}])),
 q('pos14',3,'Fontes que parecem discordar','Os relatórios contam coisas diferentes. Qual passo deve vir antes de concluir que um deles está errado?',[
 'Comparar definição, período e unidade de contagem; inscrições e participantes presentes não são a mesma medida.',
 'Escolher o número maior, pois relatórios completos precisam incluir mais pessoas.',
 'Calcular a média de 240 e 180 e tratar 210 como o número correto de participantes.',
 'Preferir o relatório publicado por último, sem verificar o que cada coluna mede.'
 ],'Um relatório conta inscrições, outro conta presenças em uma data específica. Eles podem coexistir sem contradição. Alinhe a definição, o período e a unidade antes de comparar ou combinar valores.',
 doc('Oficinas de agosto • dois relatórios','RELATÓRIO A: 240 inscrições nas oficinas de agosto. RELATÓRIO B: 180 pessoas presentes na oficina de 15/08.',[{label:'Post de comentário',text:'“A organização inventou números: cada relatório mostra um total diferente.”'}])),
 q('pos15',4,'Detectores em desacordo','Dois detectores deram resultados diferentes para o vídeo. Qual conjunto de verificações é mais apropriado antes de afirmar que houve manipulação?',[
 'Origem do arquivo, gravação completa, contexto e outras evidências; usar os detectores apenas como pistas.',
 'Escolher o detector com o percentual mais alto e tratar sua pontuação como certeza de manipulação.',
 'Calcular a média das pontuações e divulgar esse valor como probabilidade comprovada de falsidade.',
 'Aceitar o vídeo como autêntico, porque a discordância entre detectores elimina o risco de edição.'
 ],'Resultados de ferramentas dependem de limites e métodos que nem sempre são comparáveis. Discordância não resolve autenticidade. A procedência e a comparação com registros verificáveis ajudam a investigar sem transformar pontuações em veredictos.',
 video('Fala atribuída ao organizador','Clipe sem link para a gravação original. A voz e o rosto parecem semelhantes aos do organizador.',[{label:'Detector A',text:'“Possível manipulação: 72%.” Não apresenta validação para esse tipo de arquivo.'},{label:'Detector B',text:'“Nenhuma manipulação identificada.” O resultado não garante autenticidade.'}],'Arquivo de 19 segundos • origem desconhecida')),
 q('pos16',4,'A foto antiga não resolve tudo','A busca mostra que a foto do post é de outro ano. Qual conclusão tem o alcance correto?',[
 'A foto foi usada fora do contexto indicado; a realização do protesto hoje precisa de evidência própria.',
 'Como a foto é antiga, o protesto de hoje necessariamente não aconteceu em nenhum lugar.',
 'Como a foto é real, a legenda atual sobre data e tamanho do protesto deve estar correta.',
 'Como há uma foto antiga, toda a conta pode ser tratada como falsa em qualquer publicação.'
 ],'O uso inadequado da foto está demonstrado. A ocorrência de um protesto hoje é uma alegação distinta e exige verificação independente. Evite ampliar uma conclusão além do que a evidência permite.',
 feed('Facebook','Vila em Debate','Hoje • 09:02','Protesto lotou a praça hoje! Veja a foto.',[{label:'Arquivo localizado',text:'A mesma imagem foi publicada em 11/10/2021 como registro de uma feira cultural em outra cidade.'},{label:'Consulta até o momento',text:'Não foi apresentado um registro independente sobre o suposto protesto de hoje.'}],'3.100 compartilhamentos')),
 q('pos17',4,'Palavras fora de sequência','O vídeo curto une dois momentos de uma fala. Qual conclusão a transcrição completa sustenta?',[
 'A montagem muda o sentido: a pessoa rejeitou a proposta de fechar a biblioteca, em vez de anunciá-la.',
 'A pessoa anunciou o fechamento, pois as palavras “vamos fechar” aparecem com sua própria voz.',
 'A gravação completa deve ser falsa porque sua conclusão é diferente da legenda do corte.',
 'A diferença de sentido é apenas uma opinião, pois qualquer sequência das palavras tem o mesmo valor.'
 ],'A fala completa é “Não vamos fechar a biblioteca”. O corte remove a negação e junta outro momento. Voz autêntica não garante fidelidade do recorte à declaração original.',
 video('“Vamos fechar a biblioteca”','Clipe viral: “vamos fechar… a biblioteca”. Há um salto visível entre os trechos.',[{label:'Transcrição do original • 02:10',text:'“Não vamos fechar a biblioteca. A proposta foi rejeitada.”'},{label:'Transcrição do original • 05:40',text:'“A biblioteca terá uma sala de leitura adicional.”'}],'Dois trechos unidos • vídeo original consultado')),
 q('pos18',5,'Pedido convincente','O contato usa nome e foto de alguém conhecido. Qual decisão combina verificação e proteção diante do pedido?',[
 'Não enviar o código e confirmar o pedido por outro canal já conhecido, iniciado por você.',
 'Enviar o código se o contato responder uma pergunta cuja resposta aparece nas redes da pessoa.',
 'Enviar apenas metade do código para testar se o contato realmente precisa dele.',
 'Confirmar por mensagem no próprio número novo e confiar se o remetente repetir o pedido.'
 ],'Nome, foto e informações públicas podem ser copiados. Confirmar no mesmo canal desconhecido não fornece independência. Um código de acesso não deve ser entregue como teste; consulte a pessoa por um contato já conhecido.',
 chat('Professora Paula • número novo',[['Paula','Troquei de número. Você pode me mandar o código que chegou no seu celular? É para ativar a sala da turma.','16:10'],['Paula','Já sei que você é do 3º B, pode confiar.','16:11']], [{label:'Pistas do caso',text:'Número não salvo. Foto e nome iguais aos do perfil conhecido. O código recebido permite acessar uma conta do estudante.'}])),
 q('pos19',5,'Denunciar sem espalhar','Você encontra uma postagem que expõe dados de uma pessoa e contém uma acusação sem evidência. Qual resposta é mais responsável?',[
 'Usar a denúncia da plataforma, preservar só o necessário sem redistribuir dados e orientar a pessoa por um canal privado.',
 'Repostar com o título “isso é falso”, mantendo os dados para que o público entenda a denúncia.',
 'Marcar a pessoa e pedir que se explique publicamente antes de verificar a acusação.',
 'Copiar o texto para todos os grupos da turma, porque desmentidos precisam circular mais que o original.'
 ],'Um desmentido pode ampliar a exposição se repetir identificadores ou acusações. Denuncie pelo canal apropriado, minimize o material preservado e, quando pertinente, avise a pessoa de forma privada. Verifique sem estimular assédio.',
 feed('Facebook','Perfil sem identificação','Hoje • 18:50','Postagem acusa um estudante e inclui endereço e telefone. Não apresenta documentos nem uma fonte verificável.',[{label:'Situação',text:'A publicação começou a ser compartilhada em grupos da escola. Os dados não são necessários para verificar a alegação.'}],'Conteúdo denunciável • identidade exposta')),
 q('pos20',5,'A resposta com incerteza','As buscas ainda não confirmaram nem refutaram o aviso. Qual mensagem comunica melhor o estado da verificação?',[
 '“Ainda não encontrei confirmação do aviso. Não vou repassar como fato; consulte o canal conhecido da organização.”',
 '“Não achei a notícia em dois portais, então está comprovado que o aviso é falso.”',
 '“Não foi desmentido até agora, então podemos tratar o aviso como confirmado.”',
 '“Talvez seja verdade. Vou repassar para a turma decidir se a ausência de fonte importa.”'
 ],'Ausência de confirmação não equivale a prova de falsidade; ausência de desmentido não confirma a alegação. Comunique o limite da investigação e indique um caminho pertinente, sem ampliar a circulação como se fosse um fato.',
 chat('Equipe da feira',[['Davi','Recebi que a feira mudou de local. Você confirmou?','09:12'],['Eu','Busquei nos dois portais locais e não achei nada. O canal da organização ainda não respondeu.','09:18']], [{label:'Estado da verificação',text:'A mensagem inicial não tem fonte. Até o momento, não há confirmação nem refutação independente.'}]))
 ];
}
