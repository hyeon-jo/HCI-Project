let pos = {
    drawable: false,
    strokes: [],
    currentStroke: [],
    boundingClientRect: null,
    commits: new Map(),
};
let canvas, ctx;
let commitButton;
let commitMessageTextArea;
let showButton;
let showTextArea;

window.onload = function(){
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    commitButton = document.getElementById("commitButton");
    commitMessageTextArea = document.getElementById("commitMessage");

    commitButton.onclick = function() {
        pos.commits.set(commitMessageTextArea.value,
            pos.strokes.slice());

        console.log(pos.commits);

        commitMessageTextArea.value = "";
    };

    showButton = document.getElementById("showCommitButton");
    showTextArea = document.getElementById("showCommit");

    showButton.onclick = function() {
        const commit = pos.commits.get(showTextArea.value);

        if (commit === undefined || commit === null) {
            console.log("There doesn't exist the object which has key: " + showTextArea);
            return;
        }

        pos.strokes = commit;
    };

    canvas.addEventListener("mousedown", listener);
    canvas.addEventListener("mousemove", listener);
    canvas.addEventListener("mouseup", listener);
    canvas.addEventListener("mouseout", listener);

    pos.boundingClientRect = canvas.getBoundingClientRect();

    setInterval(OnDraw, 1.0 / 60.0 * 1000.0);
};

function OnDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const stroke of pos.strokes) {
        ctx.beginPath();

        ctx.moveTo(stroke[0][0], stroke[0][1]);

        for (let i = 1; i < stroke.length; ++i) {
            const x = stroke[i][0];
            const y = stroke[i][1];

            ctx.lineTo(x, y);
        }

        ctx.stroke();
    }
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
    pos.drawable = true;
    pos.currentStroke = [];
    pos.currentStroke.push([x(event), y(event)]);
    pos.strokes.push(pos.currentStroke);
}

function draw(event){
    pos.currentStroke.push([x(event), y(event)]);
}

function finishDraw(){
    pos.drawable = false;
    pos.currentStroke = null;
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