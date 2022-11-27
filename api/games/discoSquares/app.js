const board = document.querySelector("#board");
// const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white"];
const colors = ["#e74c3c", "#8e44ad", "#3498db", "#e67e22", "#2ecc71"];
const SQUARES_NUMBER = 870;

const restartBtn = document.querySelector('.restart');
const exitBtn = document.querySelector('.exit');
const buttons = document.querySelector('.buttons');
const time = document.querySelector('.time');
const score = document.querySelector('.score');

const token = localStorage.getItem('token');

let bestScore = 0;
let scoreNum = 0;
let timeNum = 10;

window.onload = function () {
    const data = {'game': 'discoSquares', 'score': 0, 'token': token};
    localStorage.setItem('newRecord', JSON.stringify(data));
    startGame();
    setInterval(decreaseTime, 11);
}

function decreaseTime() {
    if (timeNum > 0) {
        timeNum -= 0.011;
        time.innerHTML = `Time: ${timeNum.toFixed(2)}`;
        score.innerHTML = `Score: ${scoreNum}`;
    } else {
        time.innerHTML = `Time: 0.00`;
        endGame();
    }
}

function startGame() {
    scoreNum = 0;
    timeNum = 10;

    buttons.style.display = "none";
}

function endGame() {
    buttons.style.display = "flex";
}

function restart() {
    if (scoreNum > bestScore) {
        bestScore = scoreNum;
    }
    console.log("restart");
    startGame();
    buttons.style.display = "none";
}
restartBtn.addEventListener('click', restart);

function exit() {
    if (scoreNum > bestScore) {
        bestScore = scoreNum;
    }
    saveScore();
    goBack();
}
exitBtn.addEventListener('click', exit);

function saveScore() {
    const data = {'game': 'discoSquares', 'score': bestScore, 'token': token};
    localStorage.setItem('newRecord', JSON.stringify(data));
}

function goBack() {
    window.location.href = "../../../index.html";
}

function setTime(value) {
    time.innerHTML = `Time: ${value}`;
}

for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.addEventListener("mouseover", () => setColor(square));
    square.addEventListener("mouseleave", () => removeColor(square));

    board.append(square);
}

function setColor(element) {
    const color = getRandomColor();
    scoreNum++;

    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(element) {
    element.style.backgroundColor = "";
    element.style.boxShadow = "";
}

function getRandomColor() {
    // const color = colors[Math.floor(Math.random() * colors.length)];

    const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

    return color;
}
