//get our hmtl objects
const gameBoard = document.querySelector("#gameBoard")
const ctx = gameBoard.getContext("2d")
const score_text = document.querySelector("#score");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snake_color = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";

const unit_size = 25;
let running = false;
let x_velocity = unit_size;
let y_velocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x: unit_size * 4, y: 0},
    {x: unit_size * 3, y: 0},
    {x: unit_size * 2, y: 0},
    {x: unit_size, y: 0},
    {x: 0, y: 0}
];



//listen for input
window.addEventListener("keydown", change_direction);
//listen for button press
resetBtn.addEventListener("click", reset_game);


//Calling our app to run here
game_start();

function game_start() {
    running = true;
    score_text.textContent = score;
    create_food();
    draw_food();
    next_tick();

}

function next_tick() {
    if (running) {
        setTimeout(()=>{
            clear_board();
            draw_food();
            move_snake();
            draw_snake();
            check_game_over();
            next_tick();
        }, 75)
    }
    else
    {
        display_game_over();
    }
}

function clear_board() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0,0, gameWidth, gameHeight);
}

function create_food() {
    function randomFood(min, max) {
        return Math.round(((Math.random() * (max - min) + min) / unit_size)) * unit_size;
    }

    foodX = randomFood(0, gameWidth - unit_size);
    foodY = randomFood(0, gameWidth - unit_size);
    console.log(foodX);
}

function draw_food() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unit_size, unit_size);
}

function move_snake() {
    const head = {x: snake[0].x + x_velocity, y: snake[0].y + y_velocity};
    snake.unshift(head);
    //checking to see if we just ate food
    if(snake[0].x === foodX && snake[0].y === foodY){
        score +=1;
        score_text.textContent = score;
        create_food();
    }else
    {
        snake.pop();
    }
}

function draw_snake() {
    ctx.fillStyle = snake_color;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unit_size, unit_size);
        ctx.strokeRect(snakePart.x, snakePart.y, unit_size, unit_size);

    });
}

function change_direction(event) {
    const key_pressed = event.key;
    console.log('Keydown event:', event.key, event.code);

    const going_up = (y_velocity === -unit_size);
    const going_down = (y_velocity === unit_size);
    const going_left = (x_velocity === unit_size);
    const going_right = (x_velocity === -unit_size);

    if ((key_pressed === 'w' || key_pressed === 'W') && !going_down) {
        y_velocity = -unit_size;
        x_velocity = 0;
    }
    if ((key_pressed === 's' || key_pressed === 'S')  && !going_up) {
        y_velocity = unit_size;
        x_velocity = 0;

    }
    if ((key_pressed === 'a' || key_pressed === 'A') && !going_left) {
        x_velocity = -unit_size;
        y_velocity = 0;
    }

    if ((key_pressed === 'd' || key_pressed === 'D') && !going_right) {
        x_velocity = unit_size;
        y_velocity = 0;

    }
}

function check_game_over() {
    switch (true){
        case (snake[0].x < 0): // hit the left border
            running = false;
            console.log("Game Over!");
            break;
        case (snake[0].x >= gameWidth): // hit the right border
            running = false;
            console.log("Game Over!");
            break;
        case (snake[0].y < 0 ): // hit the tops border
            running = false;
            console.log("Game Over!");
            break;
        case (snake[0].y >= gameHeight): // hit the bottom border
            running = false;
            console.log("Game Over!");
            break;
    }

    //check if any of the body parts hits the head
    for(let i = 1;  i < snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            running = false;
            console.log("Game Over!");

        }
    }

}

function display_game_over() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth/2, gameHeight/2);
}

function reset_game() {
    score = 0;
    x_velocity = unit_size;
    y_velocity = 0;
    snake = [
        {x: unit_size * 4, y: 0},
        {x: unit_size * 3, y: 0},
        {x: unit_size * 2, y: 0},
        {x: unit_size, y: 0},
        {x: 0, y: 0}
    ];
    game_start()
}
