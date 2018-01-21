'use strict';
const assert = require('assert');

class CanvasManager {
    /**
     * @param canvas - canvas object from html
     * gets by document.getElementById (not jquery)
     */
    constructor(canvas) {
        assert(canvas, 'Canvas is required!');

        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
    }

    get center() {
        return this._center;
    }

    get ctx() {
        return this._ctx;
    }

    get canvasWidth() {
        return this._canvas.width;
    }

    get canvasHeight() {
        return this._canvas.height;
    }

    set lineWidth(value) {
        this._ctx.lineWidth = value;
    }

    /**
     * Draws a line
     * @param {Point} p1 coordinates of point1
     * @param {Point} p2 coordinates of point2
     */
    drawLine(p1, p2) {
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    /**
     * Draws lines by gived array of points
     * @param {Array<Point>} points
     */
    drawLineFromPointsArray(points) {
        const xFrom = points[0].x;
        const yFrom = points[0].y;

        this.ctx.moveTo(xFrom, yFrom);
        points.forEach(p => this.ctx.lineTo(p.x, p.y));
        this.ctx.stroke();
    }

    /**
     * Clears the whole canvas
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.beginPath();
    }
}

module.exports = CanvasManager;
