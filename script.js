import questions from "./questions.js";

const questionElement = document.querySelector(".question");
const answersElement = document.querySelector(".respotas");
const questionCountElement = document.querySelector(".qtd");
const finishContent = document.querySelector(".finish");
const resultElement = document.querySelector(".result");
const restartButton = document.querySelector(".finish button");
const imageFinish = document.querySelector(".image");
const videoAdd = document.querySelector(".videos");


let currentIndex = 0;
let questionsCorrect = 0;

restartButton.onclick = resetGame;

function resetGame() {
  finishContent.style.display = "none";
  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
}

function answerQuestion(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  applyAnswerFeedback(selectedButton, correct);

  if (correct) {
    questionsCorrect++;
    videoAdd.innerHTML = `<video style="width: 500px; height: 200px;" src="./imgs/Y2meta.app-MEME   Acertou Mizeravi HD-(1080p).mp4"
    controls autoplay></video>`
  } else {
    videoAdd.innerHTML = `<video style="width: 500px; height: 200px;" src="./imgs/Y2meta.app-MEME- homem dando risada escandalosa-(1080p).mp4"
    controls autoplay></video>`
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    setTimeout(loadQuestion, 1000);
  } else {
    finishGame();
  }
}


function applyAnswerFeedback(selectedButton, correct) {
  if (correct) {
    selectedButton.style.backgroundColor = "green";
  } else {
    selectedButton.style.backgroundColor = "red";

    Array.from(answersElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.style.backgroundColor = "green";
      }
    });
  }

  Array.from(answersElement.children).forEach(button => {
    button.disabled = true;
  });
}

function finishGame() {
  resultElement.style.animation = "fadeInUp 0.5s ease";
  finishContent.style.display = "flex";
  finishContent.style.animation = "fadeIn 0.5s ease";

  console.log(imageFinish)
  document.querySelector(".correct-respotas").textContent = `Você acertou ${questionsCorrect} de ${questions.length} perguntas.`;
  if (questionsCorrect <= 4) {
    imageFinish.innerHTML = `<img src="./imgs//die.png" alt="">`
  } else if (questionsCorrect > 4 && questionsCorrect <= 6) {
    imageFinish.innerHTML = `<img src="./imgs//959be7bd3d22bbb172355ec012956abf.png" alt="">`
  } else {
    imageFinish.innerHTML = `<img src="./imgs//9a6.png" alt="">`
  }
}

function loadQuestion() {
  questionCountElement.textContent = `${currentIndex + 1}/${questions.length}`;

  const shuffledQuestions = embaralha(questions);

  const { question, answers } = shuffledQuestions[currentIndex];

  questionElement.textContent = question;
  answersElement.innerHTML = "";

  const shuffledAnswers = embaralha(answers);

  shuffledAnswers.forEach(({ option, correct }) => {
    const button = document.createElement("button");
    button.classList.add("answer");
    button.dataset.correct = correct;
    button.innerHTML = option;

    button.addEventListener("click", answerQuestion);
    answersElement.appendChild(button);
  });
}

function embaralha(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

loadQuestion();
