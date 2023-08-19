//Defines what data variables to get
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var timerElement = document.getElementById("timer");
var highestScoreElement = document.getElementById("highest-score");
var submitButton = document.getElementById("submit-btn");
var correctAnswer = document.getElementById("correct-answer");


//Defines the questions to display, their possible answers and the correct answer
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        correctAnswer: "Alerts"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["Commas", "Curly brackets", "Quotes", "Parens"],
        correctAnswer: "Quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "Terminal/Bash", "For loops", "console.log"],
        correctAnswer: "Console.log"
    },
    {
        question: "The condition in an if/else statement is enclosed within _____.",
        choices: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
        correctAnswer: "Curly Brackets"
    },
];
//Defines the Timer in seconds and sets the score)
var quizTimer = 90;

var currentQuestionIndex = 0;
var score = 0;
var highestScore = 0;
var timer;
// Defines starting the quiz 
startQuiz();

//Function to start the quiz
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    highestScore = getHighestScore();
    showQuestion();
    startTimer();
}
//Defines the display of the current question and response
function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach(choice => {
        var li = document.createElement("li");
        li.textContent = choice;
        li.addEventListener("click", () => selectAnswer(choice));
        choicesElement.appendChild(li);
    });
}
//Defines what to do with the answer selection including correct/incorrect logic
function selectAnswer(choice) {
    var currentQuestion = questions[currentQuestionIndex];
    var isCorrect = choice === currentQuestion.correctAnswer;

    if (isCorrect) {
        score++;
    }

    if (currentQuestionIndex === questions.length - 1) {
        endQuiz();
    } else {
        currentQuestionIndex++;
        showQuestion();
    }
}
//The intent is to end and reset the quiz and alert user
function completeQuiz() {
    stopTimer();
    saveScore();
    alert(`Quiz is complete!\nYour score: ${score}\nHighest score: ${highestScore}`);
    resetQuiz();
}
//Defines starting the timer
function startTimer() {
    var timeLeft = quizTimer;
    timerElement.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft === 0) {
            endQuiz();
        }
    }, 1000);
}
//Stops the timer - but how..
function stopTimer() {
    clearInterval(timer);
}
//Save individual score - needs to go to local storage
function saveScore() {
    if (score > highestScore) {
        highestScore = score;
        saveHighestScore(highestScore);
        updateHighestScore();
    }
}
//Display the highest score from localStorage
function getHighestScore() {
    var savedScore = localStorage.getItem("highestScore");
    return savedScore ? parseInt(savedScore) : 0;
}

//Save the highest score to localStorage
function saveHighestScore(score) {
    localStorage.setItem("highestScore", score);
}

//Display the highest score (update if nec)
function updateHighestScore() {
    highestScoreElement.textContent = highestScore;
}

//Restart the quiz
function resetQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    showQuestion();
    startTimer();
}

// Need to figure this out as i'd prefer to end quiz when no more questions are avail, but the button works too...sort of
//Submit button event listener
submitButton.addEventListener("click", endQuiz);
