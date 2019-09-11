import App from "./objects/app.js";

// setup
const canvasDiv = getById('canvasDiv');

const canvas = document.createElement('canvas');
canvas.setAttribute('width', 960);
canvas.setAttribute('height', 640);
canvas.setAttribute('id', 'canvas');
canvas.style.border = '1px solid black';
canvasDiv.appendChild(canvas);

const ctx = canvas.getContext("2d");
const app = new App(ctx);

getById('canvas').onmousedown = elem => app.onMouseDown(elem);
getById('canvas').onmouseup = elem => app.onMouseUp(elem);
getById('canvas').onmouseleave = elem => app.onMouseLeave(elem);
getById('canvas').onmousemove = elem => app.onMouseMove(elem);

getById('resetButton').onclick = () => app.onStepBack();

getById('red').onclick = () => app.setColor('#ff0000');
getById('green').onclick = () => app.setColor('#00ff00');
getById('black').onclick = () => app.setColor('#000000');

function getById(id) {
    return document.getElementById(id);
}