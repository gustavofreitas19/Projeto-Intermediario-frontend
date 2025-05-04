let progresso = {
  saude: 0,
  foco: 0,
  financas: 0,
  ética: 0
};
const pontuacaoSalva = localStorage.getItem("decidaAiPontuacao");
const progressoSalvo = localStorage.getItem("decidaAiProgresso");

if (pontuacaoSalva && progressoSalvo) {
  pontosTotais = parseInt(pontuacaoSalva);
  progresso = JSON.parse(progressoSalvo);
  atualizarGrafico();
}

const perguntas = [
  {
    texto: "Você encontra uma carteira com dinheiro na rua. O que faz?",
    opcoes: [
      "Leva para casa e guarda para si",
      "Pega o dinheiro e joga a carteira fora",
      "Leva à polícia",
      "Tenta encontrar o dono pelas redes sociais",
      "Ignora e continua seu caminho"
    ],
    feedbacks: [
      "Não é ético ficar com o que não é seu.",
      "Além de antiético, isso pode trazer consequências.",
      "Ótima atitude! Ética em primeiro lugar.",
      "Excelente! Proativo e ético.",
      "Ignorar pode parecer neutro, mas é uma oportunidade perdida de fazer o bem."
    ],
    pontuacoes: [-2, -1, 3, 2, 0],
    categoria: ["ética", "ética", "ética", "ética", "ética"]
  },
  {
    texto: "Seu amigo pede dinheiro emprestado. Você:",
    opcoes: [
      "Empresta tudo que tem, mesmo sabendo que vai faltar para você",
      "Diz que não pode ajudar e muda de assunto",
      "Empresta uma parte e combina um prazo de devolução",
      "Fala que ajuda, mas depois some",
      "Sugere outras formas de ele conseguir ajuda"
    ],
    feedbacks: [
      "Generosidade é boa, mas não se coloque em risco.",
      "Ser direto pode ser necessário, mas falta empatia.",
      "Responsável e solidário! Boa escolha.",
      "Falta de compromisso quebra a confiança.",
      "Criativo e solidário. Boa alternativa!"
    ],
    pontuacoes: [0, -1, 3, -2, 2],
    categoria: ["financas", "ética", "ética", "ética", "ética"]
  },
  {
    texto: "Você precisa estudar, mas está muito cansado. O que faz?",
    opcoes: [
      "Força o estudo mesmo sem foco",
      "Tira um cochilo curto e volta depois",
      "Vai dormir e deixa para o dia seguinte",
      "Tenta estudar enquanto vê TV",
      "Toma café e segue estudando"
    ],
    feedbacks: [
      "Sem foco, o estudo pode não render.",
      "Boa! Descanso curto pode recuperar sua energia.",
      "Cuidado com os prazos!",
      "Multitarefa pode atrapalhar a concentração.",
      "Pode funcionar, mas pode gerar ansiedade."
    ],
    pontuacoes: [0, 3, -1, -2, 1],
    categoria: ["foco", "saude", "foco", "foco", "saude"]
  },
  {
    texto: "Você quer economizar, mas aparece uma super promoção. Você:",
    opcoes: [
      "Compra sem pensar, afinal está barato",
      "Avalia se realmente precisa",
      "Compra e se arrepende depois",
      "Espera e pesquisa mais sobre o produto",
      "Decide não comprar para guardar o dinheiro"
    ],
    feedbacks: [
      "Promoções são tentadoras, mas cuidado!",
      "Refletir é sinal de inteligência financeira.",
      "Impulsividade custa caro.",
      "Ótima estratégia!",
      "Excelente controle financeiro!"
    ],
    pontuacoes: [-2, 2, -1, 1, 3],
    categoria: ["financas", "financas", "financas", "financas", "financas"]
  },
  {
    texto: "Você vê alguém sofrendo bullying. Qual sua reação?",
    opcoes: [
      "Finge que não viu",
      "Rir junto para não ser alvo",
      "Chama um responsável ou autoridade",
      "Conversa com a vítima depois",
      "Enfrenta os agressores na hora"
    ],
    feedbacks: [
      "O silêncio também é uma forma de conivência.",
      "Isso alimenta o ciclo de agressão.",
      "Boa! Procurar ajuda é essencial.",
      "Empático, mas poderia ser mais ativo.",
      "Corajoso, mas cuidado com sua segurança."
    ],
    pontuacoes: [-1, -2, 3, 1, 2],
    categoria: ["ética", "ética", "ética", "ética", "ética"]
  },
  {
    texto: "Você tem um compromisso e está atrasado. O que faz?",
    opcoes: [
      "Mente dizendo que está a caminho",
      "Avisa que vai se atrasar e pede desculpas",
      "Finge que esqueceu",
      "Chega correndo e sem se preparar",
      "Remarca o compromisso"
    ],
    feedbacks: [
      "Mentir pode comprometer sua credibilidade.",
      "Boa comunicação mantém a confiança.",
      "Falta de responsabilidade!",
      "Chegar despreparado compromete a qualidade.",
      "Boa opção, mas cuidado para não virar hábito."
    ],
    pontuacoes: [-1, 3, -2, 0, 1],
    categoria: ["ética", "ética", "ética", "foco", "foco"]
  },
  {
    texto: "Você acorda desmotivado. O que faz?",
    opcoes: [
      "Volta a dormir e esquece do dia",
      "Levanta e toma um banho energizante",
      "Faz uma caminhada curta",
      "Liga para um amigo para conversar",
      "Assiste algo para se distrair"
    ],
    feedbacks: [
      "Fugir pode piorar seu estado emocional.",
      "Boa forma de energizar!",
      "Movimento ajuda a liberar energia positiva.",
      "Conexões humanas ajudam muito.",
      "Entretenimento pode aliviar, mas cuidado com a procrastinação."
    ],
    pontuacoes: [-1, 3, 2, 1, 0],
    categoria: ["saude", "saude", "saude", "saude", "saude"]
  },
  {
    texto: "Você precisa se alimentar melhor. O que faz?",
    opcoes: [
      "Come tudo que vê pela frente",
      "Tenta cozinhar algo saudável",
      "Compra comida saudável pronta",
      "Faz jejum para compensar excessos",
      "Consulta um nutricionista"
    ],
    feedbacks: [
      "Alimentação descontrolada afeta sua saúde.",
      "Boa tentativa de mudança!",
      "Prático e saudável!",
      "Jejum sem orientação pode ser perigoso.",
      "Melhor decisão a longo prazo!"
    ],
    pontuacoes: [-2, 2, 1, -1, 3],
    categoria: ["saude", "saude", "saude", "saude", "saude"]
  },
  {
    texto: "Você tem uma promoção para investir em ações de uma empresa. O que faz?",
    opcoes: [
      "Investe tudo, acreditando que vai valorizar rapidamente",
      "Faz uma pesquisa detalhada antes de decidir",
      "Evita investir por medo de perder dinheiro",
      "Consulta um especialista antes de tomar a decisão",
      "Investe apenas uma parte para minimizar o risco"
    ],
    feedbacks: [
      "Investir sem cautela pode ser arriscado.",
      "Pesquisa é a chave para uma decisão bem-informada.",
      "O medo pode te impedir de aproveitar boas oportunidades.",
      "Consultar um especialista é sempre uma boa prática.",
      "Diversificar é uma boa estratégia para reduzir riscos."
    ],
    pontuacoes: [1, 3, -2, 2, 0],
    categoria: ["financas", "financas", "financas", "financas", "financas"]
  },
  {
    texto: "Você recebe uma crítica. Como reage?",
    opcoes: [
      "Ignora e segue como se nada tivesse acontecido",
      "Revida com outra crítica",
      "Escuta e tenta entender",
      "Fica chateado mas reflete depois",
      "Muda seu comportamento com base no que ouviu"
    ],
    feedbacks: [
      "Fingir que não escutou não resolve nada.",
      "Responder com crítica raramente é construtivo.",
      "Boa escuta é fundamental.",
      "Nem sempre é fácil, mas refletir é um bom caminho.",
      "Ótima evolução pessoal!"
    ],
    pontuacoes: [0, -1, 2, 1, 3],
    categoria: ["ética", "ética", "foco", "ética", "ética"]
  },
  {
    texto: "Você precisa fazer um trabalho em grupo. O que faz?",
    opcoes: [
      "Faz tudo sozinho",
      "Divide tudo igualmente",
      "Fica esperando os outros fazerem",
      "Tenta organizar e motivar o grupo",
      "Ignora o grupo e entrega qualquer coisa"
    ],
    feedbacks: [
      "Isso sobrecarrega você e impede aprendizado em grupo.",
      "Boa divisão de tarefas mostra responsabilidade.",
      "Falta de iniciativa afeta o grupo todo.",
      "Liderança positiva é excelente!",
      "Entregar de qualquer jeito compromete o resultado."
    ],
    pontuacoes: [0, 2, -1, 3, -2],
    categoria: ["foco", "ética", "foco", "foco", "ética"]
  },
  {
    texto: "Você pode fazer uma doação. O que decide?",
    opcoes: [
      "Doa um valor simbólico",
      "Ajuda com tempo em vez de dinheiro",
      "Doa uma quantia generosa",
      "Divulga para que mais pessoas ajudem",
      "Não faz nada"
    ],
    feedbacks: [
      "Cada gesto conta.",
      "Tempo também é valioso.",
      "Muito generoso!",
      "Divulgar é uma ótima forma de mobilizar.",
      "Omissão também é uma escolha."
    ],
    pontuacoes: [1, 2, 3, 2, -1],
    categoria: ["ética", "ética", "ética", "ética", "ética"]
  },
  {
    texto: "Você tem pouco tempo para estudar. O que faz?",
    opcoes: [
      "Desiste e tenta no próximo dia",
      "Estuda o essencial com foco total",
      "Lê rapidamente todo o conteúdo",
      "Pede ajuda para alguém explicar",
      "Usa IA para resumir os tópicos"
    ],
    feedbacks: [
      "Deixar para depois pode virar hábito.",
      "Foco é tudo! Boa escolha.",
      "Cuidado com a superficialidade.",
      "Boa! Aprender com outros pode ser eficiente.",
      "A tecnologia pode ser uma grande aliada."
    ],
    pontuacoes: [-1, 3, 1, 2, 2],
    categoria: ["foco", "foco", "foco", "foco", "foco"]
  },
  {
    texto: "Você pensa em trocar de emprego. O que considera?",
    opcoes: [
      "Sai sem ter outro plano",
      "Faz um planejamento financeiro antes",
      "Conversa com amigos da área",
      "Atualiza seu currículo e começa a aplicar",
      "Ignora o incômodo e continua no mesmo lugar"
    ],
    feedbacks: [
      "Impulsividade pode trazer riscos.",
      "Boa! Segurança financeira é essencial.",
      "Buscar opiniões é sábio.",
      "Ótima forma de agir!",
      "Ignorar pode aumentar sua frustração."
    ],
    pontuacoes: [-1, 3, 2, 2, -2],
    categoria: ["financas", "financas", "financas", "financas", "financas"]
  },
  {
    texto: "Você precisa escolher entre um plano de saúde barato e um caro. O que faz?",
    opcoes: [
      "Escolhe o mais barato e torce para não precisar",
      "Analisa custo-benefício e decide com base nisso",
      "Vai pelo mais caro achando que é o melhor",
      "Consulta alguém da área para ajudar",
      "Fica sem plano para economizar"
    ],
    feedbacks: [
      "Economia pode sair caro depois.",
      "Excelente análise racional!",
      "Nem sempre o mais caro é o melhor.",
      "Buscar orientação é uma ótima decisão.",
      "Ficar sem plano pode ser perigoso."
    ],
    pontuacoes: [0, 3, 1, 2, -2],
    categoria: ["financas", "financas", "financas", "financas", "saude"]
  }
];

