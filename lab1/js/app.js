'use strict';
const $ = require('jquery');
const Point = require('./point');
const Figure = require('./figures/figure');
const Circle = require('./figures/circle');
const Arc = require('./figures/arc');
const CanvasManager = require('./canvas-manager');

const width = 800;
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

    manager.lineWidth = 1;
    manager.drawCoordinates(width, height);

    manager.lineWidth = 2;
    manager.drawVerticalBarDottedLine(center, R + 20);
    manager.drawHorizontalBarDottedLine(center, R + 20);

    //draw arcs
    const upperArc = new Arc(center, R, -90 - alpha / 2, -90 + alpha / 2);
    const bottomArc = new Arc(center, R, 90 - alpha / 2, 90 + alpha / 2);

    manager.drawLineFromPointsArray(upperArc.pointsArray);
    manager.drawLineFromPointsArray(bottomArc.pointsArray);

    //draw side lines
    const leftUnion = new Point(center.x - R, upperArc.startPoint.y + L + r);
    const rightUnion = new Point(center.x + R, upperArc.startPoint.y + L + r);

    manager.drawLine(leftUnion, upperArc.startPoint);
    manager.drawLine(leftUnion, bottomArc.endPoint);

    manager.drawLine(rightUnion, upperArc.endPoint);
    manager.drawLine(rightUnion, bottomArc.startPoint);

    //draw normal circles

    const circleBottom = new Circle(new Point(center.x, center.y + L), r);
    const circleTop = new Circle(new Point(center.x, center.y - L), r);
    const circleMiddle = new Circle(new Point(center.x, center.y), r);

    manager.drawLineFromPointsArray(circleBottom.pointsArray);
    manager.drawLineFromPointsArray(circleTop.pointsArray);
    manager.drawLineFromPointsArray(circleMiddle.pointsArray);

    manager.drawHorizontalBarDottedLine(circleTop.center, r + 20);
    manager.drawHorizontalBarDottedLine(circleBottom.center, r + 20);

    //draw half-circles
    const rightHalfCircle = new Arc(new Point(center.x + (l + r), center.y), r, -90, 90);
    const leftHalfCircle = new Arc(new Point(center.x - (l + r), center.y), r, 90, 270);

    manager.drawLineFromPointsArray(rightHalfCircle.pointsArray);
    manager.drawLineFromPointsArray(leftHalfCircle.pointsArray);

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
    const center = new Point(350, 350);
    const R = 150;
    const alpha = 60;
    const L = 100;
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
};

btn.click(() => {

});
