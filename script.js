const questions = [
    {
        question: "When was Taylor Swift born?",
        answers: [
            {text: "1998", correct: false},
            {text: "1978", correct: false},
            {text: "1988", correct: false},
            {text: "1989", correct: true},
        ]
    },
    {
        question: "What is the first track of the 1989 album?",
        answers: [
            {text: "Style", correct: false},
            {text: "Welcome to New York", correct: true},
            {text: "New Romantics", correct: false},
            {text: "Out of the Woods", correct: false},
        ] 
    },
    {
        question: "What is the name of the song where Lana Del Rey features in Taylor's Midnights album?",
        answers: [
            {text: "Cardigan", correct: false},
            {text: "Clean", correct: false},
            {text: "Snow on the beach", correct: true},
            {text: "Anti-Hero", correct: false},
        ] 
    },
    {
        question: "What is the length of the track All Too Well (Taylor's Version - From the Vault)?",
        answers: [
            {text: "10", correct: true},
            {text: "5", correct: false},
            {text: "4", correct: false},
            {text: "8", correct: false},
        ] 
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex - 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button"); 
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const  selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML  = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function  handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
