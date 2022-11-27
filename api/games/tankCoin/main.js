const tank = document.querySelector('.tank'),
    soundMove = document.querySelector('.sound-move'),
    soundStop = document.querySelector('.sound-stop'),
    w = window.innerWidth,
    h = window.innerHeight,
    coin1 = document.querySelector('.coin1'),
    coin2 = document.querySelector('.coin2'),
    coin3 = document.querySelector('.coin3'),
    score = document.querySelector('.score'),
    time = document.querySelector('.time'),
    restartBtn = document.querySelector('.restart');
    exitBtn = document.querySelector('.exit');

    const token = localStorage.getItem('token');

let scoreNum = 0;
let timeNum = 0;
let bestTime = 100;


window.addEventListener('resize', function () {
    w = window.innerWidth,
    h = window.innerHeight;
});

window.onload = function () {
    const data = {'game': 'tankCoin', 'score': 1000, 'token': token};
    localStorage.setItem('newRecord', JSON.stringify(data));
    startGame();
    setInterval(increaseTime, 11);
}

document.addEventListener('keydown', move);
document.addEventListener('keyup', stop);

function stop() {
    // soundMove.pause();
    soundStop.currentTime = 0;
    // soundStop.play();
}

function move(e) {
    // soundStop.pause();
    // soundMove.play();
    let key = e.key;
    let x = tank.offsetLeft;
    let y = tank.offsetTop;

    if (key === 'ArrowRight' || key === 'd') {
        tank.className = 'tank';
        tank.classList.add('right');
        if (x < w - 150) tank.style.left = x + 10 + 'px';
    }

    if (key === 'ArrowLeft' || key === 'a') {
        tank.className = 'tank';
        tank.classList.add('left');
        if (x > 0) tank.style.left = x - 10 + 'px';
    }

    if (key === 'ArrowUp' || key === 'w') {
        tank.className = 'tank';
        tank.classList.add('up');
        if (y > 0) tank.style.top = y - 10 + 'px';
    }

    if (key === 'ArrowDown' || key === 's') {
        tank.className = 'tank';
        tank.classList.add('down');
        if (y < h - 150) tank.style.top = y + 10 + 'px';
    }

    if (IsCollide(tank, coin1) && coin1.style.visibility !== 'hidden') {
        coin1.style.visibility = 'hidden';
        scoreNum++;
        console.log(scoreNum);
    }
    if (IsCollide(tank, coin2) && coin2.style.visibility !== 'hidden') {
        coin2.style.visibility = 'hidden';
        scoreNum++;
        console.log(scoreNum);
    }
    if (IsCollide(tank, coin3) && coin3.style.visibility !== 'hidden') {
        coin3.style.visibility = 'hidden';
        scoreNum++;
        console.log(scoreNum);

    }

    if (scoreNum === 3) {
        restartBtn.style.display = 'block';
        exitBtn.style.display = 'block';
        clearInterval(increaseTime);

    }




    score.innerHTML = "Score: " + scoreNum;
}

function IsCollide(first, second) {
    let dist = calcDist(first, second);
    if (dist < 80) return true;
    return false;
}

function calcDist(first, second) {
    let firstX = first.offsetLeft;
    let firstY = first.offsetTop;
    let secondX = second.offsetLeft;
    let secondY = second.offsetTop;

    return Math.sqrt(Math.pow(firstX - secondX, 2) + Math.pow(firstY - secondY, 2));
}

function setTime(value) {
    time.innerHTML = `Time: ${value}`;
}

function increaseTime() {
    if (coin1.style.visibility === 'hidden' && coin2.style.visibility === 'hidden' && coin3.style.visibility === 'hidden') {
        return;
    }
    timeNum += 0.0112;
    setTime(timeNum.toFixed(1));
}

function startGame() {
    coin1.style.left = Math.floor(Math.random() * (w - 100)) + 'px';
    coin1.style.top = Math.floor(Math.random() * (h - 100)) + 'px';
    coin2.style.left = Math.floor(Math.random() * (w - 100)) + 'px';
    coin2.style.top = Math.floor(Math.random() * (h - 100)) + 'px';
    coin3.style.left = Math.floor(Math.random() * (w - 100)) + 'px';
    coin3.style.top = Math.floor(Math.random() * (h - 100)) + 'px';

    scoreNum = 0;
    timeNum = 0;

}

restartBtn.addEventListener('click', restart);

function restart() {
    startGame();
    restartBtn.style.display = 'none';
    exitBtn.style.display = 'none';
    coin1.style.visibility = 'visible';
    coin2.style.visibility = 'visible';
    coin3.style.visibility = 'visible';

}

exitBtn.addEventListener('click', exit);

function exit() {
    if (timeNum < bestTime) {
        bestTime = timeNum;
        saveScore();
    }
}



function saveScore() {
    const data = {'game': 'tankCoin', 'score': bestTime.toFixed(4), 'token': token};
    localStorage.setItem('newRecord', JSON.stringify(data));
}







