// ==========================================
// LÓGICA DO POKÉQUIZ (COM RANDOMIZAÇÃO)
// ==========================================

// Banco Geral de Perguntas (Você pode adicionar quantas quiser aqui!)
const questionPool = [
    { question: "Qual é o Pokémon de número #001 na Pokédex Nacional?", options: ["Pikachu", "Charmander", "Bulbasaur", "Squirtle"], answer: "Bulbasaur" },
    { question: "Qual tipo é imune a ataques do tipo Elétrico?", options: ["Água", "Terra", "Voador", "Grama"], answer: "Terra" },
    { question: "Qual destes itens evolui o Eevee para Vaporeon?", options: ["Pedra do Fogo", "Pedra da Folha", "Pedra da Água", "Pedra do Trovão"], answer: "Pedra da Água" },
    { question: "Como se chama a região onde os jogos Pokémon Red e Blue se passam?", options: ["Johto", "Hoenn", "Sinnoh", "Kanto"], answer: "Kanto" },
    { question: "Qual é o nome da equipe vilã que tem Jessie, James e Meowth?", options: ["Team Magma", "Team Flare", "Team Rocket", "Team Galactic"], answer: "Team Rocket" },
    { question: "Qual Pokémon é conhecido na mitologia como o 'Deus' criador do universo Pokémon?", options: ["Mewtwo", "Arceus", "Rayquaza", "Lugia"], answer: "Arceus" },
    { question: "Qual é a tipagem dupla do Pokémon Gyarados?", options: ["Água e Dragão", "Água e Voador", "Apenas Água", "Dragão e Voador"], answer: "Água e Voador" },
    { question: "O que o item clássico 'Exp. Share' (Repartidor de Experiência) faz?", options: ["Dobra a experiência", "Divide experiência entre a equipe", "Revive o Pokémon", "Aumenta o ataque"], answer: "Divide experiência entre a equipe" },
    { question: "Qual destes NÃO é uma evolução do Eevee?", options: ["Espeon", "Umbreon", "Sylveon", "Lumineon"], answer: "Lumineon" },
    { question: "Quantas evoluções o Pokémon Magikarp possui?", options: ["Nenhuma", "Uma", "Duas", "Três"], answer: "Uma" },
    { question: "Qual destes Pokémon é um dos três cães lendários de Johto?", options: ["Suicune", "Arcanine", "Houndoom", "Lucario"], answer: "Suicune" },
    { question: "Qual foi o primeiro Pokémon que o Ash capturou no anime (sem contar o Pikachu)?", options: ["Pidgeotto", "Caterpie", "Bulbasaur", "Charmander"], answer: "Caterpie" }
];

// Variáveis de Estado
let currentRoundQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
const QUESTIONS_PER_ROUND = 5; // Quantidade de perguntas por partida

// Seletores do DOM
const questionText = document.getElementById("question-text");
const questionCounter = document.getElementById("question-counter");
const optionsContainer = document.getElementById("options-container");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

// ==========================================
// FUNÇÕES PRINCIPAIS
// ==========================================

// Algoritmo de Fisher-Yates para embaralhar Arrays
function shuffleArray(array) {
    let shuffled = [...array]; // Cria uma cópia para não alterar o original
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Inicia ou Reinicia o Jogo
function startGame() {
    // Embaralha o banco inteiro e recorta apenas as 5 primeiras para esta rodada
    currentRoundQuestions = shuffleArray(questionPool).slice(0, QUESTIONS_PER_ROUND);
    
    currentQuestionIndex = 0;
    score = 0;
    
    resultBox.classList.add("hidden");
    loadQuestion();
}

// Renderiza a pergunta na tela
function loadQuestion() {
    const currentQuestion = currentRoundQuestions[currentQuestionIndex];
    
    // Atualiza texto e contador
    questionText.innerText = currentQuestion.question;
    questionCounter.innerText = `Pergunta ${currentQuestionIndex + 1} de ${currentRoundQuestions.length}`;
    
    // Limpa as opções antigas
    optionsContainer.innerHTML = "";

    // Embaralha as alternativas para a resposta certa não ficar sempre no mesmo lugar!
    const shuffledOptions = shuffleArray(currentQuestion.options);

    // Cria os botões dinamicamente
    shuffledOptions.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        
        button.addEventListener("click", () => checkAnswer(button, option, currentQuestion.answer));
        
        optionsContainer.appendChild(button);
    });
}

// Verifica se a resposta está certa
function checkAnswer(selectedButton, selectedAnswer, correctAnswer) {
    const allButtons = document.querySelectorAll(".option-btn");
    
    // Trava os botões
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedAnswer === correctAnswer) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
        
        // Pinta a correta de verde
        allButtons.forEach(btn => {
            if (btn.innerText === correctAnswer) {
                btn.classList.add("correct");
            }
        });
    }

    // Passa para a próxima após 1.5s
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < currentRoundQuestions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 450);
}

// Mostra o Resultado
function showResults() {
    questionText.innerText = "Quiz Concluído!";
    questionCounter.innerText = "";
    optionsContainer.innerHTML = "";
    
    resultBox.classList.remove("hidden");
    
    if (score === currentRoundQuestions.length) {
        scoreText.innerText = `Perfeito! Você acertou ${score} de ${currentRoundQuestions.length}! Um Mestre Pokémon!`;
    } else if (score >= 3) {
        scoreText.innerText = `Muito bem! Você acertou ${score} de ${currentRoundQuestions.length}!`;
    } else {
        scoreText.innerText = `Você acertou ${score} de ${currentRoundQuestions.length}. Precisa treinar mais!`;
    }
}

// Evento do botão de tentar novamente
restartBtn.addEventListener("click", startGame);

// Inicia o jogo na primeira vez que a página carrega
startGame();