'use strict';
/* Casos inteiramente fictícios. As pistas de cada resposta estão no material do caso. */
window.Cases = {
  chat:(group,messages,extra=[])=>({type:'chat',app:'WhatsApp',title:group,subtitle:'Grupo • mensagens do caso',messages,extra}),
  feed:(app,author,date,text,extra=[],meta='')=>({type:'feed',app,title:author,date,text,extra,meta}),
  news:(title,text,date,author,extra=[],site='Cidade Aberta')=>({type:'news',app:site,title,text,date,author,extra,url:site==='Cidade Aberta'?'cidadeaberta.example/noticias':'portalregional.example/noticias'}),
  doc:(title,text,extra=[],chart=null)=>({type:'document',app:'Documento consultado',title,text,extra,chart}),
  video:(title,text,extra=[],meta='')=>({type:'video',app:'Vídeo',title,text,extra,meta}),
  search:(title,results,extra=[])=>({type:'search',app:'Busca',title,results,extra}),
  q:(id,skill,title,prompt,o,e,scene)=>({id,skill,title,prompt,o,a:0,e,scene,image:'assets/casos/'+id+'.png'})
};
window.SKILLS = [
 {name:'Fonte e autoria',icon:'⌕',color:'#008b78',pale:'#d9f7ee',intro:'Rastreie a origem. Descubra quem publicou, quem sabe e quem apenas repetiu.',lesson:['Abra a publicação original e identifique autoria e vínculo com o assunto.','Duas páginas que copiam o mesmo texto não são duas confirmações independentes.','Um selo, um logotipo ou um cargo não substituem evidências verificáveis.']},
 {name:'Data e contexto',icon:'◷',color:'#7447cf',pale:'#eee5ff',intro:'Compare datas, locais e alcance. Um conteúdo verdadeiro também pode ser usado fora de contexto.',lesson:['Separe data de publicação, data do acontecimento e data de atualização.','Confira se o texto se aplica ao lugar, grupo e período citados.','Leia a versão completa e procure alterações ou retificações posteriores.']},
 {name:'Linguagem e intenção',icon:'!',color:'#d76528',pale:'#ffebd8',intro:'Reconheça opinião, publicidade e pressão emocional sem confundir estilo com prova.',lesson:['Um título exagerado é motivo para investigar; sozinho, não prova falsidade.','Compare a afirmação do título com as evidências do texto.','Identifique interesse comercial, patrocínio e diferença entre fato e opinião.']},
 {name:'Dados e evidências',icon:'▥',color:'#ad7800',pale:'#fff2c5',intro:'Examine amostras, percentuais e métodos. Encontre o que os números realmente permitem concluir.',lesson:['Procure tamanho, seleção e período da amostra antes de generalizar.','Compare percentuais com a mesma base e diferencie porcentagem de pontos percentuais.','Associação não demonstra causa. Procure método, limites e fontes dos dados.']},
 {name:'Imagens e vídeos',icon:'▷',color:'#1c76b8',pale:'#deefff',intro:'Investigue recortes, legendas, edições e a origem de uma imagem antes de julgar.',lesson:['Busque a primeira publicação, o arquivo completo e o contexto da captura.','Busca reversa ajuda a encontrar usos anteriores; não garante a conclusão sozinha.','Aparência estranha e detectores automáticos são pistas, não vereditos.']},
 {name:'Segurança e decisão',icon:'◇',color:'#b33c7b',pale:'#ffe3f0',intro:'Escolha como verificar, proteger dados e corrigir uma informação com responsabilidade.',lesson:['Confirme pedidos sensíveis por um canal conhecido, aberto por você.','Um cadeado indica conexão protegida; não comprova identidade nem honestidade.','Preserve a privacidade e corrija boatos com contexto e evidências, sem expor pessoas.']}
];
window.QBANK={diagnostic:[],post:[],modules:SKILLS.map((s,i)=>({...s,id:'m'+(i+1),items:[],xp:600}))};
{
 const {q,chat,feed,news,doc,video,search}=Cases;
 QBANK.diagnostic=[
 q('pre01',0,'O aviso da direção','No grupo, o cancelamento é apresentado como confirmado. Qual procedimento resolve melhor a dúvida antes de avisar outra turma?',[
 'Consultar o canal da escola e, se necessário, contatar a secretaria por um número já conhecido.',
 'Perguntar a dois colegas do mesmo grupo se eles também receberam o aviso.',
 'Usar a foto da direção no perfil como confirmação da autoria da mensagem.',
 'Repassar o aviso com “não sei se é verdade” para evitar assumir a responsabilidade.'
 ],'O grupo não apresenta um comunicado rastreável. Colegas que receberam o mesmo encaminhamento não oferecem confirmação independente. Consulte um canal institucional conhecido e o período a que o aviso se refere.',
 chat('3º ano • avisos',[['Lara','Encaminhada muitas vezes\nA DIREÇÃO CONFIRMOU: amanhã não haverá aula. Avisem todas as turmas!','18:42'],['Diego','Veio de outro grupo. Não tenho o link do comunicado.','18:44']], [{label:'Consulta disponível',text:'Página de avisos da escola: último comunicado informa aulas regulares. Não há aviso sobre amanhã.'}])),
 q('pre02',0,'Duas notícias, uma só origem','Os dois portais parecem confirmar a mudança. O que a comparação dos materiais permite concluir?',[
 'São duas reproduções da mesma alegação; ainda falta uma fonte independente sobre a decisão.',
 'A existência de dois endereços diferentes já confirma que houve apurações independentes.',
 'A publicação com horário mais recente confirma a decisão porque atualiza a primeira.',
 'O uso de aspas no título demonstra que ambos falaram diretamente com a escola.'
 ],'Os dois textos usam a mesma origem e não apresentam apuração adicional. Contar publicações não equivale a contar fontes independentes: rastreie o documento ou a pessoa responsável pela informação.',
 news('Uniforme será obrigatório a partir de segunda?', 'O portal reproduz texto da página “Bairro em Foco”. Não houve resposta da escola até a publicação.', '14/04/2026 • 09:15','Redação',[{label:'Outro portal • 09:40',text:'“Segundo o Bairro em Foco, o uniforme será obrigatório.” O texto e as frases são idênticos.'}])),
 q('pre03',0,'O perfil parecido','Qual verificação diferencia melhor o perfil oficial de uma conta que apenas imita sua aparência?',[
 'Comparar o endereço exato com o link publicado no site da instituição e conferir o aviso por esse canal.',
 'Preferir a conta que tem mais seguidores, porque esse número é mais difícil de falsificar.',
 'Verificar se as cores e o logotipo coincidem com os usados pela instituição.',
 'Aceitar a conta se houver comentários de pessoas dizendo que já foram atendidas.'
 ],'A semelhança visual é fácil de copiar. Um link publicado em um canal institucional conhecido ajuda a identificar a conta correta; comentários e seguidores não comprovam identidade.',
 feed('Instagram','@biblioteca_centraI','Hoje • 10:08','Inscrições para a oficina somente por mensagem privada. Envie seus dados para garantir a vaga.',[{label:'Endereço divulgado no site da biblioteca',text:'Perfil da biblioteca: @biblioteca_central. No post recebido, a última letra foi trocada por I maiúsculo.'}],'8.400 seguidores • identidade não confirmada')),
 q('pre04',0,'Assinatura sem competência','Uma pessoa chamada de “especialista” recomenda um aplicativo de estudo. Qual informação é mais relevante para avaliar a recomendação?',[
 'Sua formação e experiência no tema, as evidências citadas e seu vínculo financeiro com o aplicativo.',
 'A qualidade da fotografia de perfil e a frequência com que publica recomendações.',
 'Seu número de seguidores e a quantidade de elogios recebidos na publicação.',
 'A presença de uma assinatura completa, mesmo sem verificar a área de atuação.'
 ],'Autoridade depende de competência pertinente e evidências. Um vínculo comercial deve ser considerado ao avaliar o argumento, mas não permite declarar automaticamente que a recomendação é falsa.',
 feed('Facebook','Dr. André Lima','12 de abril • 16:30','Como especialista, recomendo o EstudaMais: melhora o desempenho de qualquer estudante.',[{label:'Informações do perfil',text:'Doutorado em arquitetura. Parceiro comercial do EstudaMais. A postagem não cita estudo sobre aprendizagem.'}],'Publicação patrocinada')),
 q('pre05',1,'A foto de “hoje”','A imagem pode ser autêntica. Qual problema está demonstrado pelas pistas do caso?',[
 'A publicação atribui ao presente uma imagem documentada em outro ano e em outra cidade.',
 'A repetição da imagem em dois sites prova que ela foi criada por inteligência artificial.',
 'O resultado mais antigo prova que não pode ter ocorrido nenhuma enchente hoje.',
 'A imagem não permite investigação porque uma foto não registra texto escrito.'
 ],'O arquivo encontrado contradiz a legenda atual quanto a data e lugar. Isso demonstra uso fora de contexto dessa imagem, sem resolver se houve algum evento semelhante hoje.',
 feed('Facebook','Notícias do Bairro','Hoje • 08:12','ENCHENTE AGORA em Vila Clara! Foto enviada por um morador.',[{label:'Resultado de busca da imagem',text:'Arquivo do Jornal Vale: a mesma imagem, publicada em 18/02/2022, em Porto das Águas.'}],'Foto anexada • 236 compartilhamentos')),
 q('pre06',1,'O comunicado de amanhã','Hoje é 16/08/2026. O print original é de 02/05/2024 e diz “amanhã”. Qual conclusão é sustentada pelo material?',[
 'O “amanhã” se refere a 03/05/2024; é preciso verificar um comunicado atual para saber a situação de 17/08/2026.',
 'A ausência de um ano no corpo da mensagem permite usar o aviso em qualquer data.',
 'Como foi encaminhado hoje, o horário passa a valer automaticamente para amanhã.',
 'O aviso antigo é suficiente para afirmar que o serviço não ocorrerá nunca mais.'
 ],'Expressões relativas dependem da data original. Encaminhar hoje não atualiza a validade do comunicado. O caso só permite localizar o aviso em 2024; a situação atual exige outra consulta.',
 chat('Transporte • moradores',[['Márcia','Recebi agora: “Amanhã não haverá a linha 8. Aviso da empresa.”','07:05'],['Eu','O print mostra 02/05/2024 no cabeçalho.','07:06']], [{label:'Data da análise',text:'16/08/2026. Não foi apresentado um comunicado referente a 17/08/2026.'}])),
 q('pre07',1,'Regra de qual município?','O post afirma que a regra vale para todos. Qual é a leitura mais precisa do documento anexado?',[
 'A regra apresentada vale para as escolas municipais de Serra Azul; outras redes precisam de verificação própria.',
 'A regra vale para qualquer escola da região porque os municípios são vizinhos.',
 'Uma regra municipal nunca pode atingir estudantes, então o documento é irrelevante.',
 'Como o documento é oficial, a legenda “todas as escolas” está automaticamente correta.'
 ],'Uma fonte oficial pode ser autêntica e estar sendo generalizada de forma indevida. O alcance citado é uma rede específica; o material não estabelece a regra para escolas estaduais ou particulares.',
 doc('Portaria 18 • Serra Azul','Art. 1º — Nas escolas da rede municipal de Serra Azul, a entrada ocorrerá às 7h30 a partir de 10/03/2026.',[{label:'Legenda no Facebook',text:'“Todas as escolas da região vão mudar o horário. Já é oficial!”'}])),
 q('pre08',2,'Título maior que a pesquisa','Qual reformulação preserva melhor o que o texto de fato sustenta?',[
 'Em uma turma observada, o uso do aplicativo esteve associado a notas maiores; o estudo não demonstrou causa.',
 'O aplicativo garante melhora das notas para todos os estudantes que o instalarem.',
 'A melhora não existiu, pois uma pesquisa com poucos participantes sempre é falsa.',
 'A escola comprovou que estudar fora do aplicativo reduz o desempenho de todos.'
 ],'O texto descreve uma associação em um grupo pequeno, sem sorteio ou grupo de comparação. O título transforma isso em uma garantia causal e universal que os dados não sustentam.',
 news('APLICATIVO GARANTE NOTAS 30% MELHORES','Em uma turma de 20 voluntários, usuários do aplicativo tinham notas médias maiores. Não houve grupo de controle nem sorteio dos participantes.','05/06/2026 • 11:10','Equipe Educação')),
 q('pre09',2,'Post pago','O aviso “parceria paga” muda a forma de avaliar a postagem. Qual leitura é mais adequada?',[
 'Há interesse comercial declarado; a promessa precisa de evidências além do depoimento do influenciador.',
 'A declaração de patrocínio comprova que todas as informações da postagem são falsas.',
 'A aprovação de um influenciador substitui a necessidade de evidências sobre o produto.',
 'Um anúncio com patrocínio explícito deve ser tratado como pesquisa independente.'
 ],'A transparência do patrocínio ajuda a reconhecer a intenção. Ela não prova falsidade ou eficácia. A promessa de resultado continua precisando de evidências e limites claros.',
 feed('Instagram','@rotinadeestudos','Hoje • 13:20','Passei na prova com o ResumoFlash! Use meu cupom. A marca diz que funciona para qualquer matéria.',[{label:'Aviso na postagem',text:'Parceria paga com ResumoFlash. Não há link para avaliação independente do produto.'}],'1.204 curtidas')),
 q('pre10',2,'Fato e avaliação','Qual trecho expressa principalmente uma opinião, em vez de um fato verificável com os dados apresentados?',[
 '“Foi a pior organização que nossa cidade já teve.”',
 '“O evento estava anunciado para começar às 18h.”',
 '“A abertura ocorreu às 18h40, segundo a gravação.”',
 '“O comunicado previa três apresentações musicais.”'
 ],'“Pior organização” é um julgamento que exigiria critérios de comparação. Horários e número de apresentações podem ser conferidos em registros. Um texto pode misturar fatos verificáveis e opiniões.',
 feed('Facebook','Helena Costa','21 de junho • 20:10','O evento estava anunciado para 18h. A gravação mostra a abertura às 18h40. O comunicado previa três apresentações. Foi a pior organização que nossa cidade já teve.',[], 'Publicação pessoal')),
 q('pre11',3,'A enquete dos seguidores','A enquete recebeu 120 votos. Qual conclusão respeita o modo como os participantes foram selecionados?',[
 '80% dos respondentes dessa enquete apoiaram a proposta; não é possível representar toda a cidade com esse dado.',
 '80% de todos os moradores apoiaram a proposta, pois a enquete ficou aberta ao público.',
 'O resultado representa a cidade se o post for compartilhado por mais dois perfis.',
 'O percentual deve ser descartado, porque nenhuma informação de enquete pode ser descrita.'
 ],'A enquete informa as respostas de quem escolheu participar entre os seguidores. A amostra não foi selecionada para representar a população da cidade; o percentual pode ser descrito apenas com esse limite.',
 feed('Instagram','@mobilidadeclarense','Ontem • 19:00','Você apoia fechar a rua aos domingos? Resultado: SIM 96 votos • NÃO 24 votos.',[{label:'Legenda da página',text:'“80% da cidade apoia a proposta.” A participação era voluntária entre os seguidores.'}],'Enquete encerrada • 120 respostas')),
 q('pre12',3,'Percentual e base','Qual comparação resume corretamente a mudança entre os dois levantamentos?',[
 'A proporção de reclamações caiu de 20% para 10%, apesar de o número absoluto ter aumentado de 20 para 30.',
 'A proporção de reclamações aumentou 50%, porque 30 é maior que 20.',
 'A proporção ficou igual, pois ambos os períodos registraram reclamações.',
 'A proporção caiu para zero porque o total de atendimentos triplicou.'
 ],'Divida as reclamações pelo total de atendimentos em cada período: 20/100 = 20% e 30/300 = 10%. Comparar apenas os totais de reclamações ignora que as bases são diferentes.',
 doc('Relatório de atendimento • Centro Jovem','Janeiro: 100 atendimentos e 20 reclamações. Fevereiro: 300 atendimentos e 30 reclamações.',[{label:'Título do post',text:'“Reclamações aumentam 50%. Serviço piorou?”'}])),
 q('pre13',3,'O eixo do gráfico','Os valores são 98 e 100. Por que o gráfico passa uma impressão exagerada da diferença?',[
 'O eixo começa em 97, ampliando visualmente uma diferença de 2 em relação à escala completa.',
 'O eixo começa em 97, o que altera o valor numérico de 98 para 1.',
 'Qualquer gráfico de barras demonstra automaticamente uma relação de causa.',
 'Duas barras com alturas diferentes bastam para comprovar um aumento de 100%.'
 ],'A diferença é de 2 unidades, aproximadamente 2,04% sobre 98. O recorte do eixo pode fazer a mudança parecer muito maior. O corte não torna os dados falsos, mas precisa ser considerado na interpretação.',
 doc('Uso da biblioteca','Visitas por dia: antes = 98; depois = 100. O gráfico publicado usa eixo vertical de 97 a 101.',[],{title:'Visitas diárias',labels:['Antes','Depois'],values:[98,100],min:97,max:101,unit:'visitas'})),
 q('pre14',3,'Associação não é causa','Que conclusão é compatível com o estudo descrito?',[
 'Há associação entre os grupos observados; motivação e hábitos prévios podem ajudar a explicar a diferença.',
 'O curso foi a única causa da diferença, pois as médias dos dois grupos não são iguais.',
 'O curso não tem nenhum efeito possível, porque não houve sorteio dos participantes.',
 'A nota média maior elimina a necessidade de comparar as características dos grupos.'
 ],'Os participantes escolheram fazer o curso. Sem controlar diferenças anteriores, como motivação e desempenho, a associação não identifica sozinha a causa. Isso também não demonstra ausência de efeito.',
 news('Alunos de curso extra têm média maior','40 alunos escolheram fazer o curso e tiveram média 8. Outros 40 não fizeram e tiveram média 7. O estudo não mediu notas anteriores ou hábitos de estudo.','08/07/2026 • 15:00','Núcleo de Educação')),
 q('pre15',4,'A fala cortada','O trecho de 8 segundos parece contradizer o anúncio da biblioteca. Como investigar a fala de forma mais útil?',[
 'Localizar a gravação completa e ouvir o trecho anterior e posterior, conferindo a data da fala.',
 'Usar o número de visualizações do corte para estimar se a legenda está correta.',
 'Considerar a legenda verdadeira porque a voz parece ser da pessoa indicada.',
 'Analisar apenas a expressão facial para descobrir o que a pessoa quis dizer.'
 ],'Uma gravação autêntica pode ter sido recortada para alterar o sentido. O contexto temporal e a sequência completa ajudam a verificar o que foi afirmado, sem depender de popularidade ou aparência.',
 video('“A biblioteca vai fechar”','Trecho: “…a biblioteca vai fechar…” • 8 segundos',[{label:'Descrição do arquivo completo',text:'Reunião de 12/03/2026. Vídeo original disponível: 18 minutos. O corte não inclui a frase completa.'}],'14 mil visualizações • publicado hoje')),
 q('pre16',4,'Busca reversa','Uma busca reversa não encontrou resultado para a foto. O que isso permite concluir?',[
 'A origem continua indeterminada; a busca pode não ter indexado a imagem e precisa de outras verificações.',
 'A ausência de resultados comprova que a foto foi tirada hoje pelo autor do post.',
 'A ausência de resultados comprova que a imagem foi criada por inteligência artificial.',
 'O arquivo deixa de ser verificável e deve ser aceito conforme sua aparência.'
 ],'Ferramentas de busca não abrangem todos os arquivos. Um resultado vazio não prova autenticidade, novidade ou geração por IA. Procure a publicação original, contexto, registros e fontes pertinentes.',
 search('Origem da imagem anexada',[{title:'Nenhuma correspondência exata encontrada',url:'Busca por imagem',text:'O serviço não identificou usos anteriores da imagem enviada.'}],[{label:'Post recebido',text:'“Foto inédita da escola hoje.” O post não informa fotógrafo, horário nem local preciso.'}])),
 q('pre17',4,'O recorte da fila','A legenda afirma que havia “uma multidão”. Que verificação responde diretamente à limitação do enquadramento?',[
 'Comparar a imagem com o enquadramento completo e outros registros do mesmo local e horário.',
 'Contar os comentários da publicação e usar esse total como medida do público.',
 'Considerar a proximidade das pessoas no recorte como prova do total de presentes.',
 'Descartar o recorte como montagem apenas porque não mostra o ambiente inteiro.'
 ],'O recorte pode mostrar pessoas reais sem representar o tamanho total do público. Ver o enquadramento completo e registros do mesmo momento ajuda a avaliar a legenda; recorte não é sinônimo de montagem.',
 feed('Instagram','@cidadeemdia','Hoje • 10:20','Multidão lota a fila da oficina!',[{label:'Imagem anexada',text:'Recorte fechado em oito pessoas. A entrada e o restante da praça não aparecem.'},{label:'Registro disponível',text:'O fotógrafo publicou também uma imagem panorâmica tirada no mesmo minuto.'}],'Post com fotografia recortada')),
 q('pre18',5,'O endereço com cadeado','Qual atitude lida melhor com o risco do convite recebido?',[
 'Abrir o site conhecido da biblioteca por conta própria e conferir se o processo existe antes de fornecer dados.',
 'Fornecer os dados, pois o endereço começa com https e mostra um cadeado.',
 'Enviar primeiro apenas o código de acesso para verificar se o cadastro funciona.',
 'Confiar se o formulário usar o logotipo e as cores da biblioteca.'
 ],'A conexão https não garante quem controla o site. A identidade e o processo devem ser verificados em um canal aberto por você, a partir de um endereço conhecido. Não teste um convite enviando um código de acesso.',
 chat('Contato não salvo',[['Biblioteca — vagas','Últimas vagas! Cadastro em https://biblioteca-vagas.example. Precisamos do seu código de acesso para validar.','14:02']], [{label:'Barra do navegador',text:'Cadeado • https://biblioteca-vagas.example. O endereço divulgado no site conhecido é biblioteca.example.'}])),
 q('pre19',5,'Um print com dados pessoais','A turma quer verificar uma lista vazada. Qual abordagem protege a privacidade durante a verificação?',[
 'Evitar divulgar o print, ocultar dados pessoais ao pedir ajuda e consultar a instituição por um canal conhecido.',
 'Repostar a lista completa para que os titulares reconheçam seus próprios nomes.',
 'Enviar a lista para grupos maiores, pois a exposição ajuda a encontrar a origem.',
 'Marcar as pessoas citadas no print antes de confirmar se o documento é autêntico.'
 ],'A verificação não exige ampliar a exposição de pessoas. Preserve apenas o material necessário, oculte identificadores e consulte a instituição responsável. Não assuma que um print já demonstra autenticidade.',
 chat('Turma • dúvidas',[['João','Mandaram uma lista com nomes, telefones e supostas notas. Vamos postar para saber se é verdadeira?','11:12'],['Bia','O documento não tem data nem assinatura.','11:13']], [{label:'Conteúdo do anexo',text:'Identificadores pessoais de estudantes. Origem e autenticidade ainda não verificadas.'}])),
 q('pre20',5,'Corrigir no mesmo grupo','Você compartilhou um aviso e depois encontrou a retificação oficial. Qual resposta reduz melhor o dano?',[
 'Publicar a correção no mesmo grupo, explicar o que mudou e incluir o comunicado atualizado com data.',
 'Apagar a mensagem antiga sem avisar, para que os leitores deduzam a mudança.',
 'Enviar só um emoji de dúvida, pois repetir o assunto pode atrair atenção.',
 'Atribuir o erro a quem encaminhou primeiro, sem apresentar a informação correta.'
 ],'Quem viu o aviso inicial precisa encontrar a correção. Uma mensagem clara no mesmo canal, com a fonte atualizada e a mudança explicada, permite rever a informação sem expor ou atacar quem compartilhou.',
 chat('Moradores • Vila Clara',[['Eu','A oficina foi cancelada. Acabei de receber o aviso.','09:05'],['Nina','A organização retificou: apenas a oficina de domingo foi cancelada. A de sábado continua.','09:40']], [{label:'Comunicado atualizado • 09:30',text:'Organização da oficina: “Retificação: cancelamento restrito a domingo. Atividades de sábado mantidas.”'}]))
 ];
}
window.SURVEY=['A plataforma foi fácil de utilizar.','As instruções das atividades foram fáceis de compreender.','Os casos ajudaram a manter minha atenção.','A pontuação deixou as atividades mais interessantes.','As explicações ajudaram a compreender meus erros.','As atividades ajudaram a avaliar fontes e evidências.','Eu me senti motivado(a) a concluir os desafios.','Eu utilizaria novamente uma plataforma semelhante em aula.'];
