let progresso = {
  saude: 0,
  foco: 0,
  financas: 0
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
    texto: "Você acordou atrasado para o trabalho. O que faz?",
    opcoes: ["Pula o café da manhã e corre para o trabalho", "Faz uma pausa para um bom café, mesmo sabendo que vai se atrasar", "Relaxar é ótimo, mas lembre-se que a pontualidade é importante"],
    feedbacks: [
      "Café é essencial, mas cuidado com o estresse pela pressa!",
      "Um bom café nunca é demais, mas talvez um pouco de pressa ajude.",
      "Relaxar é ótimo, mas lembre-se que a pontualidade é importante."
    ],
    pontuacoes: [1, 2, 3],
    categoria: ["foco", "saude", "financas"]
  },
  {
    texto: "Você tem 1 hora livre. O que faz?",
    opcoes: ["Fica no sofá vendo memes", "Organiza sua casa e coloca a vida em ordem", "Sai para caminhar e dar uma volta no bairro"],
    feedbacks: [
      "Cuidado com o tempo perdido nas redes sociais.",
      "Ótimo! Organização traz paz de espírito.",
      "Exercício é sempre bom, mas não exagere na caminhada."
    ],
    pontuacoes: [0, 3, 2],
    categoria: ["foco", "saude", "financas"]
  },
  {
    texto: "Você ganhou 100 reais. O que faz com o dinheiro?",
    opcoes: ["Compra algo que você estava querendo há muito tempo", "Põe na poupança e começa a economizar", "Dá para alguém que precisa mais que você"],
    feedbacks: [
      "Compras são divertidas, mas economizar é mais inteligente.",
      "Poupar é sempre bom, mas não se esqueça de se divertir também.",
      "Generosidade é uma virtude, mas lembre-se de cuidar de si também."
    ],
    pontuacoes: [2, 3, 1],
    categoria: ["foco", "financas", "saude"]
  },
  {
    texto: "Você está no trabalho e recebe uma mensagem importante. O que faz?",
    opcoes: ["Ignora e continua no seu ritmo", "Responde imediatamente, mesmo que o trabalho não esteja pronto", "Organiza suas prioridades e responde na hora certa"],
    feedbacks: [
      "Às vezes, ignorar pode ser uma escolha sábia.",
      "A pressa pode gerar erros, tome cuidado.",
      "Bom equilíbrio! Gerenciar prioridades é essencial."
    ],
    pontuacoes: [1, 2, 3],
    categoria: ["foco", "foco", "saude"]
  },
  {
    texto: "Você tem uma reunião importante e está sem inspiração. O que faz?",
    opcoes: ["Pede ajuda a um colega e compartilha as ideias", "Se concentra e tenta achar uma solução sozinho", "Usa um pouco de humor para quebrar o gelo e começar a reunião"],
    feedbacks: [
      "Dividir ideias sempre ajuda a encontrar uma solução.",
      "Concentração é importante, mas compartilhar também é.",
      "Quebrar o gelo pode ser uma boa estratégia para relaxar."
    ],
    pontuacoes: [3, 2, 1],
    categoria: ["foco", "foco", "saude"]
  },
  {
    texto: "Você se depara com uma tarefa difícil. O que faz?",
    opcoes: ["Adia a tarefa e finge que não existe", "Começa a tarefa com uma abordagem prática e focada", "Pede ajuda a alguém mais experiente para aprender mais rápido"],
    feedbacks: [
      "Procrastinação nunca é uma solução.",
      "Foco e dedicação são essenciais para superar desafios.",
      "Pedir ajuda é sempre uma boa maneira de aprender."
    ],
    pontuacoes: [0, 3, 2],
    categoria: ["foco", "foco", "saude"]
  },
  {
    texto: "Você tem que escolher entre trabalhar ou sair com amigos. O que faz?",
    opcoes: ["Fica em casa e termina o trabalho", "Sai com os amigos e deixa o trabalho para depois", "Faz um equilíbrio: trabalha um pouco e depois se encontra com os amigos"],
    feedbacks: [
      "O trabalho é importante, mas também precisa de equilíbrio.",
      "Socializar é bom, mas o trabalho também precisa de atenção.",
      "Excelente escolha! Um bom equilíbrio é essencial."
    ],
    pontuacoes: [1, 2, 3],
    categoria: ["foco", "foco", "saude"]
  },
  {
    texto: "Você tem um projeto criativo, mas está sem ideias. O que faz?",
    opcoes: ["Força uma ideia, mesmo que não esteja inspirado", "Dá um tempo e volta quando sentir mais inspiração", "Pede ajuda a alguém para gerar novas ideias"],
    feedbacks: [
      "Forçar a criatividade pode não ser produtivo.",
      "Dar tempo ao processo criativo é sempre uma boa ideia.",
      "Trocar ideias pode abrir novas perspectivas."
    ],
    pontuacoes: [1, 3, 2],
    categoria: ["foco", "saude", "financas"]
  },
  {
    texto: "Você tem um dia livre. O que faz?",
    opcoes: ["Dorme até tarde e relaxa o dia todo", "Aproveita para aprender algo novo ou praticar um hobby", "Organiza a casa e coloca tudo em ordem"],
    feedbacks: [
      "Relaxar é bom, mas aprender algo novo pode ser mais satisfatório.",
      "Hobbies são ótimos para manter o equilíbrio.",
      "Organizar o ambiente traz uma sensação de bem-estar."
    ],
    pontuacoes: [0, 3, 2],
    categoria: ["foco", "saude", "financas"]
  },
  {
    texto: "Você está no cinema, mas o filme não é tão bom. O que faz?",
    opcoes: ["Fica até o fim e tenta aproveitar ao máximo", "Levanta e vai embora, procurando algo melhor para fazer", "Fica no cinema, mas faz uma pausa para olhar o celular"],
    feedbacks: [
      "Persistência é boa, mas saber quando desistir também é importante.",
      "Sair pode ser a melhor escolha se o filme não está valendo a pena.",
      "Equilibrar entretenimento e foco é sempre uma boa estratégia."
    ],
    pontuacoes: [2, 0, 1],
    categoria: ["saude", "foco", "financas"]
  },
  {
    texto: "Você tem um prazo apertado para entregar um relatório. O que faz?",
    opcoes: ["Trabalha sem parar até terminar", "Organiza uma estratégia e divide o trabalho em etapas", "Pede mais tempo e tenta relaxar antes de retomar"],
    feedbacks: [
      "Trabalhar sem parar pode ser prejudicial a longo prazo.",
      "Dividir o trabalho facilita a execução de tarefas complexas.",
      "Tentar relaxar é bom, mas não deixe o prazo fugir."
    ],
    pontuacoes: [0, 3, 2],
    categoria: ["foco", "foco", "saude"]
  },
  {
    texto: "Você tem um projeto importante e precisa de ajuda. O que faz?",
    opcoes: ["Pede ajuda a um amigo ou colega", "Tenta resolver sozinho, mesmo sem saber como", "Busca soluções alternativas online"],
    feedbacks: [
      "Pedir ajuda pode ser mais eficiente do que tentar fazer tudo sozinho.",
      "Tentar resolver sozinho é uma boa experiência, mas pode ser mais difícil.",
      "Soluções alternativas podem ser uma forma criativa de resolver problemas."
    ],
    pontuacoes: [3, 1, 2],
    categoria: ["foco", "saude", "financas"]
  },
  {
    texto: "Você está no trabalho e alguém pede sua opinião sobre um projeto. O que faz?",
    opcoes: ["Dá uma opinião rápida sem pensar muito", "Pensa com calma e dá uma resposta mais fundamentada", "Fica quieto e não se envolve"],
    feedbacks: [
      "Ser rápido pode ser útil, mas às vezes é bom refletir.",
      "Refletir antes de opinar traz mais consistência à sua resposta.",
      "Às vezes, se abster é uma boa forma de não comprometer sua posição."
    ],
    pontuacoes: [1, 3, 0],
    categoria: ["foco", "foco", "saude"]
  },
  {
    texto: "Você está com dificuldades para completar um projeto. O que faz?",
    opcoes: [
      "Deixa para amanhã e tenta descansar um pouco",
      "Pede feedback a um colega para melhorar o projeto",
      "Trabalha mais horas para tentar terminar o projeto sozinho"
    ],
    feedbacks: [
      "Às vezes é importante descansar, mas não deixe as coisas para última hora.",
      "Pedir feedback pode te ajudar a melhorar e refinar o trabalho.",
      "Trabalhar horas extras pode ajudar, mas o equilíbrio é essencial para qualidade."
    ],
    pontuacoes: [1, 3, 2],
    categoria: ["foco", "foco", "saude"]
  },
  {
    texto: "Você ganhou um aumento no trabalho. O que faz com o dinheiro extra?",
    opcoes: [
      "Compra algo que sempre quis, como um gadget novo",
      "Investe em uma educação ou curso para melhorar suas habilidades",
      "Coloca o dinheiro na poupança para o futuro"
    ],
    feedbacks: [
      "É bom se presentear, mas investir em você também é uma escolha inteligente.",
      "Investir no aprendizado é sempre uma boa escolha para o futuro.",
      "Poupar é importante, mas não deixe de aproveitar um pouco também."
    ],
    pontuacoes: [2, 3, 1],
    categoria: ["financas", "financas", "saude"]
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
    labels: ['Saúde', 'Foco', 'Finanças'],
    datasets: [{
      label: 'Evolução do Personagem',
      data: [progresso.saude, progresso.foco, progresso.financas],
      backgroundColor: ['#4CAF50', '#2196F3', '#FFC107']
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 20
      }
    }
  }
});

function atualizarGrafico() {
  grafico.data.datasets[0].data = [
    progresso.saude,
    progresso.foco,
    progresso.financas
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
                          <p>Pontos ganhos: +${perguntas[perguntaAtual].pontuacoes[opcaoIndex]}
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