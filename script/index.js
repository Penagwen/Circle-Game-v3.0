const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const timeLeftDisplay = document.querySelector(".timeLeftDisplay");
const currentWave = document.querySelector(".currentWave");
const mainMenu = document.querySelector(".mainMenu");
const highestWaveDisplay = document.querySelector(".highestWave");

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
};
const keys = {
    [controls.up]: {"pressed":false},
    [controls.down]: {"pressed":false},
    [controls.left]: {"pressed":false},
    [controls.right]: {"pressed":false},
}

let background = "rgba(255, 255, 255, 0.65)";
const player = new Player({x:canvas.width/2, y:canvas.height/2});
let powerups = [];
let enemies = [];
const waveDetails = [
    {
        time: 15000,
        maxEnemies: 20,
        enemySpawnRate: 1.8,
     },
     {
        time: 20000,
        maxEnemies: 25,
        enemySpawnRate: 1.9000000000000001,
     },
     {
        time: 25000,
        maxEnemies: 30,
        enemySpawnRate: 2,
     },
     {
        time: 30000,
        maxEnemies: 40,
        enemySpawnRate: 2.2,
     },
     {
        time: 40000,
        maxEnemies: 45,
        enemySpawnRate: 2.4000000000000004,
     },
     {
        time: 45000,
        maxEnemies: 55,
        enemySpawnRate: 2.6000000000000005,
     },
     {
        time: 55000,
        maxEnemies: 65,
        enemySpawnRate: 2.7000000000000006,
     },
     {
        time: 60000,
        maxEnemies: 75,
        enemySpawnRate: 2.8000000000000007,
     },
     {
        time: 65000,
        maxEnemies: 85,
        enemySpawnRate: 2.900000000000001,
     },
     {
        time: 70000,
        maxEnemies: 90,
        enemySpawnRate: 3.100000000000001,
     },
     {
        time: 75000,
        maxEnemies: 100,
        enemySpawnRate: 3.200000000000001,
     },
     {
        time: 85000,
        maxEnemies: 105,
        enemySpawnRate: 3.300000000000001,
     },
     {
        time: 90000,
        maxEnemies: 110,
        enemySpawnRate: 3.4000000000000012,
     },
     {
        time: 100000,
        maxEnemies: 120,
        enemySpawnRate: 3.5000000000000013,
     },
     {
        time: 110000,
        maxEnemies: 125,
        enemySpawnRate: 3.6000000000000014,
     },
     {
        time: 115000,
        maxEnemies: 130,
        enemySpawnRate: 3.8000000000000016,
     },
     {
        time: 125000,
        maxEnemies: 140,
        enemySpawnRate: 3.9000000000000017,
     },
     {
        time: 135000,
        maxEnemies: 145,
        enemySpawnRate: 4.000000000000002,
     },
     {
        time: 145000,
        maxEnemies: 150,
        enemySpawnRate: 4.200000000000002,
     },
     {
        time: 150000,
        maxEnemies: 155,
        enemySpawnRate: 4.400000000000002,
     },
     {
        time: 160000,
        maxEnemies: 165,
        enemySpawnRate: 4.600000000000002,
     },
     {
        time: 165000,
        maxEnemies: 175,
        enemySpawnRate: 4.8000000000000025,
     },
     {
        time: 175000,
        maxEnemies: 185,
        enemySpawnRate: 4.900000000000002,
     },
     {
        time: 185000,
        maxEnemies: 195,
        enemySpawnRate: 5.100000000000002,
     },
     {
        time: 195000,
        maxEnemies: 200,
        enemySpawnRate: 5.3000000000000025,
     },
     {
        time: 200000,
        maxEnemies: 205,
        enemySpawnRate: 5.500000000000003,
     },
     {
        time: 210000,
        maxEnemies: 215,
        enemySpawnRate: 5.700000000000003,
     },
     {
        time: 220000,
        maxEnemies: 220,
        enemySpawnRate: 5.900000000000003,
     },
     {
        time: 225000,
        maxEnemies: 225,
        enemySpawnRate: 6.100000000000003,
     },
     {
        time: 235000,
        maxEnemies: 230,
        enemySpawnRate: 6.200000000000003,
     },
     {
        time: 240000,
        maxEnemies: 235,
        enemySpawnRate: 6.3000000000000025,
     },
     {
        time: 250000,
        maxEnemies: 245,
        enemySpawnRate: 6.500000000000003,
     },
     {
        time: 260000,
        maxEnemies: 255,
        enemySpawnRate: 6.600000000000002,
     },
     {
        time: 265000,
        maxEnemies: 260,
        enemySpawnRate: 6.700000000000002,
     },
     {
        time: 275000,
        maxEnemies: 270,
        enemySpawnRate: 6.900000000000002,
     },
     {
        time: 280000,
        maxEnemies: 280,
        enemySpawnRate: 7.000000000000002,
     },
     {
        time: 290000,
        maxEnemies: 290,
        enemySpawnRate: 7.100000000000001,
     },
     {
        time: 300000,
        maxEnemies: 300,
        enemySpawnRate: 7.300000000000002,
     },
     {
        time: 305000,
        maxEnemies: 305,
        enemySpawnRate: 7.400000000000001,
     },
     {
        time: 315000,
        maxEnemies: 315,
        enemySpawnRate: 7.600000000000001,
     },
     {
        time: 325000,
        maxEnemies: 320,
        enemySpawnRate: 7.700000000000001,
     },
     {
        time: 335000,
        maxEnemies: 325,
        enemySpawnRate: 7.800000000000001,
     },
     {
        time: 340000,
        maxEnemies: 335,
        enemySpawnRate: 8,
     },
     {
        time: 350000,
        maxEnemies: 340,
        enemySpawnRate: 8.1,
     },
     {
        time: 360000,
        maxEnemies: 345,
        enemySpawnRate: 8.2,
     },
     {
        time: 365000,
        maxEnemies: 355,
        enemySpawnRate: 8.399999999999999,
     },
     {
        time: 375000,
        maxEnemies: 360,
        enemySpawnRate: 8.599999999999998,
     },
     {
        time: 380000,
        maxEnemies: 370,
        enemySpawnRate: 8.699999999999998,
     },
     {
        time: 390000,
        maxEnemies: 380,
        enemySpawnRate: 8.899999999999997,
     },
     {
        time: 400000,
        maxEnemies: 385,
        enemySpawnRate: 9.099999999999996,
     },
]

