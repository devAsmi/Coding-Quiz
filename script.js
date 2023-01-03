var totalGameTime = 75;

// elements from HTML
var startButton = document.getElementById("start");
var timerDisplay = document.getElementById("timer");
var contentLi = document.getElementById("content");
var questionContainer = document.getElementById("questions");
var resultContainer = document.getElementById("result");
var optionButtons = document.getElementsByClassName("option-btn");
var gameOver = document.getElementsByClassName("over")[0];
var lastScore = document.getElementById("score");
var submitButton = document.getElementById("submit-score");
var initialInput = document.getElementById("initials");
var scoresEL = document.getElementById("scores");
var menuEL = document.getElementsByClassName("menu")[0];

// variables for the game
var quizTimer;
var questionToAsk;
var currentQuestionIndex = 0;
var isFinish = false;

// questions for the quiz
var listOfQuestions = [
  {
    question: "console.log is used in javascript for?",
    options: [
      "To output a message",
      "Add string",
      "Making Object",
      "To make Array",
    ],
    answer: "To output a message",
  },

  {
    question:
      "Which of the following is used as a conditional statement in javaScript?",
    options: [
      "arithematic operators",
      "if/else statement",
      "for loop",
      "logical operators",
    ],
    answer: "if/else statement",
  },
  {
    question:
      "What do we use to determine how many times the loop execute in javaScript?",
    options: ["index", "function", "array's length", "variable"],
    answer: "array's length",
  },
];

function finishGame() {
  questionContainer.style.display = "none";
  gameOver.style.display = "flex";
  lastScore.textContent = totalGameTime;
}

function showQuestion() {
  if (currentQuestionIndex >= listOfQuestions.length) {
    isFinish = true;
  } else {
    questionToAsk = listOfQuestions[currentQuestionIndex];
    resultContainer.style.display = "flex";
    questionContainer.style.display = "flex"; //display the hidden portion
    const questionHeader = document.getElementById("question-header");
    questionHeader.innerHTML = questionToAsk.question; //display the question

    // populate the options
    var optionsForQuestion = questionToAsk.options;
    for (var i = 0; i < optionsForQuestion.length; i++) {
      var option = optionsForQuestion[i];
      var optionButton = optionButtons[i];
      var numberToShow = i + 1;
      optionButton.innerHTML = numberToShow + ". " + option;
      // store value for button which will later be used to compare with correct answer
      optionButton.value = option;
    }
  }
}

function addListenerToAnswerButtons() {
  // when any of the option-buttons is clicked,
  // we check if the answer is right or wrong
  for (var k = 0; k < optionButtons.length; k++) {
    optionButtons[k].addEventListener("click", function (event) {
      var chosenAnswer = event.target.value;
      if (questionToAsk.answer === chosenAnswer) {
        resultContainer.textContent = "Correct";
      } else {
        resultContainer.textContent = "Incorrect";
        totalGameTime = totalGameTime - 10;
      }
      currentQuestionIndex++;
      showQuestion();
    });
  }
}

function updateTimer() {
  timerDisplay.textContent = totalGameTime;
}

startButton.addEventListener("click", function () {
  // TODO: Display quiz question when clicked
  contentLi.style.display = "none";
  // update the timer text
  updateTimer();
  addListenerToAnswerButtons();
  showQuestion();

  // start timer when the button is clicked
  quizTimer = setInterval(function () {
    if (totalGameTime < 0) {
      clearInterval(quizTimer);
      finishGame();
    } else if (totalGameTime >= 0 && isFinish) {
      clearInterval(quizTimer);
      finishGame();
      updateTimer();
    } else {
      totalGameTime--;
      updateTimer();
    }
  }, 1000);
});

submitButton.addEventListener("click", function () {
  // save score to local storage
  localStorage.setItem(initialInput.value, totalGameTime);

  // display the scores section
  scoresEL.style.display = "flex";
  gameOver.style.display = "none";
  resultContainer.style.display = "none";
  menuEL.style.display = "none";
});
