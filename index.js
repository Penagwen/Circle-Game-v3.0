const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

const player = new Player({x:canvas.width/2, y:canvas.height/2});


function Update(){
    requestAnimationFrame(Update);
    c.fillStyle = "rgba(255, 255, 255, 0.65)";
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
}

function start(){
    Update();
}

window.onkeydown = (e) => {
    if(keys[e.key.toLowerCase()] == undefined){ return; }
    keys[e.key.toLowerCase()].pressed = true;
}

window.onkeyup = (e) => {
    if(keys[e.key.toLowerCase()] == undefined){ return; }
    keys[e.key.toLowerCase()].pressed = false;
}

start();