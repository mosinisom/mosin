const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");


const buttons = document.querySelector('.buttons');

const token = localStorage.getItem('token');

let time = 0;
let score = 0;
let bestScore = 0;

startBtn.addEventListener("click", (event) => {
    event.preventDefault();
    screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
    if (event.target.classList.contains("time-btn")) {
        time = parseInt(event.target.getAttribute("data-time"));
        screens[1].classList.add("up");
        startGame();
    }
});

board.addEventListener("click", (event) => {
    if (event.target.classList.contains("circle")) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            timeEl.innerHTML = `00:0${current}`;
        } else {
            setTime(current);
        }
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add("hide");
    board.innerHTML = `
        <h1>Cчет: <span class="primary">${score}</span></h1>
            <div class="buttons">
                <button class="restart" id="restart">Again</button>
                <button class="exit" id="exit">Save Record</button>
            </div>`;

    const restartBtn = document.querySelector('.restart');
    const exitBtn = document.querySelector('.exit');
    
    restartBtn.addEventListener('click', restart);
    exitBtn.addEventListener('click', exit);
    if (score > bestScore) {
        bestScore = score;
    }
}

function createRandomCircle() {
    const circle = document.createElement("div");
    const size = getRandomNumber(10, 60);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color1 = getRandomColor();

    circle.classList.add("circle");
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = `${color1}`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round((Math.random() * (max - min)) + min);
}

function getRandomColor() {
    const r = getRandomNumber(0, 255);
    const g = getRandomNumber(0, 255);
    const b = getRandomNumber(0, 255);

    return `rgb(${r}, ${g}, ${b})`;
}

function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle');

        if (circle) {
            circle.click();
        }
    }
    setTimeout(kill, 75);
}

function goBack() {
    window.location.href = "../../../index.html";
}

function saveScore() {
    const data = {'game': 'cursor', 'score': bestScore, 'token': token};
    localStorage.setItem('newRecord', JSON.stringify(data));
}

function exit() {
    saveScore();
    goBack();
}

function restart() {
    saveScore();
    window.location.reload();
    console.log(bestScore);
}

