// variables and DOM objects
var contentEl = document.getElementById("content");
var startBtn = document.querySelector("#start");
var timerEl = document.querySelector("#timer");
var detailsEl = document.querySelector("#details");
var containerEl = document.querySelector("#container");
var timerCount = 100;
var currentQuestIndex = 0;
var outcome = document.querySelector("#answer-outcome");
var submitBtn = document.querySelector("#submit-btn");
var timerInterval;
var bodyEl = document.body;
var gameOver = document.querySelector(".quiz-end");
var winGame = document.querySelector("#content");
var submitBtn = document.querySelector("#submit-btn");

// create questions
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

// generate questions container
function renderCurrentQuest() {
  containerEl.setAttribute = ("style", "display:none");
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

//function click "start quiz" button to start quiz
startBtn.addEventListener("click", function () {
  timerEl.textContent = timerCount;
  renderCurrentQuest();
  startBtn.setAttribute("style", "display: none;");
  startBtn.innerHTML = "";

  // timer function
  timerInterval = setInterval(function () {
    timerEl.textContent = timerCount;
    timerCount--;
    if (timerCount <= 0) {
      endGame();
    }
  }, 1000);
});

// calculate time remaining and replace with score
if (timerCount >= 0) {
  var timeRemaining = timerCount;
  var finalScoreTxt = document.createElement("p");
  clearInterval(timerInterval);
  finalScoreTxt.textContent = "Your final score is: " + timeRemaining;

  contentEl.appendChild(finalScoreTxt);
}
// end of quiz, directs user to view/store highscores

// var finalScr = document.getElementById("final-score");

function endGame() {
  clearInterval(timerInterval);
  contentEl.setAttribute("style", "display: none;");
  contentEl.innerHTML = "";
  outcome.setAttribute("style", "display: none;");
  outcome.innerHTML = "";
  gameOver.classList.remove("quiz-end");
  document.getElementById("final-score").textContent = timerCount;
  bodyEl.appendChild(gameOver);
}

// input initials and local storage for initials and score
submitBtn.addEventListener("click", function () {
  // var initials = document.getElementById("name").value;
  var initials = createInput.value;
  if (initials !== "") {
    var finalScore = {
      initials: initials,
      score: timeRemaining,
    };
    console.log(finalScore);
    var scores = JSON.parse(localStorage.getItem("finalScore")) || [];
    scores.push(finalScore);
    var newScore = JSON.stringify(scores);
    localStorage.setItem("scores", newScore);
    // localStorage.setItem("finalScr", JSON.stringify(scores));
    // redirect user to highscores page
    window.location.href = "./highscores.html";
  }
});

//answer quiz questions
containerEl.addEventListener("click", function (event) {
  // console.log(event); test
  if (event.target.matches("li")) {
    var currentQuest = questions[currentQuestIndex];

    var userGuess = event.target.textContent;
    console.log(userGuess);
    if (userGuess === currentQuest.answer) {
      outcome.textContent = "Correct!";
      document.body.appendChild(outcome);
      // score increase
      timerCount += 2;
      // modify timer; penalty for wrong answer
    } else {
      timerCount -= 10;
      if (timerCount === 0) {
        endGame();
      }
      if (currentQuestIndex === questions.length - 1) {
        endGame();
      }
      outcome.textContent = "Wrong!";
      document.body.appendChild(outcome);
    }
    currentQuestIndex++;
    renderCurrentQuest();
  }
});
// quiz-finish, enter initials