let perguntaAtual = 0;
let pontosTotais = 0;

const questionElement = document.getElementById("question");
const optionsContainer = document.querySelector(".options");
const feedback = document.getElementById("feedback");
const loader = document.getElementById("loader-confirm");
const confirmButton = document.getElementById("confirm-button");
const pontosDisplay = document.getElementById("pontos");
const contadorPerguntasElement = document.getElementById("contador-perguntas");
const ctx = document.getElementById('progressoGrafico').getContext('2d');

const grafico = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Ética', 'Finanças', 'Saúde','Foco'],
    datasets: [{
      label: 'Evolução do Personagem',
      data: [progresso.ética, progresso.financas, progresso.saude, progresso.foco],
      backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#FF5722'],
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 20,
        min:-10
      }
    }
  }
});

function atualizarGrafico() {
  grafico.data.datasets[0].data = [
    progresso.ética,
    progresso.financas,
    progresso.saude,
    progresso.foco,
    
  ];
  grafico.update();
}

function mostrarPergunta(index) {
  const pergunta = perguntas[index];
  questionElement.textContent = pergunta.texto;

  optionsContainer.innerHTML = "";

  pergunta.opcoes.forEach((opcao, i) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="option" value="${i}"> ${opcao}`;
    optionsContainer.appendChild(label);
    optionsContainer.appendChild(document.createElement("br"));
  });

  feedback.classList.add("hidden");
  atualizarContador(); // Atualiza o contador toda vez que uma pergunta for exibida
}

function atualizarContador() {
  const totalPerguntas = perguntas.length; // Número total de perguntas (15)
  const numeroAtual = perguntaAtual + 1; // A variável perguntaAtual começa em 0, então somamos 1
  document.getElementById("contador-perguntas").textContent = `${numeroAtual} / ${totalPerguntas}`;
}

confirmButton.addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');

  if (!selectedOption) {
    alert("Escolha uma opção antes de confirmar!");
    return;
  }

  const opcaoIndex = parseInt(selectedOption.value);
  const mensagemFeedback = perguntas[perguntaAtual].feedbacks[opcaoIndex];
  const categoriaAfetada = perguntas[perguntaAtual].categoria[opcaoIndex];

  pontosTotais += perguntas[perguntaAtual].pontuacoes[opcaoIndex];
  progresso[categoriaAfetada] += perguntas[perguntaAtual].pontuacoes[opcaoIndex];
  atualizarGrafico();

  feedback.innerHTML = `<p>${mensagemFeedback}</p> 
                          <p>Pontos ganhos: ${perguntas[perguntaAtual].pontuacoes[opcaoIndex]}
                          <p>Pontuação atual: ${pontosTotais}`;
  feedback.classList.remove("hidden");

  confirmButton.disabled = true;
  loader.classList.add('active');
  retornaApiConselho();
  
  if (perguntas[perguntaAtual].pontuacoes[opcaoIndex] <= 1){
    buscarEmoji('negative');  
  } else {
    buscarEmoji('positive');
  }

  setTimeout(() => {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
      loader.classList.remove('active');
      confirmButton.disabled = false;
      mostrarPergunta(perguntaAtual);  // Mostra a próxima pergunta
    } else {
      questionElement.textContent = "Fim do jogo! Obrigado por jogar.";
      optionsContainer.innerHTML = "";
      confirmButton.disabled = true;
    }
  }, 7900);
});

if (perguntaAtual < perguntas.length) {
  mostrarPergunta(perguntaAtual);
} else {
  questionElement.textContent = "Fim do jogo! Obrigado por jogar.";
  optionsContainer.innerHTML = "";
  confirmButton.disabled = true;

  // Salva o estado final no LocalStorage
  localStorage.setItem("decidaAiPontuacao", pontosTotais);
  localStorage.setItem("decidaAiProgresso", JSON.stringify(progresso));
}

// Fora do if/else!
document.getElementById("resetarProgresso").addEventListener("click", () => {
  localStorage.removeItem("decidaAiPontuacao");
  localStorage.removeItem("decidaAiProgresso");
  location.reload(); // Recarrega a página
});

const conselhoTexto = document.querySelector('#resposta-api');

function retornaApiConselho() {
  const url = 'https://api.adviceslip.com/advice';

  fetch(url)
    .then(resposta => resposta.json())
    .then(dados => {
      conselhoTexto.innerText = `💡 Conselho: "${dados.slip.advice}"`;
    })
    .catch(erro => {
      conselhoTexto.innerText = "Não foi possível carregar um conselho agora.";
      console.error("Erro ao buscar conselho:", erro);
    });
}

function buscarEmoji(emocao) {
  const url = 'https://emojihub.yurace.pro/api/random'
  const uri = '/group/face ' + emocao
  fetch(url+uri)
    .then(response => response.json())
    .then(data => {
      if (data && data.htmlCode && data.htmlCode[0]) {
        const emoji = data.htmlCode[0]; // HTML entity do emoji
        feedback.innerHTML +=  `  ${ emoji }`; // Adiciona ao feedback
      }
    })
    .catch(error => {
      console.error("Erro ao buscar emoji:", error);
    });
}      