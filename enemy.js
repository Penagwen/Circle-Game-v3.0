class Enemy{
    constructor({x, y, velocity, speed}){
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.speed = speed;
    }
    update(){
        this.draw();

        if(puaseEnemies){ return; }
        this.x += this.velocity.x * this.speed;
        this.y += this.velocity.y * this.speed;
    }
}

class NormalEnemy extends Enemy{
    constructor({x, y, velocity, radius, speed}){
        super({
            x: x,
            y: y,
            velocity: velocity,
            speed: speed,
        });
        this.radius = radius;
        this.color = "black";
    }
    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
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

class ShooterEnemy extends Enemy{
    constructor({x, y, velocity, radius, speed}){
        super({
            x: x,
            y: y,
            velocity: velocity,
            speed: 1,
        });
        this.radius = radius;
        this.width = radius*2;
        this.height = radius*2;
        this.color = "black";
        this.angle = Math.atan2(this.y - player.y, this.x - player.x) + Math.PI/2; // rad
    }
    draw(){
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.angle); // rad
        c.translate(-this.x, -this.y);

        c.beginPath();
        c.moveTo(this.x - this.width/2,this.y - this.height/2);
        c.lineTo(this.x,this.y + this.height/2);
        c.lineTo(this.x + this.width/2, this.y - this.height/2);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
        
        if(puaseEnemies){ return; }
        
        this.angle = Math.atan2(this.y - player.y, this.x - player.x) + Math.PI/2;
        if(randomChance(2)){
            this.shoot();
        }
    }
    shoot(){
        const angle = Math.atan2(player.y - this.y, player.x - this.x);

        projectiles.push(new Projectile({
            x: this.x,
            y: this.y,
            velocity: {x: -Math.cos(angle), y: -Math.sin(angle)},
            radius: 4,
            color: "black",
        }));
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

    if(randomChance(70)){
        enemies.push(new NormalEnemy(enemyData));
    }else if (player.level >= 5){
        enemies.push(new ShooterEnemy(enemyData));
    }
    
}