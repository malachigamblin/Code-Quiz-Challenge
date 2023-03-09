const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
var startScreenEl = document.getElementById("start-screen");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
var timeEl = document.querySelector(".countdown");
var score = 0;
let timeLeft = 60;
let display = document.querySelector(".countdown");
var refreshButton = document.getElementById("btn-refresh");
let shuffledQuestions, currentQuestionIndex;
let interval;

function startTimer() {
  timeLeft = 60;

  interval = setInterval(function () {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(interval);
      alert("Time is up!");
      endGame();
    }
    display.innerHTML = timeLeft + " seconds";
  }, 1000);
}

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  startScreenEl.style.display = "none";
  questionContainerElement.classList.remove("hide");
  startTimer();
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  console.log("selectedAnswer = ", correct);
  if (correct === "true") {
    alert("your answer is correct, press OK then, continue to the next question");
    score++;
    startButton.style.display = "inital";
  } else {
    timeLeft -= 5;
    display.innerHTML = timeLeft + " seconds";
    alert("your answer is incorrect, press OK then, continue to the next question");
  }
  console.log("selectedAnswerEl = ", correct);
  Array.from(answerButtonsElement.children).forEach((button) => {});
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    clearInterval(interval);
    endGame();
  }
}

function endGame() {
  const initials = prompt("Game over!" + "\nEnter your initials:");
  if (initials) {
    alert(initials + "! Your score is: " + score + "/" + questions.length);
  } else {
    alert("Your score is: " + score + "/" + questions.length);
  }
  refreshButton.classList.remove("hide");
  nextButton.style.display = "none";
}

const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: [
      { text: "strings", correct: "false" },
      { text: "booleans", correct: "false" },
      { text: "alerts", correct: "true" },
      { text: "numbers", correct: "false" },
    ],
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    answers: [
      { text: "numbers and strings", correct: "false" },
      { text: "other arrays", correct: "false" },
      { text: "booleans", correct: "false" },
      { text: "all of the above", correct: "true" },
    ],
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answers: [
      { text: "commas", correct: "false" },
      { text: "curly brackets", correct: "false" },
      { text: "quotes", correct: "true" },
      { text: "parenthesis", correct: "false" },
    ],
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____?",
    answers: [
      { text: "quotes", correct: "false" },
      { text: "curly brackets", correct: "true" },
      { text: "parenthesis", correct: "true" },
      { text: "square brackets", correct: "false" },
    ],
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      { text: "JavaScript", correct: "false" },
      { text: "terminal/bash", correct: "false" },
      { text: "for loops", correct: "false" },
      { text: "console.log", correct: "true" },
    ],
  },
];