const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mainMenu = document.querySelector(".mainMenu");
const pointsDisplay = document.querySelector(".pointsDisplay");
const dashCooldown = document.querySelector(".dashCooldownPercentage");

const checkCollision = (x1, y1, r1, x2, y2, r2) => ((r1 + r2) ** 2 > (x1 - x2) ** 2 + (y1 - y2) ** 2);
const getRandomNumber = (min, max) => Math.random()*(max-min)+min;
const getRandomColor = () => `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
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

const friction = 0.98;

let background = "rgba(255, 255, 255, 0.65)";
const player = new Player({x:canvas.width/2, y:canvas.height/2});
let powerups = [];
let enemies = [];
let particles = [];
let projectiles = [];

let currentScore = 0;
let combo = 1;
let comboTimer = 0;

let enemySpawnRate = 1.8;
let powerupSpawnRate = 0.15;

let stopTimeDurration = 5000;
let puaseEnemies = false;

let frame;
function Update(){
    frame = requestAnimationFrame(Update);
    c.fillStyle = background;
    c.fillRect(0, 0, canvas.width, canvas.height);

    if(frame%5 && !puaseEnemies){
        currentScore ++;
    }
    
    pointsDisplay.innerHTML = `Points - ${currentScore}`;

    // reset combo
    if(comboTimer <= 0){
        combo = 1;
    }

    // dash cooldown
    dashCooldown.style.width = `${Math.min(((Date.now() - player.timeSeinceLastDash) / player.dashCooldown), 1) * 140}px`;

    if(randomChance(enemySpawnRate) && !puaseEnemies){
        spawnEnemy();
    }

    // spawn power-ups
    if(randomChance(powerupSpawnRate) && !puaseEnemies){
        spawnRandomPowerUp();
    }

    enemies.forEach((enemy, index) => {
        // if enemy goes off screen remove it
        if(enemy.x + enemy.radius < -40 || enemy.x - enemy.radius > canvas.width+40 || enemy.y + enemy.radius < -40 || enemy.y - enemy.radius > canvas.height+40){
            setTimeout(() => {
                enemies.splice(index, 1);
            }, 0);
        }

        // check if the player colides with the enemy
        if(checkCollision(player.x, player.y, player.radius, enemy.x, enemy.y, enemy.radius*1.2)){
            if(player.dashActive){
               setTimeout(() => {
                  enemies.splice(index, 1);
                  // create enemy death particles and combo display
                  for(let i=0; i<Math.floor(getRandomNumber(25, 50)); i++){
                     particles.push(new EnemyDeathParticle({
                        x: enemy.x,
                        y: enemy.y,
                        velocity: {
                           x: (Math.random()-0.5)*(Math.random()*5),
                           y: (Math.random()-0.5)*(Math.random()*5)
                        },
                        radius: Math.random()*2,
                        color: enemy.color,
                     }));
                  }
                  particles.push(new comboDisplay({x:enemy.x-10, y:enemy.y-10, color: getRandomColor(), combo: combo}));
                  currentScore += 100*combo;
                  combo += 0.5;
                  comboTimer ++;
               }, 0);
            }else{
               setTimeout(() => {
                  endgame();
               }, 0);
            }
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

    particles.forEach((particle, index) => {
         if(particle.alpha <= 0){ 
            particles.splice(index, 1);
            if(particle.text != undefined){
                comboTimer --;
            }
         }
         else { particle.update(); }
    });

    projectiles.forEach((projecile, index) => {
        if(projecile.x + projecile.radius < -40 || projecile.x - projecile.radius > canvas.width+40 || projecile.y + projecile.radius < -40 || projecile.y - projecile.radius > canvas.height+40){
            setTimeout(() => {
                projeciles.splice(index, 1);
            }, 0);
        }
        if(checkCollision(player.x, player.y, player.radius, projecile.x, projecile.y, projecile.radius) && !player.dashActive){
            setTimeout(() => {
                endgame();
            }, 0);
        }

        projecile.update();
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

    player.currExp += currentScore;
    enemies = [];
    powerups = [];
    particles = [];
    projectiles = [];
    currentScore = 0;
    combo = 1;
    comboTimer = 0;
    puaseEnemies = false;
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
