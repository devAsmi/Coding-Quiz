const TOTAL_GAME_TIME = 75;

var startButton = document.getElementById("start");
var startTimer = document.getElementById("timer");

startButton.addEventListener("click", function (event) {
  // TODO: Display quiz question when clicked
  // update the timer text
  startTimer.innerText = TOTAL_GAME_TIME;
});
