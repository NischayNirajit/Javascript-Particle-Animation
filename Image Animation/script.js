canvas = document.getElementById("canvas1");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
const mouse = {
    x : null,
    y : null,
    radius : 100
};
window.addEventListener('mousemove', function(event){
    mouse.x = event.x + canvas.clientLeft/2;
    mouse.y = event.y + canvas.clientTop/2;
});

// ctx.fillStyle = 'White';
// ctx.font = '30px Arial';
// ctx.strokeStyle = 'white';
// ctx.strokeRect(0, 0, 100, 100)
// ctx.fillText('Hello Nischay!', 0, 40);
// const imageData = ctx.getImageData(0,0,2000,2000);
const my_gradient=ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
my_gradient.addColorStop(0, "white");
// my_gradient.addColorStop();
my_gradient.addColorStop(1, "yellow");
// console.log(data)
// let count = 0;
// for(let row = 0; row<imageData.height; row++){
//     for(let col = 0; col<imageData.width; col++){
//         if(count%4 == 3 && imageData.data[count]>=128)
//             console.log(count+" "+imageData.data[count])
//         count++;
//     }
// }
// console.log(count);
// console.log("Iske baad");
// console.log("\n");
// let count2 = 0;
// for(let row = 0; row<imageData.height; row++){
//     for(let col = 0; col<imageData.width; col++){
//         if(imageData.data[(row*4*imageData.width)+ (col*4)+3]>=128)
//             console.log(((row*4*imageData.width)+ (col*4)+3)+" "+imageData.data[((row*4*imageData.width)+ (col*4)+3)])
//         count2++;
//     }
// }
// console.log(count2);

function createImage(){
    let imageWidth = png.width;
    let imageHeight = png.height;
    const imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    ctx.clearRect(0,0 , canvas.width, canvas.height);
    class Particle{
        constructor(x, y, color){
            this.x = x + canvas.width/2 - imageWidth *2;
            this.y = y + canvas.height/2 - imageHeight *2;
            this.color = color;
            this.size = 3;
            this.originalX = this.x + canvas.width/2 - imageWidth *2;
            this.originalY = this.y + canvas.height/2 - imageHeight *2;
            this.density = Math.random()*30 + 1;
            this.interaction = false;
        }
        drawParticle(){
            ctx.fillStyle = this.color
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();
        }
        particleMotion(){
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            let cosTheta = dx/distance;
            let sinTheta = dy/distance;
            let speedOfMotion = 1 - (distance/mouse.radius)
            let directionX = cosTheta * speedOfMotion * this.density;
            let directionY = sinTheta * speedOfMotion * this.density;
            if(speedOfMotion < 0) speedOfMotion = 0;
            if(distance < mouse.radius+this.size){
                this.x -= directionX;
                this.y -= directionY;
                this.interaction = true;
    
            }else{
                this.interaction = false;
                if(this.x !== this.originalX){
                    let dx =this.x - this.originalX;
                    this.x -= dx/10;
                }
                if(this.y !== this.originalY){
                    let dy =this.y - this.originalY;
                    this.y -= dy/10;
                }
            }
            this.drawParticle();
        }
        
        
    }
    function connect(){
        let opacityValue = 1
        for(let current = 0; current < particleArray.length; current++){
            for(let next = current; next < particleArray.length; next++){
                let dx = particleArray[current].x - particleArray[next].x;
                let dy = particleArray[current].y - particleArray[next].y;
                let distance = (dx*dx + dy*dy);
                if(distance < 300){
                    opacityValue = 1 - (distance/3000)
                    
                        ctx.strokeStyle = `rgba(179, 168, 168, ${opacityValue})`;
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
        // let count = 0;
        for(let row = 0, finalRow = imageData.height; row<finalRow; row++){
            for(let col = 0, finalCol = imageData.width; col<finalCol; col++){
                if(imageData.data[(row*4*imageData.width)+ (col*4)+3]!=0)
                {
                    let positionX = col;
                    let positionY = row;
                    let currentIndex = (row*4*imageData.width)+ (col*4)
                    let red = imageData.data[currentIndex];
                    let green = imageData.data[currentIndex+1];
                    let blue = imageData.data[currentIndex+2];
                    let op = imageData.data[currentIndex+3];
                    let color  = `rgba(${red}, ${green}, ${blue}, ${op})`
                    particleArray.push(new Particle(positionX*8, positionY*8, color));
                }
                // count++;
            }
            
        }
    }
   
    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i = 0; i<particleArray.length; i++){
            // particleArray[i].drawParticle();
            particleArray[i].particleMotion();
        }
        // connect();
        requestAnimationFrame(animate)
    }
    initMethod(); 
    animate();
    window.addEventListener('resize', function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerheight;
        initMethod()
    })
}
const png = new Image();
png.src = '';
window.addEventListener('load', (event)=>{
    console.log('loaded')
    ctx.drawImage(png, 0, 0);
    createImage();
})


