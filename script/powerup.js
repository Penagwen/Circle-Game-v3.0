class Powerup{
    constructor({x, y, color, icon}){
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 12;
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;
        }
        this.image.src = icon;
        this.loaded = false;
    }
    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.strokeStyle = "black";
        c.lineWidth = 2;
        c.stroke();

        if(!this.loaded){ return; }
        c.imageSmoothingEnabled = true;
        c.drawImage(this.image, this.x - (this.radius*1.5)/2, this.y - (this.radius*1.5)/2, this.radius*1.5, this.radius*1.5);
    }
}

class Teleport extends Powerup{
    constructor({x, y}){
        super({
            x:x,
            y:y, 
            color: "#632ded",
            icon: "https://svgsilh.com/svg/1294347.svg"
        });
    }
    activate(){
        player.immunity = true;
        player.radius = 0;
        gsap.to(player, {
            x: getRandomNumber(11, canvas.width-11),
            y: getRandomNumber(11, canvas.height-11),
            radius: 10,
            immunity: false,
        });
    }
}

class Stoptime extends Powerup{
    constructor({x, y}){
        super({
            x: x,
            y: y,
            color: "white",
            icon: "https://www.svgrepo.com/download/48667/stopwatch.svg"
        });
    }
    activate(){

    }
}