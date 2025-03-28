const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 150, y: 150 }];
let food = { x: 0, y: 0 };
let direction = "RIGHT";
let score = 0;
let gameInterval;

function startGame() {
    if (gameInterval) clearInterval(gameInterval);
    score = 0;
    document.getElementById("score").innerText = score;
    snake = [{ x: 150, y: 150 }];
    spawnFood();
    gameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
    updateSnakePosition();
    if (checkCollision()) {
        clearInterval(gameInterval);
        saveScore(score);
        alert("¡Game Over!");
        startGame();
    }
    if (eatFood()) {
        score++;
        document.getElementById("score").innerText = score;
        spawnFood();
    }
    drawGame();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 10, 10));
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}

function updateSnakePosition() {
    const head = { ...snake[0] };
    
    if (direction === "RIGHT") head.x += 10;
    if (direction === "LEFT") head.x -= 10;
    if (direction === "UP") head.y -= 10;
    if (direction === "DOWN") head.y += 10;
    
    snake.unshift(head);
    snake.pop();
}

function checkCollision() {
    const head = snake[0];
    // Colisión con muros
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true;
    
    // Colisión con sí misma
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    
    return false;
}

function eatFood() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function spawnFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

startGame();
