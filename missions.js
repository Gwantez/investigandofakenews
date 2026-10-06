'use strict';
{
 const {q,chat,feed,news,doc,video,search}=Cases;
 QBANK.modules[0].items=[
 q('fon01',0,'A origem do áudio','O áudio apresenta uma pessoa como funcionária da escola. Qual verificação é mais útil para sustentar a informação sobre o calendário?',[
 'Confirmar a identidade e o vínculo da pessoa e consultar o calendário em um canal conhecido da escola.',
 'Pedir que outra pessoa escute o áudio e avalie se a voz parece segura.',
 'Considerar o tempo de gravação como sinal de que a pessoa conhece os detalhes.',
 'Repassar apenas o trecho final, em que a suposta funcionária afirma ter certeza.'
 ],'Uma autodescrição no áudio não verifica identidade ou acesso à informação. A voz e a confiança não substituem o calendário ou a confirmação do responsável. Rastrear a origem reduz a dependência de encaminhamentos.',
 chat('Calendário • turma',[['Caio','Áudio encaminhado • 0:48\n“Trabalho na secretaria. As provas foram adiadas, podem avisar.”','13:22'],['Júlia','Quem gravou? Não aparece nome nem data.','13:23']], [{label:'Canal da escola',text:'O calendário e as alterações são publicados em escola.example/calendario.'}])),
 q('fon02',0,'Um selo e uma promessa','Um perfil com selo anuncia uma descoberta sobre estudo. Qual conjunto de evidências teria mais valor para avaliar a alegação?',[
 'O estudo original com método e resultados, além da competência do autor no tema e de eventuais vínculos.',
 'O selo da conta e uma coleção de comentários afirmando que o método funciona.',
 'O número de aparições do autor em podcasts sobre assuntos variados.',
 'A rapidez com que o post atingiu o mesmo público de outros influenciadores.'
 ],'Um selo é uma informação sobre a conta dentro de uma plataforma; não valida cada afirmação que ela publica. Avalie a evidência pertinente e seus limites, quem a apresenta e quais interesses estão envolvidos.',
 feed('Instagram','@professor_novidades ✓','Hoje • 08:00','Novo método faz qualquer aluno memorizar um livro em um dia. “A ciência confirmou!”',[{label:'Material anexado',text:'Vídeo promocional e depoimentos. Nenhum estudo original ou método é identificado.'}],'Conta com selo • 85 mil seguidores')),
 q('fon03',0,'Uma pesquisa da própria marca','O blog usa um relatório da empresa que vende o produto. Qual leitura evita tanto aceitar quanto rejeitar o resultado sem análise?',[
 'Reconhecer o interesse da empresa, examinar o método e buscar avaliações independentes para a promessa.',
 'Concluir que todo dado financiado por uma empresa é falso, sem precisar ler o relatório.',
 'Aceitar a promessa porque a empresa é quem mais conhece o produto que vende.',
 'Tratar a repetição do relatório em blogs parceiros como replicação da pesquisa.'
 ],'O financiamento é relevante para avaliar possíveis vieses, mas não decide sozinho a validade. Método, transparência, resultados e avaliações independentes são necessários. Reprodução comercial não é replicação.',
 news('Ferramenta aumenta a concentração, diz relatório','O relatório foi produzido pelo fabricante e não descreve a seleção dos participantes. O blog recebe comissão pelos cadastros.','07/05/2026 • 09:30','Blog Rotina Leve',[{label:'Origem dos dados',text:'Relatório interno da empresa FocoLeve. Os três blogs citados reproduzem esse mesmo relatório.'}],'Portal Regional')),
 q('fon04',0,'Da imagem ao documento','O post mostra apenas uma captura de um “edital”. Qual material permite uma verificação mais completa?',[
 'O edital integral encontrado no site conhecido do organizador, com número, data, regras e alterações.',
 'Uma captura maior da mesma imagem que inclua comentários feitos por candidatos.',
 'O perfil de quem repassou a captura, com uma foto e uma descrição profissional.',
 'A confirmação de outro grupo que recebeu o mesmo recorte na mesma manhã.'
 ],'O documento integral permite conferir autoria, vigência, condições e retificações. A captura pode servir de pista, mas não oferece o contexto completo. Outros destinatários do mesmo arquivo não acrescentam uma fonte independente.',
 feed('Facebook','Vagas da Cidade','Hoje • 09:10','Curso gratuito: inscrições só até hoje. Veja o edital no print!',[{label:'Recorte publicado',text:'Mostra apenas o título “Edital 07” e uma data de encerramento. O nome do organizador está cortado.'},{label:'Pista do rodapé',text:'Trecho de endereço visível: centrojovem.example/editais'}],'Print anexado • 410 compartilhamentos')),
 q('fon05',0,'Os resultados da busca','Qual resultado deve ser aberto primeiro para conferir a programação anunciada pela organização?',[
 'A página de programação no endereço conhecido do organizador, conferindo o período e eventuais alterações.',
 'O anúncio patrocinado no topo, porque sua posição significa maior qualidade de verificação.',
 'A publicação mais compartilhada, porque o alcance ajuda a confirmar o calendário.',
 'O blog com o título mais parecido com a mensagem, sem analisar de onde recebeu a informação.'
 ],'A posição na busca pode refletir publicidade ou critérios de ordenação, não confirmação. Uma fonte primária pertinente é um bom ponto de partida; ainda é preciso conferir a vigência e as alterações.',
 search('Programação Feira Jovem agosto',[{title:'Reserve sua vaga — anúncio',url:'Patrocinado • ingressosoferta.example',text:'“Agenda completa e última chance!”'},{title:'Feira Jovem • programação',url:'feirajovem.example/programacao',text:'Canal conhecido da organização. Agenda e atualizações.'},{title:'Agenda da semana',url:'blogdobairro.example',text:'Reprodução de um calendário recebido por mensagem.'}])),
 q('fon06',0,'A fonte que sabe','Para verificar se uma oficina específica será realizada amanhã, quem oferece a fonte mais diretamente pertinente?',[
 'A organização responsável pela oficina, consultada em um canal conhecido, com confirmação da data e do local.',
 'Um perfil grande que costuma comentar eventos culturais, mesmo sem falar com a organização.',
 'Um participante de outra oficina, que diz nunca ter visto um evento ser cancelado.',
 'Um influenciador da cidade que compartilhou a mesma mensagem sem citar sua origem.'
 ],'A pertinência importa tanto quanto a identidade. O responsável pelo evento pode confirmar a programação; um perfil popular ou alguém de outro evento não tem necessariamente acesso à decisão que está sendo investigada.',
 chat('Oficina de fotografia',[['Neto','A oficina de amanhã vai acontecer? Um perfil disse que foi cancelada.','19:02'],['Rafa','O perfil não citou a organização nem o local.','19:03']], [{label:'Dados conhecidos',text:'A oficina é organizada pelo Centro Jovem, que publica uma agenda e um contato em seu site.'}]))
 ];
 QBANK.modules[1].items=[
 q('ctx01',1,'Feriado em outra rede','Você estuda em uma escola estadual de Vila Clara. Qual conclusão é sustentada pelo aviso apresentado?',[
 'O aviso descreve a rede municipal de Serra Azul; não determina o calendário da sua escola.',
 'O aviso se aplica à sua escola porque as duas cidades estão na mesma região.',
 'O aviso se aplica às escolas estaduais porque menciona a palavra “escolas”.',
 'O aviso prova que sua escola terá aula, pois ela não pertence à rede citada.'
 ],'O documento não estabelece o calendário da sua escola, nem a suspensão nem a manutenção. O alcance é outra rede e outra cidade. Consulte o calendário pertinente sem transferir automaticamente a regra.',
 doc('Aviso • Secretaria de Serra Azul','Em 12/06/2026, não haverá atividades nas escolas da rede municipal de Serra Azul.',[{label:'Mensagem recebida',text:'“Sem aula na região toda amanhã!”'},{label:'Seu contexto',text:'Escola estadual de Vila Clara. Nenhum comunicado dessa escola foi apresentado.'}])),
 q('ctx02',1,'A data prorrogada','As inscrições foram prorrogadas por um documento posterior. Que informação você deve compartilhar agora?',[
 'O prazo de 18/09, mencionando a prorrogação e incluindo o comunicado de 10/09.',
 'O prazo de 12/09, porque o cartaz original foi publicado antes da retificação.',
 'Os dois prazos sem explicação, para que cada pessoa escolha o que acredita.',
 'Nenhum prazo, pois uma prorrogação torna o processo inteiro inválido.'
 ],'A retificação posterior trata do mesmo processo e explica a mudança. Compartilhar a data vigente junto com a alteração evita ambiguidade e permite localizar a fonte do prazo.',
 doc('Oficina de vídeo • prorrogação','Comunicado de 10/09/2026: o prazo de inscrição da oficina foi prorrogado de 12/09 para 18/09.',[{label:'Cartaz em circulação',text:'Publicado em 02/09/2026: “Inscrições até 12/09”.'},{label:'Consulta',text:'Cartaz e prorrogação estão no mesmo canal conhecido do organizador.'}])),
 q('ctx03',1,'A exceção apagada','Qual leitura evita ampliar a regra além do documento completo?',[
 'O empréstimo dura sete dias para livros gerais; os de referência seguem prazo de dois dias.',
 'Todo material pode ficar sete dias, porque essa é a primeira regra do texto.',
 'Todo material deve ficar apenas dois dias, porque a exceção anula o prazo geral.',
 'O prazo pode ser escolhido pelo leitor, porque duas regras aparecem no documento.'
 ],'O documento define uma regra geral e uma exceção para uma categoria. O recorte omitiu a categoria especial. Uma interpretação precisa preserva ambas, em vez de escolher apenas uma frase.',
 doc('Biblioteca • regras de empréstimo','Livros gerais: empréstimo por sete dias. Livros de referência: prazo de dois dias.',[{label:'Post do grupo',text:'“Todos os livros podem ficar uma semana com você.” O print mostra apenas a primeira linha.'}])),
 q('ctx04',1,'A manchete retirada','A captura guarda uma notícia que depois foi retirada por erro. Como descrever o estado atual da informação?',[
 'A alegação inicial foi retirada pela fonte; usar o print como confirmação ignora a correção posterior.',
 'O print continua confirmando a alegação, porque registra algo que esteve publicado.',
 'A retirada comprova automaticamente a alegação contrária, mesmo sem evidências.',
 'A captura deve prevalecer sobre a correção porque preserva a primeira versão.'
 ],'Uma captura comprova que um texto apareceu, não que sua alegação permaneça sustentada. A retirada altera o estado da informação; ela não comprova por si só uma afirmação contrária.',
 news('Nota de correção: agenda da praça','Retiramos a informação sobre o cancelamento do show. O documento citado se referia a outro evento. A programação será confirmada pela organização.','16/07/2026 • 12:40','Redação',[{label:'Captura compartilhada • 13h',text:'Manchete anterior das 9h: “Show da praça cancelado”. A correção não aparece na imagem.'}])),
 q('ctx05',1,'O cartaz sem ano','O cartaz mostra “sábado, 8 de junho” e voltou a circular em 2026. Qual investigação é mais pertinente?',[
 'Localizar a publicação original e o calendário atual do organizador para identificar o ano e a validade.',
 'Assumir que o ano é 2026 porque o cartaz foi compartilhado novamente neste ano.',
 'Concluir que o evento nunca aconteceu porque a imagem não inclui o ano.',
 'Usar a qualidade da impressão para estimar em qual ano a oficina foi marcada.'
 ],'O ano ausente é uma lacuna a investigar. Uma republicação não atualiza o cartaz; aparência não data o evento. A publicação original e a agenda do organizador permitem relacionar o anúncio ao período correto.',
 feed('Facebook','Agenda comunitária','Compartilhado em 01/06/2026','Oficina de escrita • sábado, 8 de junho • 14h • Centro Jovem',[{label:'Cartaz anexado',text:'Não informa ano. A conta não inclui link para a publicação original.'},{label:'Pista de origem',text:'Logotipo do Centro Jovem e nome da oficina são visíveis.'}],'Cartaz republicado')),
 q('ctx06',1,'Não era um resultado final','O post trata um boletim parcial como resultado definitivo. Qual conclusão o arquivo permite?',[
 'Naquele boletim parcial, 60% das respostas contadas eram favoráveis; o resultado final precisa ser consultado.',
 'A proposta obteve 60% no resultado final, porque o boletim usa um percentual exato.',
 'O percentual parcial deve ser aplicado ao total final sem considerar novas respostas.',
 'O boletim é falso porque uma consulta só pode divulgar números depois do encerramento.'
 ],'O arquivo informa explicitamente um estágio parcial. Ele descreve aquele momento, não o encerramento. A precisão do número não elimina a necessidade de conferir período e completude.',
 doc('Consulta comunitária • boletim 2','Boletim parcial de 14/08, às 12h. 300 respostas recebidas; 180 favoráveis. A consulta termina em 16/08, às 18h.',[{label:'Post de 17/08',text:'“Resultado final: 60% a favor.” O anexo é o boletim parcial de 14/08.'}]))
 ];
 QBANK.modules[2].items=[
 q('lin01',2,'Urgente, mas verificável','O título é exagerado, porém há um documento pertinente. Qual análise evita julgar apenas a linguagem?',[
 'Conferir o documento, suas condições e a data; o tom exagerado não decide sozinho a veracidade.',
 'Rejeitar a notícia como falsa porque títulos em letras maiúsculas não podem informar fatos.',
 'Aceitar toda a legenda porque qualquer link para um documento garante a interpretação.',
 'Compartilhar só o título, pois a urgência elimina a necessidade de ler as condições.'
 ],'Linguagem sensacionalista merece atenção. Ainda assim, a alegação deve ser comparada às evidências. O documento pode confirmar parte do anúncio e limitar outras partes; não avalie apenas o tom ou a presença de um link.',
 news('URGENTE!!! BIBLIOTECA ABRE AOS DOMINGOS!','Um comunicado informa abertura experimental em dois domingos de setembro, das 9h às 12h. A matéria traz o documento completo.','01/09/2026 • 09:05','Redação',[{label:'Legenda da rede',text:'“Agora a biblioteca abre todo domingo. Avise todo mundo!”'}])),
 q('lin02',2,'Crítica não é dado','Qual informação precisaria de critérios adicionais, além dos registros apresentados?',[
 'A afirmação de que a oficina foi “a melhor da cidade”.',
 'A afirmação de que houve 40 inscrições no formulário.',
 'A afirmação de que a oficina começou às 14h, registrada na transmissão.',
 'A afirmação de que ocorreram duas atividades, conforme a programação.'
 ],'“A melhor” depende de critérios de qualidade e comparação. Inscrições, horário e atividades são elementos verificáveis em registros. É possível discutir a opinião sem confundi-la com uma medida objetiva.',
 feed('Facebook','Pedro Alves','Ontem • 18:00','Foram 40 inscrições, duas atividades e início às 14h. Foi a melhor oficina da cidade!',[{label:'Registros anexados',text:'Formulário de inscrições, programação e transmissão da abertura.'}],'Relato pessoal')),
 q('lin03',2,'O conteúdo da parceria','Qual rótulo explica melhor o interesse declarado desse texto?',[
 'Conteúdo promocional com comissão por venda; a alegação de resultado exige evidência própria.',
 'Avaliação independente, porque o autor descreve detalhes do produto.',
 'Notícia sem interesse comercial, porque o cupom é opcional para o leitor.',
 'Pesquisa científica, porque o texto apresenta a experiência pessoal do autor.'
 ],'O cupom com comissão revela incentivo comercial. Detalhar o produto ou relatar uma experiência não equivale a uma avaliação independente ou pesquisa. A classificação ajuda a avaliar a promessa com evidências adequadas.',
 feed('Instagram','@aprendacomigo','Hoje • 12:20','O curso fez minha nota subir. Use MEUCURSO e ganhe desconto. Recebo comissão em cada inscrição.',[{label:'Alegação do anúncio',text:'“Todo estudante melhora dez pontos.” Não há estudo anexado nem definição da escala.'}],'Cupom com comissão')),
 q('lin04',2,'Mil curtidas não são mil testes','O que o alto engajamento demonstra diretamente?',[
 'A publicação recebeu atenção e reações; isso não confirma que o método produziu o resultado prometido.',
 'Pelo menos mil pessoas testaram o método e obtiveram o resultado informado.',
 'A plataforma verificou a promessa antes de permitir o engajamento do post.',
 'O número de curtidas equivale a uma amostra representativa de estudantes.'
 ],'Curtidas podem expressar interesse, humor, concordância ou outras reações. Elas não registram aplicação do método, mensuração de resultado ou amostra representativa. Popularidade e evidência respondem a questões distintas.',
 feed('Facebook','Estudo em 5 minutos','Hoje • 08:00','Este truque dobra a memória. A prova? Mais de mil curtidas!',[{label:'Dados exibidos',text:'1.087 curtidas e 210 compartilhamentos. Nenhum teste ou método de avaliação apresentado.'}],'Engajamento do post')),
 q('lin05',2,'“Todos” a partir de poucos','Qual parte da manchete extrapola o texto?',[
 '“Todos os alunos”, pois o relato descreve apenas oito participantes de uma oficina.',
 '“Gostaram”, pois nenhuma experiência pessoal pode ser relatada por quem participou.',
 '“Oficina”, pois atividades curtas não podem receber esse nome.',
 '“Alunos”, pois participantes voluntários deixam de ser estudantes.'
 ],'A afirmação universal não decorre de oito relatos. É possível informar que oito participantes gostaram, identificando a forma de coleta. A generalização deve respeitar quem foi ouvido e o que foi medido.',
 news('Todos os alunos aprovam a nova oficina','Oito participantes voluntários disseram ter gostado da atividade. A escola tem 640 estudantes; os demais não foram consultados.','18/08/2026 • 10:00','Redação da comunidade')),
 q('lin06',2,'Duas opções fabricadas','O post diz que só há duas posições possíveis. Qual resposta avalia melhor o argumento?',[
 'Separar a proposta da acusação: é possível avaliar custo, acesso e alternativas sem aceitar esse rótulo.',
 'Aceitar a proposta para provar compromisso com a educação, sem analisar suas condições.',
 'Rejeitar a proposta porque o autor usou uma acusação e toda proposta assim é inviável.',
 'Escolher a posição que recebeu mais comentários para evitar uma análise individual.'
 ],'O texto reduz um debate a um falso dilema e associa discordância a uma intenção negativa. Isso não avalia o mérito da proposta. Procure condições, custos, acesso e alternativas, sem aceitar o rótulo ou julgar apenas o tom.',
 feed('Facebook','Movimento Pela Leitura','Hoje • 16:15','Ou você apoia este aplicativo pago obrigatório, ou não se importa com a educação.',[{label:'Detalhes ausentes',text:'O post não apresenta preço, política de acesso, evidências de aprendizagem ou alternativas gratuitas.'}],'Argumento com pressão emocional'))
 ];
}
{
 const {q,chat,feed,news,doc,video,search}=Cases;
 QBANK.modules[3].items=[
 q('dad01',3,'Mais casos, menor proporção','Qual afirmação respeita os totais dos dois períodos?',[
 'O número de atrasos cresceu, mas a proporção caiu de 5% para 3%.',
 'A proporção de atrasos cresceu 50%, porque houve 60 em vez de 40.',
 'A proporção permaneceu em 5%, porque o mesmo serviço foi avaliado.',
 'Não é possível calcular uma proporção quando o total de entregas muda.'
 ],'Antes: 40/800 = 5%. Depois: 60/2.000 = 3%. O número absoluto cresceu 50%, enquanto a proporção caiu. Declare qual medida você compara e mantenha os denominadores visíveis.',
 doc('Entregas da biblioteca','Março: 800 entregas, 40 atrasos. Abril: 2.000 entregas, 60 atrasos.',[{label:'Manchete do post',text:'“Atrasos disparam 50%. Biblioteca está pior?”'}])),
 q('dad02',3,'Uma mudança, duas medidas','O percentual passou de 20% para 30%. Qual descrição distingue corretamente as medidas?',[
 'Subiu 10 pontos percentuais, o que corresponde a um aumento relativo de 50%.',
 'Subiu 10 pontos percentuais, o que corresponde a um aumento relativo de 10%.',
 'Subiu 50 pontos percentuais, pois 30 é metade a mais que 20.',
 'Subiu 30 pontos percentuais, pois o percentual final foi 30%.'
 ],'A diferença é 30 − 20 = 10 pontos percentuais. Em relação ao valor inicial, 10/20 = 50%. Informe claramente a medida; um crescimento relativo alto pode partir de uma base pequena.',
 doc('Adesão à oficina','Antes: 20% dos estudantes. Depois: 30%. Para este caso, a população e o método de medição são os mesmos.',[{label:'Frase em análise',text:'“A adesão aumentou 10%.” O texto não define a medida.'}])),
 q('dad03',3,'Quem respondeu?','Por que não se deve tratar o resultado como opinião de todos os estudantes?',[
 'Só foram ouvidos voluntários do clube de leitura; a seleção pode diferir do restante da escola.',
 'Porque 18 votos favoráveis são poucos, mesmo se toda a escola tivesse 20 estudantes.',
 'Porque enquetes de opinião são sempre falsas, independentemente de como foram feitas.',
 'Porque o total de votos contrários precisa ser maior para uma pesquisa representar a escola.'
 ],'A questão principal é a seleção da amostra, não uma regra fixa sobre quantos votos bastam. O clube pode reunir pessoas com interesses diferentes do restante da escola. Descreva o grupo consultado e evite generalização.',
 feed('Instagram','@clubedaleitura','Ontem • 17:00','18 de 20 participantes apoiaram aumentar o orçamento da biblioteca.',[{label:'Como foi feita',text:'Pergunta enviada apenas aos voluntários do clube de leitura. Escola com 700 estudantes.'},{label:'Legenda',text:'“90% de toda a escola apoia a proposta.”'}],'Consulta restrita ao clube')),
 q('dad04',3,'A escala que impressiona','Como avaliar a diferença apresentada sem depender apenas da altura das barras?',[
 'Ler os valores e a escala: são 10 visitas a mais, cerca de 1,67% sobre 600.',
 'Concluir que as visitas dobraram, pois a segunda barra tem o dobro da altura aparente.',
 'Somar os valores das barras para obter o percentual de aumento.',
 'Ignorar os números porque o desenho do gráfico deve prevalecer sobre as legendas.'
 ],'O eixo parte de 590, então as alturas aparentes são 10 e 20. Os valores medidos são 600 e 610. O aumento é 10/600 ≈ 1,67%. Eixos recortados podem enfatizar mudanças sem alterar os números.',
 doc('Visitas mensais','Mês A: 600. Mês B: 610. Eixo do gráfico de 590 a 620.',[],{title:'Visitas no mês',labels:['Mês A','Mês B'],values:[600,610],min:590,max:620,unit:'visitas'})),
 q('dad05',3,'A média dos grupos','Qual é a média conjunta dos tempos, considerando quantas pessoas há em cada grupo?',[
 '19 minutos, pois os tempos devem ser ponderados pelos tamanhos dos grupos.',
 '15 minutos, pois basta calcular a média simples entre 10 e 20.',
 '10 minutos, pois o grupo menor representa as pessoas atendidas primeiro.',
 '20 minutos, pois a média do maior grupo substitui a do grupo menor.'
 ],'Some o tempo representado pelos grupos: 10×10 + 90×20 = 1.900 minutos para 100 pessoas. A média é 19 minutos. A média simples das duas médias daria peso igual a grupos de tamanhos diferentes.',
 doc('Atendimento • tempo médio','Grupo A: 10 pessoas, média de 10 minutos. Grupo B: 90 pessoas, média de 20 minutos.',[{label:'Post',text:'“Tempo médio geral: 15 minutos.” A publicação calculou (10 + 20) ÷ 2.'}])),
 q('dad06',3,'Melhorou depois, mas por quê?','Qual informação adicional ajudaria mais a avaliar o efeito da oficina sobre a nota?',[
 'Uma comparação adequada com estudantes semelhantes, considerando dificuldade das provas e desempenho anterior.',
 'Mais relatos de satisfação de quem já obteve notas melhores na segunda prova.',
 'O número de curtidas da postagem que anunciou a melhora das notas.',
 'Uma fotografia dos participantes no dia em que a oficina terminou.'
 ],'Melhorar depois de uma atividade não demonstra que ela foi a causa. Dificuldade da prova, prática e outras diferenças podem influenciar. Uma comparação bem desenhada e medidas pertinentes ajudam a avaliar o efeito.',
 news('Oficina de revisão antecede melhora das notas','A turma teve média 6 antes da oficina e 8 depois. A segunda prova era diferente e não houve grupo de comparação.','09/06/2026 • 14:00','Boletim Educação',[{label:'Comentário divulgado',text:'“O aumento de dois pontos foi causado exclusivamente pela oficina.”'}]))
 ];
 QBANK.modules[4].items=[
 q('img01',4,'A imagem em outro arquivo','A mesma imagem aparece no arquivo de 2020. Qual conclusão é sustentada sem extrapolar?',[
 'Essa imagem não comprova a legenda “capturada hoje”; o evento atual precisa de registros próprios.',
 'A imagem antiga demonstra que nenhum evento ocorreu hoje no local anunciado.',
 'A imagem antiga demonstra que todos os elementos do post foram inventados.',
 'A imagem é autêntica, logo qualquer legenda colocada sobre ela deve ser aceita.'
 ],'Uma foto antiga não serve como registro de captura hoje. Essa descoberta verifica o contexto da imagem, mas não resolve automaticamente todas as alegações sobre o presente. Procure evidência específica do evento atual.',
 search('Imagem da praça • usos anteriores',[{title:'Feira Cultural de 2020',url:'arquivojornal.example/2020/feira',text:'Mesma imagem encontrada. Data: 14/09/2020.'}],[{label:'Legenda recebida',text:'“Praça cheia hoje durante a manifestação.” Não informa fotógrafo nem link para o arquivo original.'}])),
 q('img02',4,'A frase sem a negação','Que comparação resolve diretamente a suspeita sobre o corte?',[
 'O áudio completo, no qual a frase começa com “não”, demonstra que o recorte alterou o sentido.',
 'A quantidade de visualizações confirma o sentido da frase recortada.',
 'A qualidade do som permite concluir que o recorte preserva toda a declaração.',
 'A semelhança da voz permite ignorar a diferença entre o corte e a transcrição completa.'
 ],'O problema não é apenas quem fala, mas o que foi dito em contexto. Remover uma negação pode inverter uma declaração usando material autêntico. Confronte o recorte com o trecho completo e localizável.',
 video('“Vamos cancelar a oficina”','Recorte de 6 segundos: “vamos cancelar a oficina”.',[{label:'Original • 03:12',text:'“Não vamos cancelar a oficina. Precisamos apenas confirmar a sala.”'},{label:'Origem consultada',text:'Gravação completa da reunião, publicada no canal conhecido da organização.'}],'Recorte comparado ao original')),
 q('img03',4,'O vídeo que já circulou','Qual é a leitura adequada ao comparar o post com o arquivo?',[
 'O vídeo já circulou antes e não demonstra a gravação de hoje; a legenda atual exige verificação própria.',
 'O resultado antigo comprova que o arquivo foi editado digitalmente em todos os quadros.',
 'O horário em que o vídeo foi encaminhado define a data em que foi gravado.',
 'A existência de um vídeo antigo impede que qualquer evento parecido aconteça novamente.'
 ],'A data de compartilhamento não é a data de captura. Um uso anterior verificável contradiz a ideia de gravação inédita hoje. É preciso investigar local, data e contexto, sem concluir que eventos semelhantes são impossíveis.',
 video('Trânsito parado agora','Legenda do post: “Gravei agora na entrada da cidade”. O arquivo não inclui data na imagem.',[{label:'Arquivo localizado',text:'O mesmo vídeo, quadro a quadro, em uma notícia de 2021 sobre obras em outra cidade.'}],'Encaminhado hoje • duração: 23 segundos')),
 q('img04',4,'Legenda sem áudio correspondente','As legendas afirmam um cancelamento, mas a transcrição do áudio diz outra coisa. Qual conclusão se apoia nos registros?',[
 'As legendas não correspondem ao áudio apresentado; elas não podem sustentar o cancelamento anunciado.',
 'A legenda confirma o cancelamento porque textos escritos são mais precisos que uma fala.',
 'A diferença comprova que a pessoa mudou de opinião depois de gravar o vídeo.',
 'A transcrição é irrelevante se o vídeo foi publicado por um perfil com muitos seguidores.'
 ],'Compare a legenda com o que se ouve no arquivo pertinente. A diferença demonstra que a legenda não representa a fala apresentada. Não há registro de mudança de opinião nem de cancelamento no material consultado.',
 video('Oficina cancelada?','Legenda inserida: “A oficina de sábado foi cancelada”.',[{label:'Áudio transcrito',text:'“A oficina de sábado começa às 9h. A sala será divulgada amanhã.”'},{label:'Arquivo completo',text:'O trecho anterior e posterior não menciona cancelamento.'}],'Legenda adicionada pelo perfil')),
 q('img05',4,'O relatório do detector','Um detector diz “possível IA”, mas não informa a taxa de erro. Como usar esse resultado?',[
 'Como pista limitada, combinada com procedência, arquivo original, contexto e outras verificações.',
 'Como prova conclusiva de IA, porque o sistema analisou padrões que humanos não veem.',
 'Como confirmação de autenticidade se um segundo detector não encontrar o mesmo padrão.',
 'Como motivo para divulgar a acusação antes de procurar o arquivo original.'
 ],'Detectores podem cometer erros e seu desempenho varia. Uma saída sem validação pertinente não produz certeza sobre um caso. Investigue a origem e confronte evidências independentes, deixando claro o grau de incerteza.',
 doc('Resultado de ferramenta automática','Saída: “Possível conteúdo gerado por IA”. O relatório não descreve método, taxa de erro ou validação para o arquivo analisado.',[{label:'Material enviado',text:'Imagem comprimida várias vezes. Não foi apresentado o arquivo de origem.'}])),
 q('img06',4,'A parte fora do quadro','Como avaliar a legenda “ninguém compareceu” diante dos registros disponíveis?',[
 'Comparar horário e enquadramento: uma imagem antes da abertura não representa toda a duração do evento.',
 'Aceitar a legenda porque a foto é nítida e o ambiente aparece vazio.',
 'Descartar a fotografia como artificial porque outro registro mostra pessoas no local.',
 'Usar a média de curtidas das duas imagens para decidir qual representa o evento.'
 ],'Os registros foram feitos em momentos diferentes. A foto vazia pode ser autêntica e ainda assim inadequada para afirmar ausência de público durante todo o evento. Data, horário e enquadramento são parte da evidência.',
 feed('Instagram','@olhonapraca','Hoje • 10:00','Ninguém compareceu à feira!',[{label:'Registro A',text:'Imagem da entrada às 7h15, antes da abertura marcada para 9h.'},{label:'Registro B',text:'Gravação do mesmo local às 10h, com visitantes e expositores.'}],'Imagem de antes da abertura'))
 ];
 QBANK.modules[5].items=[
 q('seg01',5,'O link da vaga','Qual procedimento confirma a oportunidade sem depender do endereço enviado?',[
 'Abrir por conta própria o endereço conhecido do organizador e verificar o processo de inscrição.',
 'Preencher o formulário e esperar uma confirmação para decidir se o site era legítimo.',
 'Enviar só o documento de identidade, deixando os demais dados para depois.',
 'Confiar se a página apresentar cadeado, logotipo e um botão de atendimento.'
 ],'Um endereço com aparência familiar pode ser controlado por outra pessoa. Verifique a existência do processo por um canal conhecido, sem testar a legitimidade fornecendo informações pessoais.',
 chat('Vagas • número desconhecido',[['Central de Oficinas','Seu cadastro foi aprovado. Envie um documento em centrojovem-inscricao.example para reservar a vaga.','08:42']], [{label:'Endereço conhecido',text:'A organização usa centrojovem.example. Nenhum link para o outro domínio foi encontrado nesse canal.'}])),
 q('seg02',5,'Confirmar em outro canal','O perfil de um colega pede seu código de entrada. Qual é a melhor resposta?',[
 'Não enviar o código e contatar o colega por outro meio já conhecido, sem confiar apenas no perfil que fez o pedido.',
 'Enviar o código se o perfil souber o nome da turma e a data da próxima prova.',
 'Confirmar com o mesmo perfil se ele realmente é o colega e aceitar sua resposta.',
 'Mandar uma captura do código em vez de digitá-lo para tornar o envio mais seguro.'
 ],'Informações da turma e aparência do perfil podem estar acessíveis a terceiros. Uma confirmação independente ajuda a verificar identidade; códigos de acesso continuam privados. Capturar a tela não protege o conteúdo do código.',
 chat('Lucas • turma',[['Lucas','Preciso do código que chegou no seu celular para abrir a pasta dos trabalhos.','20:14'],['Lucas','É rápido. Nosso trabalho de história é para sexta, lembra?','20:15']], [{label:'Sobre o código',text:'A mensagem de origem diz que o código permite entrar na conta do estudante.'}])),
 q('seg03',5,'A planilha exposta','Antes de pedir ajuda para verificar uma planilha com dados de colegas, qual procedimento é mais adequado?',[
 'Evitar o compartilhamento público, ocultar identificadores e consultar a instituição sobre a autenticidade.',
 'Enviar a planilha completa ao maior grupo disponível para localizar rapidamente os titulares.',
 'Publicar uma captura com nomes e telefones, mas esconder apenas a coluna de notas.',
 'Pedir a cada colega que confirme sua linha em comentários públicos sob a postagem.'
 ],'A minimização de dados reduz exposição durante a checagem. Compartilhar em grupos ou pedir confirmações públicas pode ampliar o dano. Consulte o responsável pelo documento e preserve só o necessário para entender o caso.',
 feed('Facebook','Grupo da escola','Hoje • 12:15','“Essa lista de notas é verdadeira?” Anexo contém nomes, contatos e resultados supostos.',[{label:'Documento',text:'Sem assinatura ou data. Os identificadores não são necessários para perguntar se o modelo de planilha é oficial.'}],'Dados pessoais expostos')),
 q('seg04',5,'A correção que alcança','A mensagem errada circulou em dois grupos. Qual estratégia tem maior chance de corrigir a informação onde ela foi vista?',[
 'Publicar a correção nos dois grupos, indicando a mudança e a fonte atualizada, sem atacar quem repassou.',
 'Apagar apenas a mensagem do seu aparelho e esperar que outros notem a ausência.',
 'Publicar a correção num perfil diferente, sem mencionar os grupos em que circulou.',
 'Avisar apenas quem enviou primeiro, para que a correção dependa de uma pessoa.'
 ],'A correção precisa alcançar os destinatários do erro. Explique de forma direta o que mudou e inclua a fonte pertinente. Culpar ou expor quem compartilhou pode desviar a atenção da evidência e dificultar a atualização.',
 chat('Avisos da oficina',[['Eu','Mandei nos grupos A e B que a oficina era às 8h.','10:20'],['Organização','Correção no calendário: início às 9h. O aviso anterior tinha um erro de digitação.','10:25']], [{label:'Fonte atualizada',text:'Calendário da organização, corrigido às 10h15. Oficina marcada para amanhã às 9h.'}])),
 q('seg05',5,'Não confirmado ainda','Qual resposta representa melhor a incerteza sem ampliar o boato?',[
 'Informar que ainda não há confirmação, suspender o repasse como fato e indicar o canal responsável.',
 'Declarar que é falso porque não apareceu na primeira página dos resultados de busca.',
 'Declarar que é verdadeiro porque ninguém apresentou um desmentido até agora.',
 'Repassar com um ponto de interrogação, mantendo todos os detalhes e a mesma urgência.'
 ],'Uma investigação inconclusiva deve ser comunicada como tal. Ausência de resultado não prova falsidade; ausência de desmentido não confirma. Indique o limite da checagem e um canal útil, evitando ampliar uma alegação sem fonte.',
 chat('Feira do bairro',[['Aline','Disseram que o evento mudou de lugar, mas não achei comunicado.','15:02'],['Eu','A organização ainda não respondeu e o encaminhamento não tem fonte.','15:07']], [{label:'Estado atual',text:'Nenhuma confirmação ou refutação independente encontrada até o momento.'}])),
 q('seg06',5,'O pedido por QR code','Um QR code no cartaz abre uma página que pede credenciais da conta. Qual é o próximo passo mais seguro?',[
 'Fechar o formulário e confirmar o processo pelo site conhecido do organizador antes de fornecer credenciais.',
 'Digitar a senha, pois o QR code estava junto ao logotipo do evento.',
 'Usar a mesma senha com uma letra diferente para testar o formulário.',
 'Compartilhar o código com a turma e esperar que alguém faça uma tentativa primeiro.'
 ],'Um QR code apenas representa um endereço, que pode ser trocado ou imitado. A presença no cartaz não confirma a necessidade de credenciais. Consulte o processo pelo canal conhecido; não teste a página com informações reais ou semelhantes.',
 doc('Cartaz da Feira Jovem','Um QR code promete acesso à programação. A página aberta pede e-mail e senha da conta pessoal do estudante.',[{label:'Endereço aberto',text:'agenda-feira.example. Não aparece entre os endereços divulgados em feirajovem.example.'},{label:'Pergunta essencial',text:'Por que consultar uma programação pública exigiria a senha de outra conta?'}]))
 ];
}
/* Distribuição equilibrada do gabarito. A ordem é fixa para manter o pré/pós comparável. */
{
 const positions=[1,3,0,2,3,1,2,0,2,0,3,1,0,2,1,3,1,0,3,2];
 const order=[0,4,7,10,14,17,1,5,8,11,15,18,2,6,9,12,16,19,3,13];
 QBANK.diagnostic=order.map(i=>QBANK.diagnostic[i]);
 QBANK.post=order.map(i=>QBANK.post[i]);
 const all=[...QBANK.diagnostic,...QBANK.post,...QBANK.modules.flatMap(m=>m.items)];
 all.forEach((q,i)=>{
   const slot=i<20?positions[i]:i<40?positions[(i-20+7)%20]:(i*7+1)%4;
   const correct=q.o[0],wrong=q.o.slice(1);
   if(i%2)wrong.reverse();
   q.o=wrong.slice();q.o.splice(slot,0,correct);q.a=slot;q.tag=SKILLS[q.skill].name;
 });
 window.QUESTION_LIST=all;
 window.QUESTION_BY_ID=Object.fromEntries(all.map(q=>[q.id,q]));
}
