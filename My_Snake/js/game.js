let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
// Background
let ground = new Image();
ground.src = "img/background.png";
// Food
let food_cherry = new Image();
food_cherry.src = "img/cherry.png"
let speed = 99;
let box = 32;
let str = "Ваш счёт: "
let score = 0;

let food = {
    x: Math.floor((Math.random() * 18 + 1)) * box,
    y: Math.floor((Math.random() * 18 + 1)) * box,
}
let snake = [];
snake[0] = {
    x: 10 * box,
    y: 10 * box,
}

document.addEventListener("keydown", direction);

let dir;

function direction(event) {

    if (event.code == "KeyA" && dir != "right")
        dir = "left";

    else if (event.code == "KeyD" && dir != "left")
        dir = "right";

    else if (event.code == "KeyW" && dir != "down")
        dir = "up";

    else if (event.code == "KeyS" && dir != "up")
        dir = "down";

}
function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++){
     if (head.x == arr[i].x && head.y == arr[i].y){
        clearInterval(game);
        alert("Game Over! To try again, please, press F5");
     }
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(food_cherry, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "red" : "black";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(str + score, 2 * box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 18 + 1)) * box,
            y: Math.floor((Math.random() * 18 + 1)) * box,
        };
    } else {
        snake.pop();
    }
    if (snakeX < box || snakeX > box * 18 || snakeY < box ||
        snakeY < 20 || snakeY > box * 18){
        clearInterval(game);
        alert("Game Over! To try again, please, press F5");
    }

    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    eatTail(newHead, snake);


    snake.unshift(newHead);

    if (snake.length % 10 == 0){
    speed -=10;
    }

}


let game = setInterval(drawGame, speed);
