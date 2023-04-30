const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mainMenu = document.querySelector(".mainMenu");

const checkCollision = (x1, y1, r1, x2, y2, r2) => ((r1 + r2) ** 2 > (x1 - x2) ** 2 + (y1 - y2) ** 2);
const getRandomNumber = (min, max) => Math.random()*(max-min)+min;
function randomChance(chance, num){
    num = num ?? getRandomNumber(0, 100);
    return chance > num;
}

const controls = {
    "up": "w",
    "down": "s",
    "left": "a",
    "right": "d",
    "dash": "shift",
};
const keys = {
    [controls.up]: {"pressed":false},
    [controls.down]: {"pressed":false},
    [controls.left]: {"pressed":false},
    [controls.right]: {"pressed":false},
    [controls.dash]: {"pressed":false},
}

let background = "rgba(255, 255, 255, 0.65)";
const player = new Player({x:canvas.width/2, y:canvas.height/2});
let powerups = [];
let enemies = [];

let enemySpawnRate = 1.8;

let frame;
function Update(){
    frame = requestAnimationFrame(Update);
    c.fillStyle = background;
    c.fillRect(0, 0, canvas.width, canvas.height);

    if(randomChance(enemySpawnRate)){
        spawnEnemy();
    }

    enemies.forEach((enemy, index) => {
        // if enemy goes off screen remove it
        if(enemy.x + enemy.radius < -40 || enemy.x - enemy.radius > canvas.width+40 || enemy.y + enemy.radius < -40 || enemy.y - enemy.radius > canvas.height+40){
            setTimeout(() => {
                enemies.splice(index, 1);
            }, 0);
        }

        // check if the player colides with the enemy
        if(checkCollision(player.x, player.y, player.radius, enemy.x, enemy.y, enemy.radius)){
            setTimeout(() => {
                endgame();
            }, 0);
        }  

        enemy.update();
    });

    powerups.forEach((powerup, index) => {
        if(checkCollision(player.x, player.y, player.radius, powerup.x, powerup.y, powerup.radius)){
            setTimeout(() => {
                powerup.activate();
                powerups.splice(index, 1);
            }, 0);
        }  
        
        powerup.draw();
    });

    player.update();
}

function start(){
   mainMenu.style.visibility = "hidden";

   Update();
}

function endgame(){
    cancelAnimationFrame(frame);

    mainMenu.style.visibility = "visible";

    enemies = [];
    powerups = [];
    player.reset();
}

window.onkeydown = (e) => {
    if(keys[e.key.toLowerCase()] == undefined){ return; }
    keys[e.key.toLowerCase()].pressed = true;
}

window.onkeyup = (e) => {
    if(keys[e.key.toLowerCase()] == undefined){ return; }
    keys[e.key.toLowerCase()].pressed = false;
}