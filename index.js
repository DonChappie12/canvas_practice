var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = '#7ea51a'
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = '#bf2f5d'
// c.fillRect(200, 500, 100, 100);
// c.fillStyle = '#3ce50d'
// c.fillRect(400, 100, 100, 75);

// // Line

// c.beginPath();
// c.moveTo(50, 400);
// c.lineTo(500,30);
// c.lineTo(123,300);
// c.strokeStyle = '#ff6dff';
// c.stroke();

// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

// console.log(getRandomColor());

// // Arc / Circle
// for(var i=0; i<=5; i++){
//     var x=Math.random() * innerWidth;
//     var y=Math.random() * innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = getRandomColor();
//     c.stroke();
// }

// *********** OOP makers ***********

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
// var minRadius = 2;
var colorArr = [
    '#004E5A',
    '#00716C',
    '#BE9D7A',
    '#F58B53',
    '#F06F3E'
]

window.addEventListener('mousemove', 
    function(event){
        mouse.x=event.x;
        mouse.y=event.y;
    }
);

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

function Circle(x,y,dx,dy,radius){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.minRadius=radius;
    this.color=colorArr[Math.floor(Math.random() * colorArr.length)];

    this.draw=function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill();
    }

    this.update = function(){
        if(this.x+this.radius>innerWidth || this.x-this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y+this.radius>innerHeight || this.y-this.radius < 0){
            this.dy = -this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;

        if(mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50){
            if(this.radius<maxRadius){
                this.radius+=1;
            }
        }
        else if(this.radius>this.minRadius){
            this.radius-=1;
        }

        this.draw();
    }
}

// *********** OOP animation ***********

    
var circleArr = [];

function init(){
    circleArr=[];
    for(var i=0; i<1000; i++){
        var radius=Math.random() * 3 + 1;
        var x=Math.random() * (innerWidth-radius*2) + radius;
        var y=Math.random() * (innerHeight-radius*2) + radius;
        var dy=(Math.random() - 0.5)*2;
        var dx=(Math.random() - 0.5)*2;
        circleArr.push(new Circle(x,y,dx,dy,radius));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for(var i=0; i<circleArr.length; i++){
        circleArr[i].update();
    }
}

init();
animate();