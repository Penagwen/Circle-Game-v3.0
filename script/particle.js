class Particle{
    constructor({x, y, velocity}){
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.alpha = 1;
    }
    update(){
        this.draw();

        if(puaseEnemies){ return; }
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y
        this.alpha -= 0.01;
    }
}

class EnemyDeathParticle extends Particle{
    constructor({x, y, velocity, color, radius}){
        super({x:x, y:y, velocity:velocity});
        this.color = color;
        this.radius = radius;
    }
    draw(){
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    }
}

class comboDisplay extends Particle {
    constructor({x, y, color, combo}){
        super({x:x, y:y, velocity:{x:-0.3, y:-1}});
        this.color = color;
        this.text = `x${combo}`;
    }
    draw(){
        c.save();
        c.globalAlpha = this.alpha;
        c.font = "30px Arial";
        c.fillStyle = this.color;
        c.fillText(this.text, this.x, this.y); 
        c.restore();
    }
}