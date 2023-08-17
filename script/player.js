class Player{
    constructor({x, y}){
        // defualt player settings
        this.x = x;
        this.y = y;
        this.velocity = {x:0, y:0};
        this.radius = 10;
        this.speed = 7;
        this.color = skins[equipedSkinIndex];
        this.immunity = false;

        this.direction = {x:0, y:0};
        this.dashCooldown = 850;
        this.dashDuration = 175;
        this.timeSeinceLastDash = 0;
        this.dashActive = false;

        this.findNeededExp = (level) => Math.floor(1000*(Math.pow((1+0.15), level)));

        this.level = 0;
        this.currExp = 0;
        this.neededExp = this.findNeededExp(this.level+1);
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
        if(!this.dashActive){
            if(keys[controls.up].pressed && this.y - this.speed - this.radius/2 > 0){ 
                this.velocity.y -= this.speed;
            }
            if(keys[controls.down].pressed && this.y + this.speed + this.radius/2 < canvas.height){ 
                this.velocity.y += this.speed;
            }
            if(keys[controls.left].pressed && this.x - this.speed - this.radius/2 > 0){ 
                this.velocity.x -= this.speed; 
            }
            if(keys[controls.right].pressed && this.x + this.speed + this.radius/2 < canvas.width){ 
                this.velocity.x += this.speed; 
            }
        }

        if(keys[controls.dash].pressed && Date.now() - this.timeSeinceLastDash > this.dashCooldown){
            this.timeSeinceLastDash = Date.now();
            this.dashActive = true;
            this.direction.x = Math.sign(this.velocity.x);
            this.direction.y = Math.sign(this.velocity.y);
            this.dash();
        }else if(this.dashActive && Date.now() - this.timeSeinceLastDash < this.dashDuration){
            this.dash();
        }else{
            this.dashActive = false;
        }

        this.x += (Math.abs(this.velocity.x) + Math.abs(this.velocity.y) == this.speed*2) ? this.velocity.x/1.5 : this.velocity.x;
        this.y += (Math.abs(this.velocity.x) + Math.abs(this.velocity.y) == this.speed*2) ? this.velocity.y/1.5 : this.velocity.y;
    }
    dash(){
        let dashSpeed = 17,
            halfSpeed = 1;
        if(Math.abs(this.direction.x) + Math.abs(this.direction.y) == 2){ halfSpeed = 2; }
        this.x += (this.x + this.direction.x*dashSpeed > this.radius/2 && this.x + this.direction.x*dashSpeed < canvas.width-this.radius/2) ? this.direction.x*dashSpeed/halfSpeed : 0;
        this.y += (this.y + this.direction.y*dashSpeed > this.radius/2 && this.y + this.direction.y*dashSpeed < canvas.height-this.radius/2) ? this.direction.y*dashSpeed/halfSpeed : 0;
    }
    reset(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.velocity = {x:0, y:0};
        this.radius = 10;
        this.speed = 7;
        this.immunity = false;

        // check if level up
        while(this.currExp >= this.neededExp){
            this.level ++;
            this.currExp = this.currExp - this.neededExp;
            this.neededExp = this.findNeededExp(this.level+1); 
        }   

        gsap.to(".levelPercentage",  {
            width: this.currExp/this.neededExp*450,
            duration: 0.5,
        });

        document.querySelector(".exp").innerHTML = `${this.currExp} / ${this.neededExp}`;
        document.querySelector(".playerLevel").innerHTML = this.level;
    }
}

const equipedSkinIndex = 0;
const skins = [["#eb3349", "#f45c43"], ["#ff512f", "#f09819"]]; 
