function calculateScore(userAnswers, questions) {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            score++;
        }
    }
    return score;
}

function calculatePercentage(score, total) {
    return Math.round((score / total) * 100);
}

function determineGrade(percent) {
    if (percent >= 80) return "A";
    if (percent >= 60) return "B";
    return "C";
}

module.exports = { calculateScore, calculatePercentage, determineGrade };