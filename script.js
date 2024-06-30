// Quiz data
const questions = [
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Jupiter", correct: false },
            { text: "Mars", correct: true },
            { text: "Saturn", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false },
            { text: "Neptune", correct: false },
            { text: "Earth", correct: false }
        ]
    },
    {
        question: "Which planet is closest to the Sun?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mercury", correct: true },
            { text: "Mars", correct: false },
            { text: "Earth", correct: false }
        ]
    },
    {
        question: "What causes the seasons on Earth?",
        answers: [
            { text: "Changes in Earth's distance from the Sun", correct: false },
            { text: "Tilt of Earth's axis", correct: true },
            { text: "Earth's elliptical orbit around the Sun", correct: false },
            { text: "Changes in Earth's rotation speed", correct: false }
        ]
    },
    {
        question: "Which planet has the Great Red Spot, a massive storm?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false },
            { text: "Neptune", correct: false }
        ]
    },
    {
        question: "What is the smallest planet in our solar system?",
        answers: [
            { text: "Mars", correct: false },
            { text: "Mercury", correct: true },
            { text: "Pluto", correct: false },
            { text: "Earth", correct: false }
        ]
    },
    {
        question: "Which planet has the most moons?",
        answers: [
            { text: "Saturn", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Uranus", correct: false },
            { text: "Neptune", correct: false }
        ]
    },
    {
        question: "What is the hottest planet in our solar system?",
        answers: [
            { text: "Venus", correct: true },
            { text: "Mercury", correct: false },
            { text: "Earth", correct: false },
            { text: "Mars", correct: false }
        ]
    },
    {
        question: "Which planet is known for its beautiful rings?",
        answers: [
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: true },
            { text: "Uranus", correct: false }
        ]
    },
    {
        question: "Which planet has a moon named Titan, known for its thick atmosphere?",
        answers: [
            { text: "Mars", correct: false },
            { text: "Venus", correct: false },
            { text: "Saturn", correct: true },
            { text: "Jupiter", correct: false }
        ]
    }
];

// HTML elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("buttons");
const nextButton = document.getElementById("next-btn");

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;

// Initialize quiz
startQuiz();

// Function to start or restart the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

// Function to display current question and answer options
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

// Function to reset state (clear previous question state)
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function to handle when an answer is selected
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    // Disable all answer buttons after selection
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    // Show the next button
    nextButton.style.display = "block";
}

// Event listener for the next button to move to the next question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        // Quiz finished, show score or completion message
        questionElement.innerText = `Quiz Completed! Your score is ${score} out of ${questions.length}.`;

        // Hide answer buttons and next button
        answerButtons.innerHTML = "";
        nextButton.style.display = "none";
    }
});
