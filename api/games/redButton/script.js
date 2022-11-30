const container = document.querySelector('.containerCircle');
const gameButton = document.querySelector('.game button');
// const reset = document.querySelector('.reset');
let count = 0;
let series = 0;
let toMove = true;
let jumpIn = newJumpIn();

const exitBtn = document.querySelector('.exit');
const restartBtn = document.querySelector('.restart');

const token = localStorage.getItem('token');
let bestScore = 0;

const directions = [
    'reset',
    '',
    '-'
    
];

toMove = setTimeout(() => {
    randomMove();
}, 20000);

document.body.addEventListener('click', e => {
    if (!container.classList.contains('gameover')) {
        clearTimeout(toMove);
        if (e.target.nodeName === 'BUTTON') {
            continueGame();
        } else {
            container.classList.add('gameover');
            saveScore();
            if (count > bestScore) {
                bestScore = count;
            }
        }
    }
});

// reset.addEventListener('click', resetGame);
restartBtn.addEventListener('click', resetGame);

function continueGame() {
    toMove = setTimeout(() => {
        randomMove();
    }, 5000);

    count++
    updateCountTxt(count);

    if (!(count % jumpIn)) {

        randomMove();

        jumpIn = newJumpIn();

    }
}

function randomMove() {
    let direction = directions[randomNum(1, directions.length) - 1];

    if (direction !== 'reset') {
        gameButton.style.left = `${direction}${gameButton.clientWidth}px`;
    } else {
        gameButton.style.left = '0';
    }

    if (toMove) {
        toMove = setTimeout(() => {
            randomMove();
        }, randomNum(5000, 10000));
    }
}

function randomNum(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function newJumpIn() {
    series++;

    const num = randomNum(count + 5, count + 25) + series;

    return num;
}

function updateCountTxt(newCount) {
    const countTxt = document.querySelectorAll('.count');

    countTxt.forEach(item => {
        item.innerHTML = newCount;
    })
}

function resetGame() {
    count = 0;
    updateCountTxt(count);
    gameButton.style.left = '0';
    jumpIn = newJumpIn();

    toMove = setTimeout(() => {
        randomMove();
    }, 10000);

    setTimeout(() => {
        container.classList.remove('gameover');
    }, 100);
}

exitBtn.addEventListener('click', exit);

function exit() {
    if (count > bestScore) {
        bestScore = count;
    }
    saveScore();
    goBack();
}

function saveScore() {
    const data = {'game': 'redButton', 'score': bestScore, 'token': token};
    localStorage.setItem('newRecord', JSON.stringify(data));
}

function goBack() {
    window.location.href = "../../../index.html";
}