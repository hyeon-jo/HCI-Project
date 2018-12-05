let pos = {
    drawable: false,
    stroke: [],
    boundingClientRect: null,
};
let canvas, ctx;
let commitButton;

window.onload = function(){
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    commitButton = document.getElementById("commitButton");

    commitButton.onclick = function() {
        console.log('click');
    };

    canvas.addEventListener("mousedown", listener);
    canvas.addEventListener("mousemove", listener);
    canvas.addEventListener("mouseup", listener);
    canvas.addEventListener("mouseout", listener);

    pos.boundingClientRect = canvas.getBoundingClientRect();

    setInterval(OnDraw, 1.0 / 60.0 * 1000.0);
};

function OnDraw() {
}

function listener(event) {
    switch(event.type){
        case "mousedown":
            initDraw(event);
            break;
        case "mousemove":
            if(pos.drawable)
                draw(event);
            break;
        case "mouseout":
        case "mouseup":
            finishDraw();
            break;
    }
}

function initDraw(event){
    ctx.beginPath();
    pos.drawable = true;
    ctx.moveTo(x(event), y(event));
}

function draw(event){
    ctx.lineTo(x(event), y(event));
    ctx.stroke();
}

function finishDraw(){
    pos.drawable = false;
}

window.addEventListener("resize", resize);
function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    pos.boundingClientRect = canvas.getBoundingClientRect();
}

function x(event) {
    return event.x - pos.boundingClientRect.left;
}

function y(event) {
    return event.y - pos.boundingClientRect.top;
}