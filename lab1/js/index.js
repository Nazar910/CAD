'use strict';
const $ = require('jquery');
const Figure = require('./figures/figure');
const Point = require('./point');
const CanvasManager = require('./canvas-manager');
const App = require('./app');

const width = 800;
const height = 800;
const canvas = document.getElementById('myCanvas');
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

const btn = $('button#test');

window.onload = () => {
    const canvasManager = new CanvasManager(canvas);

    const center = new Point(350, 350);
    const R = 150;
    const alpha = 60;
    const L = 100;
    const l = 50;
    const r = 30;
    const rK = 30;
    const K = 130;

    const figure = new Figure({
        center,
        alpha,
        R,
        r,
        L,
        l,
        K,
        rK
    });

    const app = new App(canvasManager);

    app.drawFigure(figure);
};

btn.click(() => {

});
