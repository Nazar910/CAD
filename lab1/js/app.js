'use strict';
const $ = require('jquery');
const Point = require('./point');
const Figure = require('./figures/figure');
const CanvasManager = require('./canvas-manager');

const width = 1000;
const height = 800;
const canvas = document.getElementById('myCanvas');
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

/**
 * Draws a figure
 * @param {Figure} figure
 */
function drawFigure(figure) {

    const { center, alpha, R, r, l, L } = figure;

    const manager = new CanvasManager(canvas);

    //draw arcs
    manager.drawArc(center, R, -90 - alpha / 2, -90 + alpha / 2);
    manager.drawArc(center, R, 90 - alpha / 2, 90 + alpha / 2);

    //compute angle for side lines
    const angle = (180 - (180 - alpha) / 2 ) / 2;
}


const btn = $('button#test');

window.onload = () => {
    const center = new Point(300, 300);
    const radius = 200;
    const alpha = 60;

    const figure = new Figure(center, alpha, radius);

    drawFigure(figure);

    // const manager = new CanvasManager(canvas);

    // drawCircle(center, radius)
    // manager.drawArc(center, radius, -90, 180);
};

btn.click(() => {
    // const p1 = new Point(0, 0);
    // const p2 = new Point(100, 200);
    // drawLine(p1, p2)
    // drawCircle(new Point(500, 500), 100, 30);

    // ctx.beginPath();
    // ctx.moveTo(200.5, 200.5);
    // drawLine(new Point(200, 200), new Point(220, 180));
    // drawLine(new Point(220, 180), new Point(240, 160));
    // drawLine(new Point(240, 160), new Point(260, 140));
    // drawLine(new Point(260, 140), new Point(280, 120));
    // drawLine(new Point(280, 120), new Point(300, 100));

    // drawLine(new Point(300, 100), new Point(280, 80));
    // drawLine(new Point(280, 80), new Point(260, 60));
    // drawLine(new Point(260, 60), new Point(240, 40));
    // drawLine(new Point(240, 40), new Point(220, 20));
    // drawLine(new Point(220, 20), new Point(200, 0));

    // ctx.stroke();

    // ctx.beginPath();
    // ctx.moveTo(200, 200);
    //
    // ctx.lineTo(220, 180);
    //
    // ctx.stroke();


});
