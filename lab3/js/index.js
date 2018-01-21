"use strict";

const $ = require('jquery');
const WIDTH = 900;
const HEIGHT = 900;
const CanvasManager = require('./canvas-manager');
const App = require('./app');

const canvas = document.getElementById('myCanvas');
canvas.setAttribute('width', String(WIDTH));
canvas.setAttribute('height', String(HEIGHT));

function draw() {
    const canvasManager = new CanvasManager(canvas);
    canvasManager.clearCanvas();

    const app = new App(canvasManager);
    app.drawTrain();
}

window.onload = draw;