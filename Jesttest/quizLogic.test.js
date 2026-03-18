
const { calculateScore, calculatePercentage, determineGrade } = require('./quizGrade');
const mockQuestions = [
    { question: "Q1", options: ["A","B","C"], answer: 0 },
    { question: "Q2", options: ["A","B","C"], answer: 1 },
    { question: "Q3", options: ["A","B","C"], answer: 2 },
    { question: "Q4", options: ["A","B","C"], answer: 0 },
    { question: "Q5", options: ["A","B","C"], answer: 1 },
    { question: "Q6", options: ["A","B","C"], answer: 2 },
    { question: "Q7", options: ["A","B","C"], answer: 0 },
    { question: "Q8", options: ["A","B","C"], answer: 1 },
    { question: "Q9", options: ["A","B","C"], answer: 2 },
    { question: "Q10", options: ["A","B","C"], answer: 0 },
];

test("calculateScore returns correct score", () => {
    expect(calculateScore([0,1,2,0,1,2,0,1,2,0], mockQuestions)).toBe(10);
    expect(calculateScore([0,0,0,0,0,0,0,0,0,0], mockQuestions)).toBe(4);
});

test("calculatePercentage returns correct percent", () => {
    expect(calculatePercentage(10, 10)).toBe(100);
    expect(calculatePercentage(4, 10)).toBe(40);
});

test("determineGrade returns correct grade", () => {
    expect(determineGrade(90)).toBe("A");
    expect(determineGrade(70)).toBe("B");
    expect(determineGrade(50)).toBe("C");
});