class Enemy{
    constructor({x, y, velocity, radius, speed}){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.speed = speed;
    }
    update(){
        this.draw();

        this.x += this.velocity.x * this.speed;
        this.y += this.velocity.y * this.speed;
    }
}

class NormalEnemy extends Enemy{
    constructor({x, y, velocity, radius, speed}){
        super({
            x: x,
            y: y,
            velocity, velocity,
            radius, radius,
            speed, speed,
        });
    }
    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = "black";
        c.fill();

        if(Math.random() > 0.99){
            this.changeDirections();
        }
    }
    changeDirections(){
        const angle = Math.atan2(player.y - this.y, player.x - this.x)

        this.velocity.x = Math.cos(angle);
        this.velocity.y = Math.sin(angle);
    }
}

function spawnEnemy(){
    const radius = getRandomNumber(7, 14);
    let x, y;
    if(randomChance(50)){
        x = getRandomNumber(0-radius, canvas.width+radius);
        y = (randomChance(50)) ? 0-radius : canvas.height+radius;
    }else{
        x = (randomChance(50)) ? 0-radius : canvas.width+radius;
        y = getRandomNumber(0-radius, canvas.height+radius);
    }
    const speed = 4-radius/6;
    const angle = Math.atan2(player.y - y, player.x - x)

    const veloX = Math.cos(angle),
          veloY = Math.sin(angle)
    const enemyData = {x:x, y:y, radius:radius, velocity:{x:veloX, y:veloY}, speed:speed};

    let randomNum = getRandomNumber(0, 100);
    // place holder until I craete more enemies
    enemies.push(new NormalEnemy(enemyData));

    // if(randomChance(85, randomNum)){
    //     enemies.push(new NormalEnemy(enemyData));
    // }
    
}