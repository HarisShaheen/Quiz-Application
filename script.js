const quizData = [
    {
        question:"What is the result of 2+3?",
        options:["4","5","6","7"],
        answer:"5"
    },
    {
        question:"Which keyword is not used to declare js variables ",
        options:["Let","variable","var","const"],  
        answer:"variable" 
    },
    {
        question:"Which of the following element is responsible for making the text bold in Html?",
        options:["<pre>","<a>","<b>","<br>"],
        answer:"<b>"
    },
    {
        question:"Which type of Js language is",
        options:["Object-Oriented","Object-Based","Assembly-language","High-level"],
        answer:"Object-Based"
    },
    {
        question:"The function and var are known as:",
        options:["Keywords","Data types","Declaration statements","Prototypes"],
        answer:"Declaration statements"
    }
];

const questionElement = document.querySelector('.question');
const optionsElements = document.querySelectorAll('.option');
const submitBtn = document.querySelector('.submit-btn');
const restartBtn = document.querySelector('.restart-btn');
const timerElement = document.createElement('div');
timerElement.classList.add('timer');
document.querySelector('.quiz-container').appendChild(timerElement);

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElements.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
    });
    startTimer();
}

function startTimer() {
    timeLeft = 20;
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleNextQuestion();
        }
    }, 1000);
}

function checkAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption == currentQuestion.answer) {
        score++;
    }
}

function handleNextQuestion() {
    const selectedOption = document.querySelector("li.option.selected");
    if (selectedOption) {
        checkAnswer(selectedOption.textContent);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
        resetOptions();
    } else {
        showResults();
    }
}

function showResults() {
    const questionContainer = document.querySelector(".quiz-container");
    questionContainer.innerHTML = `<h2>Your score is ${score} out of ${quizData.length}</h2>`;
    restartBtn.style.display = 'block';
}

function resetOptions() {
    optionsElements.forEach((option) => {
        option.classList.remove("selected");
    });
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resetOptions();
    showQuestion();
    restartBtn.style.display = 'none';
}

optionsElements.forEach((option) => {
    option.addEventListener("click", () => {
        resetOptions();
        option.classList.add("selected");
    });
});

submitBtn.addEventListener("click", handleNextQuestion);
restartBtn.addEventListener("click", restartQuiz);

showQuestion();
