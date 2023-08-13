// Establecer el tamaño del canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// const width = canvas.width = 400;
// const height = canvas.height = 400;
const width = canvas.width = innerWidth - 50;
const height = canvas.height = innerHeight - 50;


// Variables de la serpiente
let snake = [];
let snakeLength = 5;
let snakeSize = 10;
let snakeX = 10;
let snakeY = 10;
let dx = snakeSize;
let dy = 0;

// Variables de la comida
let foodX = 0;
let foodY = 0;
let foodSize = 10;

// Generar la comida
function generateFood() {
    foodX = Math.floor(Math.random() * (width / foodSize)) * foodSize;
    foodY = Math.floor(Math.random() * (height / foodSize)) * foodSize;
}

// Dibujar la serpiente
function drawSnake() {
    ctx.fillStyle = "green";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, snakeSize, snakeSize);
    }
}

// Mover la serpiente
function moveSnake() {
    snakeX += dx;
    snakeY += dy;

    // Colisión con la pared
    if (snakeX < 0 || snakeX >= width || snakeY < 0 || snakeY >= height) {
        gameOver();
        return;
    }

    // Colisión con la comida
    if (snakeX === foodX && snakeY === foodY) {
        snakeLength++;
        generateFood();
    }

    // Quitar la última sección de la serpiente
    if (snake.length === snakeLength) {
        snake.shift();
    }

    // Añadir una nueva sección a la cabeza de la serpiente
    snake.push({x: snakeX, y: snakeY});
}

// Dibujar la comida
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, foodSize, foodSize);
}

// Game over
function gameOver() {
    clearInterval(gameLoop);
    alert("Game over!");
}

// Event listener para las teclas de flechas
document.addEventListener("keydown", function(event) {
    switch(event.keyCode) {
        case 37: // left arrow
            dx = -snakeSize;
            dy = 0;
            break;
        case 38: // up arrow
            dx = 0;
            dy = -snakeSize;
            break;
        case 39: // right arrow
            dx = snakeSize;
            dy = 0;
            break;
        case 40: // down arrow
            dx = 0;
            dy = snakeSize;
            break;
    }
});

// Game loop
function game() {
    ctx.clearRect(0, 0, width, height);
    drawSnake();
    drawFood();
    moveSnake();
}

generateFood();
let gameLoop = setInterval(game, 100);
