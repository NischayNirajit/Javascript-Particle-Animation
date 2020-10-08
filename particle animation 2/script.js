const canvas = document.getElementById("canvas1");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let particleArray = [];
// let numberOfParticles = 0;
// console.log(canvas.width);
// console.log(innerWidth);
// const size = 2;



let mouse = {
    x : null,
    y : null,
    radius : (canvas.height/80) * (canvas.width/80)  
};

document.addEventListener('mousemove', function(){
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle{
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    createParticle(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        if(this.x>canvas.width/2)
            ctx.fillStyle = 'rgba(0, 0, 0, 0.9)'
        else
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill()
    }
    particleMotion(){
        if(this.x < 0 || this.x > canvas.width){
            this.directionX = -this.directionX;
        }
        if(this.y < 0 || this.y > canvas.height){
            this.directionY = -this.directionY;
        }
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let euclideanDistance = Math.sqrt(dx*dx + dy*dy);
        if(euclideanDistance < this.size + mouse.radius){
            if(mouse.x < this.x && this.x < canvas.width - this.size*10)
                this.x += 20;
            if(mouse.x > this.x && this.x > this.size*10)
                this.x -= 20;
            if(mouse.y < this.y && this.y < canvas.height - this.size*10)
                this.y += 20;
            if(mouse.y > this.y && this.y > this.size*10)
                this.y -= 20;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.createParticle();
    }
}
function connect(){
    let opacityValue = 1
    for(let current = 0; current < particleArray.length; current++){
        for(let next = current; next < particleArray.length; next++){
            let dx = particleArray[current].x - particleArray[next].x;
            let dy = particleArray[current].y - particleArray[next].y;
            let distance = (dx*dx + dy*dy);
            if(distance < (canvas.height/15)*(canvas.width/15)){
                opacityValue = 1 - (distance/20000)

                ctx.strokeStyle = `rgba(128, 128, 128, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[current].x, particleArray[current].y);
                ctx.lineTo(particleArray[next].x, particleArray[next].y);
                ctx.stroke();
            }
        }
    }
}
function initMethod(){
    particleArray = [];
    let numberOfParticles = (canvas.height * canvas.width)/9000;
    for(let i = 0; i<numberOfParticles; i++){
        let size = (Math.random()*7)+1;
        let x = (Math.random() * ((innerWidth-2*size)-(2*size))+2*size);
        let y = (Math.random() * ((innerHeight-2*size)-(2*size))+2*size);
        let directionX = Math.random()*7 -3.5;
        let directionY = Math.random()*7 -3.5;
        let color = '';
        if(x<canvas.width/2)
            color = 'rgba(255, 255, 255, 0.9)';
        else
            color = 'rgba(0, 0, 0, 0.9)';
        particleArray.push(new Particle(x, y, directionX, directionY, size, color));

    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for(let i = 0; i<particleArray.length; i++){
        particleArray[i].particleMotion();
    }
    connect();
}
window.addEventListener('resize', function(){    
    canvas.width  = innerWidth;
    canvas.height  = innerHeight;
    mouse.radius = (canvas.height/80) * (canvas.width/80);
    initMethod();
})
window.addEventListener('mouseout', function(){
    mouse.x = undefined;
    mouse.y = undefined;
})
initMethod();
animate();