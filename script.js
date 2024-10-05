const questions =[
    {
        question:"Which is the largest animal inthe world?",
        answers:[
            {text: 'Shark',correct:false},
            {text: 'Blue Whale',correct:true},
            {text: 'Elephant',correct:false},
            {text: 'Giraffe',correct:false}
        ]
    },
    {
        question:"Which is the smallest continent inthe world?",
        answers:[
            {text: 'Asia',correct:false},
            {text: 'Australia',correct:true},
            {text: 'Arctic',correct:false},
            {text: 'Africa',correct:false}
        ]
    },
    {
        question:"Which is the largest desert inthe world?",
        answers:[
            {text: 'Kalahari',correct:false},
            {text: 'Gobi',correct:false},
            {text: 'Sahara',correct:false},
            {text: 'Antarctica',correct:true}
        ]
    },
    {
        question:"Which is the smallest country in the world?",
        answers:[
            {text: 'Vatican City',correct:true},
            {text: 'Bhutan',correct:false},
            {text: 'Nepal',correct:false},
            {text: 'Shri Lanka',correct:false}
        ]
    }
]

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let questionIndex =0;
let score = 0;

function startQuiz(){
    questionIndex =0;
    score=0;
    nextButton.innerHTML ='Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[questionIndex];
    let questionNo = questionIndex+1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click',selectAnswer)
    })
}

function resetState(){
    nextButton.style.display ='none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct ==='true';
    if(isCorrect){
        selectBtn.classList.add('correct');
        score++;
    }else{
        selectBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true;
    });
    nextButton.style.display ='block';
}

function handleNextButton(){
    questionIndex++;
    if(questionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML ='Play Again';
    nextButton.style.display='block'
}

nextButton.addEventListener('click',()=>{
    if(questionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();