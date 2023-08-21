class Projectile{
    constructor({x, y, velocity, radius, color}){
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
        this.speed = 5;
    }
    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    update(){

        this.draw();

        if(puaseEnemies){ return; }
        this.x -= Math.abs(this.velocity.x) + Math.abs(this.velocity.y) > this.speed*1.5 ? this.velocity.y/1.5*this.speed : this.velocity.x*this.speed;
        this.y -= Math.abs(this.velocity.x) + Math.abs(this.velocity.y) > this.speed*1.5 ? this.velocity.y/1.5*this.speed : this.velocity.y*this.speed;

    }
}