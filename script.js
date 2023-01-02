var totalGameTime = 75;

// elements from HTML
var startButton = document.getElementById("start");
var startTimer = document.getElementById("timer");
var contentLi = document.getElementById("content");
var questionContainer = document.getElementById("questions");
var resultContainer = document.getElementById("result");
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

function showQuestion() {
  var questionToAsk = listOfQuestions[1];
  questionContainer.style.display = "flex"; //display the hidden portion
  const questionHeader = document.getElementById("question-header");
  questionHeader.innerHTML = questionToAsk.question; //display the question

  // get all the option buttons
  var optionButtons = document.getElementsByClassName("option-btn");

  // populate the options
  var optionsForQuestion = questionToAsk.options;
  for (var i = 0; i < optionsForQuestion.length; i++) {
    var option = optionsForQuestion[i];
    var optionButton = optionButtons[i];
    var numberToShow = i + 1;
    optionButton.innerHTML = numberToShow + ". " + option;
    optionButton.value = option;
  }

  // when any of the option-buttons is clicked
  for (var i = 0; i < optionButtons.length; i++) {
    optionButtons[i].addEventListener("click", function (event) {
      var chosenAnswer = event.target.value;
      if (questionToAsk.answer === chosenAnswer) {
        resultContainer.innerHTML = "Correct";
      } else {
        resultContainer.innerHTML = "Incorrect";
        totalGameTime = totalGameTime - 10;
      }
    });
  }
}

startButton.addEventListener("click", function (event) {
  // TODO: Display quiz question when clicked
  contentLi.style.display = "none";
  // update the timer text
  startTimer.innerText = totalGameTime;
  showQuestion();

  // start timer when the button is clicked
  var quizTimer = setInterval(function () {
    totalGameTime--;
    startTimer.innerText = totalGameTime;

    if (totalGameTime === 0) {
      clearInterval(quizTimer);
    }
  }, 1000);
});
