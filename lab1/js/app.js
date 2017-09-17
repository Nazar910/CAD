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
const ctx = canvas.getContext('2d');


/**
 * Draws a line
 * @param p1 {Point} coordinates of point1
 * @param p2 {Point} coordinates of point2
 */
function drawLine(p1, p2) {
    console.log(p1, p2);

    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y)
    
}

// function drawCircle(center, radius, step) {
//
//     const length = Math.round(2 * PI * radius / step);
//     const pointArr = [];
//
//     const { x: centerX, y: centerY } = center;
//
//     let currentX = centerX;
//     let currentY = centerY + radius;
//     let iv = 1;
//     for (let i = 0; i < length; i++) {
//
//         if (currentX - centerX <= 0) {
//             console.log('X is <= 0 so iv = 1');
//             iv = 1;
//         }
//
//         if (currentY - centerY <= 0) {
//             console.log('Y is <= 0 so iv = -1');
//             iv = -1;
//         }
//
//         pointArr[i] = new Point(currentX, currentY);
//         console.log('New Point');
//
//         currentX += iv * step;
//         currentY += -1 * iv * step;
//     }
//
//     console.log(pointArr);
//
//     pointArr.reduce((from, to) => {
//         console.log('in reduce');
//         drawLine(from, to);
//         return to;
//     });
// }

function drawCircle(center, radius) {
    const { x: xCenter, y: yCenter } = center;
    //from center.x - radius to center.x + radius
    const xFrom = xCenter - radius;
    const xTo = xCenter + radius;

    const pointsUp = [];
    const pointsDown = [];
    for (let x = xFrom; x <= xTo; x++) {
        //draw using circle formula
        const yDown = Math.sqrt(radius * radius - (x - xCenter) * (x - xCenter)) + yCenter;
        const yUp = yCenter - (yDown - yCenter);

        pointsDown.push(new Point(x, yDown));
        pointsUp.push(new Point(x, yUp));
    }

    console.log(pointsUp);
    console.log(pointsDown);

    ctx.moveTo(xFrom, yCenter);
    pointsUp.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();

    ctx.moveTo(xFrom, yCenter);
    pointsDown.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();
}

function drawArc(center, radius, angleFrom, angleTo) {
    const { x: xCenter, y: yCenter } = center;

    const points = [];

    let xFrom = Math.cos(angleFrom * PI / 180) * radius + xCenter;
    let yFrom = Math.sqrt(radius * radius - (xFrom - xCenter) * (xFrom - xCenter)) + yCenter;

    for (let currentAngle = angleFrom; currentAngle <= angleTo; currentAngle++) {
        //draw using circle formula
        const x = Math.cos(currentAngle * PI / 180) * radius + xCenter;
        const y = Math.sin(currentAngle * PI / 180) * radius + yCenter;
        // const y = Math.sqrt(radius * radius - (x - xCenter) * (x - xCenter)) + yCenter;

        points.push(new Point(x, y));
    }

    console.log(points);

    ctx.moveTo(xFrom, yFrom);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();
}

function drawCoordinateLines() {
    ctx.moveTo(10, 0);
    ctx.lineTo(10, height);

    ctx.moveTo(0, 10);
    ctx.lineTo(width, 10);

    ctx.stroke();
}

window.onload = () => {
    drawCoordinateLines();

    const center = new Point(200, 200);
    const radius = 50;

    // drawCircle(center, radius)
    drawArc(center, radius, 0, 240);
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
