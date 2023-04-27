class Player{
    constructor({x, y}){
        // defualt player settings
        this.x = x;
        this.y = y;
        this.velocity = {x:0, y:0};
        this.radius = 10;
        this.speed = 7;
        this.color = skins[equipedSkinIndex];
    }
    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        let color = c.createRadialGradient(this.x, this.y, this.radius/1.5, this.x, this.y, this.radius);
        color.addColorStop(0, this.color[0]);
        color.addColorStop(1, this.color[1]);
        c.fillStyle = color;
        c.fill();
    }
    update(){
        this.draw();

        this.velocity.y = 0;
        this.velocity.x = 0;
        if(keys[controls.up].pressed && this.y - this.speed - this.radius/2 > 0){ this.velocity.y -= this.speed; }
        if(keys[controls.down].pressed && this.y + this.speed + this.radius/2 < canvas.height){ this.velocity.y += this.speed; }
        if(keys[controls.left].pressed && this.x - this.speed - this.radius/2 > 0){ this.velocity.x -= this.speed; }
        if(keys[controls.right].pressed && this.x + this.speed + this.radius/2 < canvas.width){ this.velocity.x += this.speed; }

        this.x += (Math.abs(this.velocity.x) + Math.abs(this.velocity.y) == this.speed*2) ? this.velocity.x/1.5 : this.velocity.x;
        this.y += (Math.abs(this.velocity.x) + Math.abs(this.velocity.y) == this.speed*2) ? this.velocity.y/1.5 : this.velocity.y;
    }
}

const equipedSkinIndex = 1;
const skins = [["#eb3349", "#f45c43"], ["#ff512f", "#f09819"]]; 
