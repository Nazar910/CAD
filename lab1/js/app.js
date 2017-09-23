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
    const upperArc = manager.drawArc(center, R, -90 - alpha / 2, -90 + alpha / 2);
    const bottomArc = manager.drawArc(center, R, 90 - alpha / 2, 90 + alpha / 2);

    //draw side line
    const leftUnion = new Point(center.x - R, upperArc.startPoint.y + L + r);
    const rightUnion = new Point(center.x + R, upperArc.startPoint.y + L + r);

    manager.drawLine(leftUnion, upperArc.startPoint);
    manager.drawLine(leftUnion, bottomArc.endPoint);

    manager.drawLine(rightUnion, upperArc.endPoint);
    manager.drawLine(rightUnion, bottomArc.startPoint);

    //draw normal circles
    manager.drawCircle(new Point(center.x, center.y + L), r);
    manager.drawCircle(new Point(center.x, center.y - L), r);
    manager.drawCircle(new Point(center.x, center.y), r);

    //draw half-circles
    const rightHalfCircle = manager.drawArc(new Point(center.x + (l + r), center.y), r, -90, 90);
    const leftHalfCircle = manager.drawArc(new Point(center.x - (l + r), center.y), r, 90, 270);

    //joinArc bound-points with line
    manager.drawLine(rightHalfCircle.startPoint, rightHalfCircle.endPoint);
    manager.drawLine(leftHalfCircle.startPoint, leftHalfCircle.endPoint);

    //finish triangles from half-circles to the center circle
    const centerCircleLeftPoint = new Point(center.x - r, center.y);
    const centerCircleRightPoint = new Point(center.x + r, center.y);

    manager.drawLine(leftHalfCircle.startPoint, centerCircleLeftPoint);
    manager.drawLine(leftHalfCircle.endPoint, centerCircleLeftPoint);

    manager.drawLine(rightHalfCircle.startPoint, centerCircleRightPoint);
    manager.drawLine(rightHalfCircle.endPoint, centerCircleRightPoint);
}


const btn = $('button#test');

window.onload = () => {
    const center = new Point(300, 300);
    const R = 200;
    const alpha = 60;
    const L = 150;
    const l = 50;
    const r = 30;

    const figure = new Figure({
        center,
        alpha,
        R,
        L,
        r,
        l
    });

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
