// create our questions
// arr of objects; including questions: store possible answers and the correct answer
var contentEl = document.getElementById("content");
var startBtn = document.querySelector("#start"); //take a css style el selector
var timerEl = document.querySelector("#timer");
var containerEl = document.querySelector("#container");
var timerCount = 5;
var currentQuestIndex = 0;
var outcome = document.querySelector("#answer-outcome");

const scorePoints = 25;

var gameOver = document.getElementById("#quiz-end");
var winGame = document.querySelector("#content");

var questions = [
  {
    question: "Commonly used data types do NOT include: ",
    options: ["1. alerts", "2. booleans", "3. strings", "4. numbers"],
    answer: "1. alerts",
  },
  {
    question:
      "The condition of an if/else statement is enclosed with _________.",
    options: [
      "1. square brackets",
      "2. parenthesis",
      "3. quotes",
      "4. curly brackets",
    ],
    answer: "4. curly brackets",
  },
  {
    question: "Arrays in JavaScript can be used to store __________.",
    options: [
      "1. numbers and strings",
      "2. booleans",
      "3. other arrays",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    question:
      "True or False? String values must be enclosed within quotes when being assigned to variables.",
    options: ["1. True", "2. False"],
    answer: "1. True",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["1. console.log", "2. terminal/bash", "3. HTML", "4. for loops"],
    answer: "1. console.log",
  },
];
function renderCurrentQuest() {
  containerEl.innerHTML = "";
  var currentQuest = questions[currentQuestIndex];

  var header = document.createElement("h2");
  header.textContent = currentQuest.question;
  containerEl.appendChild(header);

  var ulEl = document.createElement("ul");

  for (var i = 0; i < currentQuest.options.length; i++) {
    var liEl = document.createElement("li");
    liEl.textContent = currentQuest.options[i];
    ulEl.appendChild(liEl);
  }

  containerEl.appendChild(ulEl);
}

startBtn.addEventListener("click", function () {
  renderCurrentQuest();
  startBtn.setAttribute("style", "display: none;");
  startBtn.innerHTML = "";

  var timerInterval = setInterval(function () {
    timerEl.textContent = timerCount;
    timerCount--;
    if (timerCount === 0) {
      clearInterval(timerInterval);
      // change DOM to say "Game Over!"
      endGame();
    }
  }, 1000);
});
var bodyEl = document.body;

function endGame() {
  gameOver.setAttribute("style", "display: box;");
  bodyEl.appendChild(gameOver);
}

containerEl.addEventListener("click", function (event) {
  // console.log(event);

  if (event.target.matches("li")) {
    var currentQuest = questions[currentQuestIndex];

    var userGuess = event.target.textContent;
    console.log(userGuess);

    if (userGuess === currentQuest.answer) {
      outcome.textContent = "Correct!";
      document.body.appendChild(outcome);
      //   increase score
      scorePoints;
      // modify timer
    } else {
      outcome.textContent = "Wrong!";
      document.body.appendChild(outcome);
    }
    currentQuestIndex++;
    renderCurrentQuest();
  }
});
// quiz-finish, enter initials
// input and view highsores local storage
