'use strict';
const assert = require('assert');

const Point = require('./point');
const Arc = require('./figures/arc');

class CanvasManager {
    /**
     * @param canvas - canvas object from html
     * gets by document.getElementById (not jquery)
     */
    constructor(canvas) {
        assert(canvas, 'Canvas is required!');

        this._center = new Point(canvas.width * 0.5, canvas.height * 0.5);
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

    _shiftX(x) {
        const { x: xC } = this.center;
        return x + xC;
    }

    _shiftY(y) {
        const { y: yC } = this.center;
        return y > yC ? y - yC : yC - y;
    }

    _shiftPoint(point) {
        return new Point(this._shiftX(point.x), this._shiftY(point.y));
    }

    /**
     * Draws a line
     * @param {Point} p1 coordinates of point1
     * @param {Point} p2 coordinates of point2
     */
    drawLine(p1, p2) {
        this.ctx.moveTo(this._shiftX(p1.x), this._shiftY(p1.y));
        this.ctx.lineTo(this._shiftX(p2.x), this._shiftY(p2.y));
        this.ctx.stroke();
    }

    /**
     * Draws lines by gived array of points
     * @param {Array<Point>} points
     */
    drawLineFromPointsArray(points) {
        const shiftedPoints = points.map(p => this._shiftPoint(p));
        
        const xFrom = shiftedPoints[0].x;
        const yFrom = shiftedPoints[0].y;

        this.ctx.moveTo(xFrom, yFrom);
        shiftedPoints.forEach(p => this.ctx.lineTo(p.x, p.y));
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
