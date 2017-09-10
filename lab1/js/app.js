'use strict';
const $ = require('jquery');
const Point = require('./point');

const width = 1000;
const height = 800;

const { PI } = Math;

const canvas = document.getElementById('myCanvas');
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

const btn = $('button#test');

/**
 * Draws a line
 * @param p1 {Point} coordinates of point1
 * @param p2 {Point} coordinates of point2
 */
function drawLine(p1, p2) {
    console.log(p1, p2);

    const ctx = canvas.getContext('2d');
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);

    ctx.stroke();
}

function drawCircle(center, radius, step) {
    
    const length = Math.round(2 * PI * radius / step);
    const pointArr = [];

    const { x: centerX, y: centerY } = center;

    let currentX = centerX;
    let currentY = centerY + radius;
    let iv = 1;
    for (let i = 0; i < length; i++) {

        if (currentX - centerX <= 0) {
            console.log('X is <= 0 so iv = 1');
            iv = 1;
        }

        if (currentY - centerY <= 0) {
            console.log('Y is <= 0 so iv = -1');
            iv = -1;
        }

        pointArr[i] = new Point(currentX, currentY);
        console.log('New Point');

        currentX += iv * step;
        currentY += -1 * iv * step;
    }

    console.log(pointArr);

    pointArr.reduce((from, to) => {
        console.log('in reduce');
        drawLine(from, to);
        return to;
    });
}

function drawArc() {

}

btn.click(() => {
    // const p1 = new Point(0, 0);
    // const p2 = new Point(100, 200);
    // drawLine(p1, p2)
    drawCircle(new Point(500, 500), 100, 30);
});
