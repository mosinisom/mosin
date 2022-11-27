const board = document.querySelector("#board");
// const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white"];
const colors = ["#e74c3c", "#8e44ad", "#3498db", "#e67e22", "#2ecc71"];
const SQUARES_NUMBER = 870;

for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.addEventListener("mouseover", () => setColor(square));
    square.addEventListener("mouseleave", () => removeColor(square));

    board.append(square);
}

function setColor(element) {
    const color = getRandomColor();

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
