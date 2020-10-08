const canvas = document.getElementById("canvas1");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
numberOfParticles = 300;
let particleArray = [];
let titleElement = document.getElementById("heading");
let titleMetrics = titleElement.getBoundingClientRect();
let title = {
    x : titleMetrics.left,
    y : titleMetrics.top,
    width : titleMetrics.width,
    height : 20
}
class ParticleElement{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = (Math.random()+3)*2; 
        this.weight = Math.random()*2+1;
        this.forceX = 1.5;
        this.factor = Math.floor(Math.random()*20);
    }
    particleMotion(){
        if(this.y>canvas.height){
            this.y = 0;
            this.weight = Math.random()*1+1;
            this.x = Math.random()*canvas.width;
            this.factor = Math.floor(Math.random()*20);
        }
        
        this.weight+=0.01;
        this.y += this.weight;
        this.x += Math.pow(-1, this.factor)*this.forceX;

        if(this.x < title.x+title.width && this.x+this.size>title.x && this.y < title.y+title.height && this.y + this.size> title.y){
            this.y -= 3
            this.weight *= -0.5
        }
    }
    drawParticle(){
        let r =Math.random()*255+10;
        let g =Math.random()*255+10;
        let b =Math.random()*255+10;
        let opacity = Math.random()
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.size, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill()
    }
}
function initMethod(){
    particleArray = [];
    for(let i = 0; i < numberOfParticles; i++){
        const x = Math.floor(Math.random()*canvas.width);
        const y = Math.floor(Math.random()*canvas.height);
        particleArray.push(new ParticleElement(x,y))
    }
}
initMethod();
// const ParticleObject = new ParticleElement(343.1796875,10);
function animate(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    for(i = 0; i<particleArray.length; i++){
        particleArray[i].particleMotion();
        particleArray[i].drawParticle();
    }
    // ParticleObject.particleMotion();
    // ParticleObject.drawParticle();
    requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize', function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    titleMetrics = titleElement.getBoundingClientRect();
    title = {
        x : titleMetrics.left,
        y : titleMetrics.top,
        width : titleMetrics.width,
        height : 20
    }
    initMethod();
})

// bottom: 523.5
// height: 112
// left: 207.6796875
// right: 974.3203125
// top: 411.5
// width: 766.640625
// x: 207.6796875
// y: 411.5
