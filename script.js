// Elementi del DOM
const homePage = document.getElementById("home-page");
const quizPage = document.getElementById("quiz-page");
const endPage = document.getElementById("end-page");
const startButton = document.getElementById("start-button");
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers-container");
const nextButton = document.getElementById("next-button");
const endTitle = document.getElementById("end-title");
const endMessage = document.getElementById("end-message");

// Dati del quiz
const quiz = [
    {
        question: "Qual è l’alimento principale della dieta del panda gigante?",
        answers: [
            { text: "Frutta", correct: false },
            { text: "Pesce", correct: false },
            { text: "Bambù", correct: true },
            { text: "Carne", correct: false },
        ],
    },
    {
        question: "Dove vivono principalmente i panda giganti in natura?",
        answers: [
            { text: "Africa", correct: false },
            { text: "Sud America", correct: false },
            { text: "Cina", correct: true },
            { text: "Australia", correct: false },
        ],
    },
    {
        question: "Come sono i cuccioli di panda alla nascita?",
        answers: [
            { text: "Grandi e pelosi", correct: false },
            { text: "Piccoli e rosa senza pelo", correct: true },
            { text: "Di colore nero e bianco", correct: false },
            { text: "Lunghi 50 cm", correct: false },
        ],
    },
    {
        question: "Che cosa rappresenta il panda per il WWF (World Wide Fund for Nature)?",
        answers: [
            { text: "Un animale comune", correct: false },
            { text: "Il simbolo ufficiale dell'organizzazione", correct: true },
            { text: "Una specie estinta", correct: false },
            { text: "Un predatore", correct: false },
        ],
    },
    {
        question: "Perché i panda giganti sono considerati una specie vulnerabile?",
        answers: [
            { text: "A causa della caccia e del commercio illegale", correct: false },
            { text: "Per la perdita del loro habitat naturale", correct: false },
            { text: "Per la mancanza di cibo sufficiente", correct: false },
            { text: "Tutte le risposte precedenti", correct: true },
        ],
    },
];

// Stato del gioco
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;

// Inizio del quiz
startButton.addEventListener("click", () => {
    homePage.classList.add("hidden");
    quizPage.classList.remove("hidden");
    showQuestion();
});

// Mostra una domanda
function showQuestion() {
    resetState();
    const currentQuestion = quiz[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer");
        if (answer.correct) button.dataset.correct = true;
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
}

// Gestisce la selezione di una risposta
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
        selectedButton.classList.add("correct");
        correctAnswersCount++;
        disableAllButtons();
        nextButton.classList.remove("hidden");
    } else {
        selectedButton.classList.add("incorrect");
        incorrectAnswersCount++;
    }
}

// Disabilita tutti i bottoni dopo una risposta corretta
function disableAllButtons() {
    Array.from(answersContainer.children).forEach((button) => {
        button.disabled = true;
    });
}

// Resetta lo stato per la nuova domanda
function resetState() {
    nextButton.classList.add("hidden");
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

// Passaggio alla domanda successiva
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestion();
    } else {
        showEndPage();
    }
});

// Mostra la pagina finale con i diversi messaggi
function showEndPage() {
    quizPage.classList.add("hidden");
    endPage.classList.remove("hidden");

    if (correctAnswersCount > incorrectAnswersCount) {
        endTitle.textContent = "Complimenti!";
        endMessage.textContent =
            "Hai risposto correttamente alla maggior parte delle domande. Ora puoi accedere al tuo regalo, contatta Antonio per riscattarlo.";
    } else {
        endTitle.textContent = "Non hai superato il test";
        endMessage.textContent =
            "Nonostante ciò, il regalo ti è comunque dovuto. Usalo per accrescere la tua cultura sui panda. Contatta Antonio per riscattarlo.";
    }
}
