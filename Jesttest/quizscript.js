let questions = [
    {question:"What does AI stand for?", options:["Artificial Input","Artificial Intelligence","Auto Index"], answer:1},
    {question:"Java is a ___ language?", options:["Programming","Markup","Styling"], answer:0},
    {question:"HTML stands for?", options:["Hyper Text Markup Language","Home Tool Markup","High Text Machine"], answer:0},
    {question:"CSS is used for?", options:["Styling webpages","Database","Server coding"], answer:0},
    {question:"Which language runs in the browser?", options:["Python","JavaScript","C#"], answer:1},
    {question:"Which company developed Java?", options:["Sun Microsystems","Microsoft","Google"], answer:0},
    {question:"Which HTML tag creates a hyperlink?", options:["anchor","link","href"], answer:0},
    {question:"Which keyword declares a variable in JavaScript?", options:["var","define","int"], answer:0},
    {question:"Bootstrap is mainly used for?", options:["Responsive design","Database","Machine learning"], answer:0},
    {question:"Which storage saves data permanently in browser?", options:["sessionStorage","localStorage","temporaryStorage"], answer:1}
];

let userAnswers = Array(questions.length).fill(null); 

function loadQuizPromise(){
    return new Promise(resolve => {
        setTimeout(() => { resolve(questions); }, 500);
    });
}

async function startQuiz(){
    let quizData = await loadQuizPromise();
    showQuiz(quizData);
}

function showQuiz(data){
    const quizDiv = document.getElementById("quizContainer");
    quizDiv.innerHTML = "";

    data.forEach((q,i) => {
        let html = `<div class='question'>
            <p><b>${i+1}. ${q.question}</b></p>`;
        q.options.forEach((opt,j) => {
            html += `<label class="option">
                <input type="radio" name="q${i}" onchange="saveAnswer(${i},${j})">
                ${opt}
            </label>`;
        });
        html += `</div><hr>`;
        quizDiv.innerHTML += html;
    });
}

function saveAnswer(i,j){
    userAnswers[i] = j;
}

function submitQuiz(){
    // check if user answered at least one question
    if(userAnswers.every(a => a === null)){
        alert(" Please select at least one answer before submitting!");
        return;
    }

    let score = calculateScore(userAnswers, questions);
    let percent = calculatePercentage(score, questions.length);
    let grade = determineGrade(percent);

    const resultDiv = document.getElementById("resultSection");
    resultDiv.style.display = "block";
    resultDiv.innerHTML =
        `Score: ${score} / ${questions.length}<br>` +
        `Percentage: ${percent}%<br>` +
        `Grade: ${grade}`;

    // save in localStorage
    localStorage.setItem("quizScore", percent);
}

// helper functions
function calculateScore(userAnswers, questions) {
    let score = 0;
    for (let i = 0; i < questions.length; i++){
        if(userAnswers[i] === questions[i].answer) score++;
    }
    return score;
}

function calculatePercentage(score,total){
    return Math.round((score/total)*100);
}

function determineGrade(percent){
    if(percent>=80) return "A";
    if(percent>=60) return "B";
    return "C";
}

// show previous score if exists
window.addEventListener("DOMContentLoaded", () => {
    startQuiz();

    let previousScore = localStorage.getItem("quizScore");
    if(previousScore){
        const resultDiv = document.getElementById("resultSection");
        resultDiv.style.display = "block";
        resultDiv.innerHTML = "Previous Score: " + previousScore + "%";
    }
});