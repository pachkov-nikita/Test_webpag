let canvas = document.getElementById('draw');
context = canvas.getContext("2d");

let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let paint;
let mouseX;
let mouseY;
let offsetLeft = canvas.parentElement.parentElement.offsetLeft;
let offsetTop  = canvas.parentElement.parentElement.offsetTop;
let WidthLine = document.getElementById("line_width");
let ChangeColor = document.getElementById("color_change");
document.getElementById("butt").onclick = clear;
WidthLine.value = 1;
ChangeColor.value = "#000000";




canvas.addEventListener('mousedown',function (e)
{
    mouseX = e.pageX - this.offsetLeft - offsetLeft;
    mouseY = e.pageY - this.offsetTop - offsetTop;
    paint = true;
    addClick(mouseX, mouseY);
    redraw();
});
canvas.addEventListener('mousemove',function (e){
    if(paint){
        addClick(e.pageX - this.offsetLeft - offsetLeft, e.pageY - this.offsetTop - offsetTop, true);
        redraw();
    }
});

canvas.addEventListener('mouseup',function (e){
    paint = false;
  
});
canvas.addEventListener('mouseleave',function (e){
    paint = false;

});

function addClick(x, y, dragging){

    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}


function redraw(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    context.strokeStyle = ChangeColor.value;
    context.lineJoin = "round";
    context.lineWidth = WidthLine.value;

    for(var i=0; i < clickX.length; i++) {
        context.beginPath();
        if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
        }else{
            context.moveTo(clickX[i]-1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}


function clear() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    clickX = [];
    clickY = [];
    clickDrag = [];
}