let currWaveIndex = 0;
let currWave = waveDetails[currWaveIndex];
let gameActiveStartTime = 0;

let frame;
function Update(){
    frame = requestAnimationFrame(Update);
    c.fillStyle = background;
    c.fillRect(0, 0, canvas.width, canvas.height);

    let timeLeft = (currWave.time/1000 - Math.floor((Date.now() - gameActiveStartTime)/10)/100).toString();
    timeLeftDisplay.innerHTML = timeLeft.substring(0, Math.min(4, timeLeft.length));
    if(Date.now() - gameActiveStartTime >= currWave.time){
        timeLeftDisplay.innerHTML = "0.00";
        endgame(true);
    }

    if(randomChance(currWave.enemySpawnRate) && enemies.length < currWave.maxEnemies){
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
                endgame(false);
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
    currentWave.innerHTML = currWaveIndex+1;
    gameActiveStartTime = Date.now();
    mainMenu.style.visibility = "hidden";

    Update();
}

function endgame(complete){
    cancelAnimationFrame(frame);
    mainMenu.style.visibility = "visible";
    highestWaveDisplay.innerHTML = currWaveIndex+1;

    enemies = [];
    powerups = [];
    player.reset();

    if(complete && currWaveIndex <= waveDetails.length){
        currWaveIndex ++;
        currWave = waveDetails[currWaveIndex];
    }
    
}

window.onkeydown = (e) => {
    if(keys[e.key.toLowerCase()] == undefined){ return; }
    keys[e.key.toLowerCase()].pressed = true;
}

window.onkeyup = (e) => {
    if(keys[e.key.toLowerCase()] == undefined){ return; }
    keys[e.key.toLowerCase()].pressed = false;
}