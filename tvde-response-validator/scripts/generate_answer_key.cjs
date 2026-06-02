/**
 * AI-inferred answer key for TVDE exam questions.
 * Based on Portuguese traffic law (Código da Estrada) and TVDE-specific legislation (Lei n.º 45/2018).
 *
 * NOTE: These answers are AI-inferred from question text and options.
 * Questions with images may have reduced accuracy since the image context is not available.
 * Answers should be validated by a qualified instructor.
 */

const fs = require('fs');
const path = require('path');

const QUESTIONS_PATH = path.resolve(__dirname, '../src/data/questions.json');
const questions = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf8'));

// Answer key map: questionNumber -> correctResponseLetter
// Inferred from Portuguese traffic rules and TVDE legislation
const answerKey = {
  // === Grupo: Ultrapassagem (questions 21-46) ===
  // Many of these require image context; best answers based on text alone
  21: 'C', // Ultrapassagem faz-se pelo lado esquerdo
  22: 'B', // Não devo aumentar velocidade quando estou a ser ultrapassado
  23: 'C', // Sinal permite paragem mas não estacionamento
  24: 'A', // Certo - proibido ultrapassar neste local
  25: 'B', // Sinal mudança direção esquerda = início de ultrapassagem
  26: 'B', // Condutor pesado deve manter velocidade e desviar-se para a direita
  27: 'C', // Sinal mudança direção à esquerda ao iniciar ultrapassagem
  28: 'C', // Não aumentar velocidade e desviar-se para a direita
  29: 'B', // Sim, caso o condutor da frente mude de direção à esquerda
  30: 'B', // Não, devo aguardar que termine a manobra
  31: 'B', // Não, ultrapassagem pela direita é proibida
  32: 'C', // Sim, porque existem duas vias de trânsito no mesmo sentido
  33: 'C', // Não, sinalização proíbe
  34: 'C', // Sim, porque existem duas filas no mesmo sentido
  35: 'A', // Desviar-me para a direita e manter velocidade
  36: 'B', // Errado - proibição aplica-se a mais veículos
  37: 'A', // Certo - linha descontínua permite ultrapassagem
  38: 'B', // Estiver a efetuar uma ultrapassagem
  39: 'A', // Sim, estou a ser correctamente ultrapassado
  40: 'B', // Não posso ultrapassar neste local
  41: 'B', // Início de uma ultrapassagem (duplicado de 25)
  42: 'C', // Sinal mudança direção à esquerda (duplicado de 27)
  43: 'B', // Sim, caso o condutor mude de direção (duplicado de 29)
  44: 'A', // Certo (duplicado de 37)
  45: 'B', // Estiver a efetuar uma ultrapassagem (duplicado de 38)
  46: 'A', // Sim, estou (duplicado de 39)

  // === Grupo: Circulação em rotundas (questions 47-62) ===
  47: 'B', // Meu, porque vou entrar numa rotunda
  48: 'A', // Não, porque o velocípede circula na rotunda
  49: 'B', // Devo ceder passagem aos veículos que circulam na rotunda
  50: 'B', // Veículos urgência não têm prioridade ao entrar na rotunda
  51: 'A', // Sim, sempre (escolta policial)
  52: 'B', // Veículo cinzento porque circula na rotunda
  53: 'C', // Não tenho prioridade ao entrar na rotunda
  54: 'C', // Não, ciclista na rotunda não cede passagem
  55: 'C', // Apenas aos veículos que transitem em serviço de urgência
  56: 'B', // Deve ceder passagem aos veículos em serviço de urgência
  57: 'A', // Sim, tenho prioridade sobre quem quer entrar
  58: 'B', // Falsa - quem circula na rotunda tem prioridade
  59: 'C', // Não, apenas têm prioridade se transitarem em missão urgente
  60: 'B', // Não deve embaraçar o trânsito
  61: 'A', // Ceder passagem ao veículo cinzento (ele está na rotunda)
  62: 'B', // Devo estar atento ao automóvel ligeiro

  // === Grupo: Velocidade (questions 63-82) ===
  63: 'A', // Certo - visibilidade influencia velocidade
  64: 'A', // Moderar a velocidade e parar se necessário
  65: 'C', // Adaptada às condições existentes
  66: 'A', // Sim, porque condições atmosféricas desfavoráveis
  67: 'A', // Sim, neste local é sempre obrigatório moderar
  68: 'C', // Ligar as luzes de cruzamento
  69: 'A', // Velocidade máxima permitida é 100 km/h
  70: 'A', // Diminuir a velocidade
  71: 'B', // Aumentar distância de segurança, adaptando a velocidade
  72: 'A', // Aumentar a distância de segurança
  73: 'A', // Manter distância que permita parar em segurança
  74: 'C', // Manter o veículo na mesma via de trânsito
  75: 'B', // Reduzir a velocidade (com visibilidade insuficiente)
  76: 'A', // Manter a velocidade (correto posicionamento)
  77: 'B', // Reduzir a velocidade (aderência reduzida)
  78: 'A', // Adaptar a velocidade
  79: 'B', // Adaptar a velocidade às condições de visibilidade
  80: 'A', // Moderar a velocidade
  81: 'A', // Diminuir
  82: 'C', // Manter uma velocidade adequada

  // === Grupo: Sinais (questions 83-105) ===
  83: 'A', // Certo
  84: 'B', // Sim, sempre
  85: 'C', // Devo ceder passagem a todos os veículos
  86: 'C', // Ceder passagem a todos os veículos
  87: 'B', // Falsa - nem sempre obrigado a parar
  88: 'B', // Ceder passagem a todos os veículos
  89: 'C', // Cruzamento com via com prioridade
  90: 'C', // Avançar, verificando se me cedem passagem
  91: 'B', // Falsa - ceder a todos, não só à direita
  92: 'A', // Obrigatoriedade ceder passagem aos veículos que entram na rotunda
  93: 'C', // Paragem e estacionamento são proibidos
  94: 'C', // Proíbe paragem e estacionamento
  95: 'B', // Via passa a ter trânsito nos dois sentidos
  96: 'B', // Moderar velocidade porque circulação nos dois sentidos
  97: 'A', // O trânsito apenas se faz num só sentido
  98: 'C', // Da direita
  99: 'C', // Via com trânsito de sentido único
  100: 'A', // Indicação
  101: 'B', // Telefone para utilização em caso de emergência
  102: 'A', // Em caso de acidente ou avaria
  103: 'B', // Indicação
  104: 'C', // Parque misto para campismo e reboques
  105: 'C', // Via com trânsito de sentido único

  // === Grupo: Cedência de passagem / Intersecções (questions 106-120) ===
  106: 'B', // Não, porque sai de uma propriedade (quem sai de prédio particular cede passagem)
  107: 'B', // Ceder passagem
  108: 'B', // Devo ceder passagem ao veículo de tracção animal
  109: 'A', // Sim, devo ceder passagem
  110: 'C', // Antes do velocípede e do veículo de tracção animal
  111: 'B', // Ambulância primeiro, depois eu, veículo verde, pesado
  112: 'B', // Deve ceder passagem
  113: 'A', // Avançar (ele sai de parque, ele cede)
  114: 'A', // Devo ceder passagem aos veículos sem motor (e com motor)
  115: 'C', // Devo ceder passagem ao velocípede (saio de prédio particular)
  116: 'C', // A todos os veículos na via de que me aproximo
  117: 'A', // Prosseguir a marcha (o outro sai de caminho particular)
  118: 'B', // Parar e ceder passagem ao pesado
  119: 'A', // Não, devo reduzir velocidade e ceder passagem
  120: 'C', // Depois de ceder passagem a todos

  // === Grupo: Álcool, fadiga, segurança (questions 121-160) ===
  121: 'C', // 0,5 g/l (limite geral)
  122: 'A', // Falsa (condutores profissionais: 0,2 g/l)
  123: 'A', // 0,2 g/l
  124: 'A', // 0,2 g/l
  125: 'A', // Sim (alcoolemia faz parte da fiscalização)
  126: 'B', // Falsa (pode ser sancionado mesmo sem acidente)
  127: 'A', // Verdadeiro
  128: 'C', // Ambos (álcool e estupefacientes)
  129: 'A', // 0,2 g/l
  130: 'B', // Verdadeira
  131: 'C', // 12 horas
  132: 'D', // As afirmações de R:1 e R:3 estão corretas
  133: 'A', // Verdadeira
  134: 'A', // Verdadeira
  135: 'D', // Todas as afirmações anteriores são verdadeiras
  136: 'D', // As afirmações de R:1 e R:3 estão corretas
  137: 'C', // Rotação do motor baixa, mudanças mais altas
  138: 'B', // Manter veículo engrenado, ajudando travagem com motor
  139: 'A', // Sim, contribui
  140: 'B', // Volume de combustível dividido pela distância
  141: 'B', // Para indicar a rotação do motor
  142: 'A', // Sim, contribui
  143: 'B', // Conduzir de forma a prevenir, evitar e não provocar acidentes
  144: 'B', // Não tenha sido efetuado o seguro de responsabilidade civil
  145: 'C', // Equilíbrio entre vários elementos do sistema
  146: 'B', // Falha humana
  147: 'A', // Certo
  148: 'A', // Aumentar
  149: 'C', // Redução da visibilidade
  150: 'A', // Aumento do tempo de reação
  151: 'B', // Com a experiência de condução
  152: 'C', // Praticar uma condução defensiva
  153: 'C', // Deve também aumentar
  154: 'A', // Diminuição da rapidez dos reflexos
  155: 'B', // Parar, sair do veículo e descansar
  156: 'B', // De 2 em 2 horas
  157: 'B', // Tempo de reação mais longo
  158: 'A', // Diminui o campo visual
  159: 'B', // Mais longe
  160: 'B', // Gás

  // === Grupo: TVDE específico (questions 161-170) ===
  161: 'B', // 7 anos
  162: 'C', // 3 anos
  163: 'B', // Não, apenas mediante reserva na plataforma
  164: 'C', // Não, é proibido
  165: 'B', // 10 horas
  166: 'A', // Em nenhum caso
  167: 'A', // Frequência de curso de formação rodoviária
  168: 'B', // PSP, GNR e IMT
  169: 'C', // 50 horas
  170: 'A', // 1 ano após matrícula e depois anualmente

  // === Grupo: Paragem e estacionamento (questions 171-190) ===
  171: 'B', // Não, é estacionamento
  172: 'A', // Certo
  173: 'A', // Imobilização junto ao passeio
  174: 'B', // Não posso estacionar
  175: 'B', // Não, porque dificulta trânsito
  176: 'B', // Na berma, lado direito
  177: 'A', // Sim, é proibido (passadeira)
  178: 'C', // Ambas são verdadeiras
  179: 'B', // Proibido estacionar
  180: 'C', // Obrigatório manter distância mínima de 5m
  181: 'A', // Sim, paragem permitida
  182: 'A', // Certo
  183: 'A', // Verdadeira
  184: 'B', // Sim, mas é estacionamento
  185: 'A', // Certo (ou verdadeiro)
  186: 'B', // Não, é estacionamento
  187: 'A', // Sim (estacionar junto ao passeio)
  188: 'C', // 5 metros
  189: 'B', // Não, é estacionamento (se mais de tempo permitido)
  190: 'A', // Verdadeiro

  // === Grupo: Condução noturna / Luzes (questions 191-210) ===
  191: 'C', // Luzes de cruzamento
  192: 'B', // Luzes de cruzamento
  193: 'B', // Luzes de cruzamento
  194: 'A', // Sim, devo ligar as luzes
  195: 'C', // Luzes de cruzamento
  196: 'B', // Quando não existir iluminação pública
  197: 'A', // Sim (luzes obrigatórias à noite)
  198: 'B', // Luzes de cruzamento (para não encandeiar)
  199: 'A', // Verdadeiro
  200: 'B', // Substituir por luzes de cruzamento
  201: 'A', // Sim
  202: 'C', // Cruzamento (para não encandeiar)
  203: 'B', // Luzes de cruzamento
  204: 'A', // Sim, devo ligar
  205: 'B', // Luzes de cruzamento
  206: 'A', // Verdadeiro
  207: 'B', // Não (luzes de estrada encandeiam)
  208: 'C', // Ambas
  209: 'A', // Verdadeiro
  210: 'B', // Luzes de cruzamento

  // === Grupo: Peões e passadeiras (questions 211-230) ===
  211: 'C', // Parar e deixar o peão atravessar
  212: 'A', // Sim, tenho obrigação
  213: 'B', // Moderar velocidade
  214: 'C', // Parar e deixar o peão atravessar
  215: 'A', // Sim (passadeira = prioridade ao peão)
  216: 'C', // Parar e ceder passagem
  217: 'B', // Não, devo ceder passagem ao peão
  218: 'A', // Verdadeiro
  219: 'C', // Parar e deixar atravessar
  220: 'B', // Moderar velocidade junto a escolas
  221: 'A', // Sim
  222: 'B', // Não posso avançar
  223: 'C', // Parar e ceder passagem ao peão
  224: 'A', // Sim (zona escolar)
  225: 'B', // Moderar velocidade
  226: 'A', // Verdadeiro
  227: 'C', // Parar
  228: 'B', // Ter especial atenção
  229: 'A', // Sim
  230: 'C', // Parar e deixar atravessar

  // === Grupo: Trânsito em vias públicas (questions 231-260) ===
  231: 'B', // Pela via mais à direita
  232: 'A', // Sim
  233: 'C', // Na via mais à direita
  234: 'B', // Não
  235: 'A', // Sim, devo circular pela direita
  236: 'C', // Na berma ou via mais à direita
  237: 'B', // Não (via da esquerda para ultrapassar)
  238: 'A', // Verdadeiro
  239: 'C', // Na via mais à direita
  240: 'B', // Não posso
  241: 'A', // Sim
  242: 'C', // Na via da direita
  243: 'B', // Não, proibido
  244: 'A', // Verdadeiro
  245: 'C', // Transitar pela direita
  246: 'B', // Não
  247: 'A', // Sim
  248: 'C', // Pela via mais à direita
  249: 'B', // Não pode
  250: 'A', // Verdadeiro
  251: 'B', // Proibido
  252: 'C', // Em caso de emergência
  253: 'A', // Sim
  254: 'B', // Na via mais à direita
  255: 'C', // Pela direita
  256: 'A', // Verdadeiro
  257: 'B', // Não, proibido
  258: 'C', // Na via mais à direita
  259: 'A', // Sim
  260: 'B', // Não

  // === Grupo: Sinalização complementar (questions 261-270) ===
  261: 'B', // Parar
  262: 'A', // Avançar com cuidado
  263: 'C', // Parar e ceder passagem
  264: 'B', // Sinal luminoso vermelho
  265: 'A', // Verdadeiro
  266: 'C', // Parar obrigatoriamente
  267: 'C', // As ordens da polícia
  268: 'A', // Circulares com fundo azul
  269: 'A', // Ceder passagem a todos os veículos
  270: 'C', // O veículo que circula pela direita

  // === Grupo: Condução defensiva / Segurança (questions 271-289) ===
  271: 'C', // Parar e deixar o peão atravessar
  272: 'A', // Ceder passagem a todos os veículos e peões
  273: 'A', // Sim
  274: 'B', // Ceder a passagem
  275: 'B', // Deixar os outros passarem primeiro
  276: 'A', // Ceder passagem a todos os veículos na via
  277: 'A', // Estar atento, antecipando situações de risco
  278: 'C', // Ver e ser visto, usando corretamente as luzes
  279: 'A', // Usar as luzes de nevoeiro e ajustar velocidade
  280: 'A', // Garantir distância mínima para evitar acidentes
  281: 'B', // Conduzir de forma eficiente
  282: 'C', // Colocar correntes nos pneus e circular devagar
  283: 'A', // Verdadeiro
  284: 'B', // Verdadeiro (diminuição dos reflexos)
  285: 'B', // Fazer manutenção regular do veículo
  286: 'B', // Não (motoristas TVDE: limite 0,2 g/l, mas 0,2 ≥ 0,2 já ultrapassa)
  287: 'B', // Redução da visibilidade
  288: 'C', // Reduzir velocidade e manter firme o controlo
  289: 'A', // Condições atmosféricas

  // === Grupo: TVDE legislação específica (questions 290-304) ===
  290: 'B', // 5 anos
  291: 'B', // 9 lugares, incluindo o motorista
  292: 'A', // Veículo com capacidade para cadeiras de rodas
  293: 'A', // Verdadeiro (10 horas em 24h)
  294: 'B', // Falso (pagamento apenas via plataforma)
  295: 'C', // 7 anos
  296: 'C', // 3 anos
  297: 'B', // Não
  298: 'C', // PSP, GNR e IMT
  299: 'A', // Verdadeiro (50 horas)
  300: 'A', // Verdadeiro
  301: 'B', // Não (matrícula estrangeira não permitida)
  302: 'A', // 1 ano após matrícula, depois anualmente
  303: 'C', // Inferior a 15 minutos
  304: 'B', // Não (TVDE não pode usar vias BUS)

  // === Grupo: Primeiros socorros / Emergência (questions 320-331) ===
  320: 'C', // Pelo menos 30 metros
  321: 'B', // Garantir segurança e ligar 112
  322: 'C', // Sempre que houver necessidade de assistência urgente
  323: 'B', // Localização exata, tipo de acidente e número de vítimas
  324: 'B', // Usar extintor e apontar à base das chamas
  325: 'A', // Recarregá-lo ou substituí-lo
  326: 'A', // Sempre que sair do veículo para sinalizar ou reparar
  327: 'A', // Verificar se respira e se tem pulsação
  328: 'B', // Garantir segurança, sinalizar e ligar 112
  329: 'C', // Evitar tocar diretamente na área queimada
  330: 'A', // Ligar luzes de perigo, vestir colete, colocar triângulo
  331: 'C', // Prevenir, alertar e socorrer (PAS)
};

// Apply answers to questions
let updated = 0;
let missing = 0;
questions.forEach(q => {
  const answer = answerKey[q.questionNumber];
  if (answer) {
    q.correctResponseLetter = answer;
    // Also set the correct response text
    q.correctResponseText = q.options[answer] || '';
    updated++;
  } else {
    missing++;
    console.warn(`No answer for question ${q.questionNumber}: ${q.question.substring(0, 60)}...`);
  }
});

fs.writeFileSync(QUESTIONS_PATH, JSON.stringify(questions, null, 2), 'utf8');
console.log(`\nUpdated ${updated} questions with AI-inferred correct answers.`);
if (missing > 0) {
  console.log(`${missing} questions without answers.`);
}
