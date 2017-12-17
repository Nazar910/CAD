'use strict';
const assert = require('assert');

const Point = require('./point');
const Arc = require('./figures/arc');
const Arrow = require('./figures/arrow');

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
        // return x > xC ? x: x + xC
        // return x < 0 ? 
    }

    _shiftY(y) {
        const { y: yC } = this.center;
        // return Math.abs(y - yC);
        // return y > yC ? y - yC : yC - y;
        let yResult = null;
        if (y < 0) {
            yResult = yC + Math.abs(y);
        } else {
            yResult = yC - y;
        }

        return yResult;
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

    drawGrid(gridStep) {
        const grid = new Grid(this.canvasWidth, this.canvasHeight, 0, GRID_STEP);

        const xArrow = new Arrow(new Point(0, 0), new Point(100, 0), 'x');
        const yArrow = new Arrow(new Point(0, 0), new Point(0, 100), 'y');

        //fixme
        if (this.shouldBeConverted) {
            grid.convertPoints(this.shouldBeConverted);
            xArrow.convertPoints(this.shouldBeConverted);
            yArrow.convertPoints(this.shouldBeConverted);
        }

        this.manager.lineWidth = 1;
        grid.pointsTupletsArray.forEach(({from, to}) => this.manager.drawLine(from, to));

        //draw x arrow
        this.manager.drawLine(xArrow.fromPoint, xArrow.toPoint);
        xArrow.arrowPoints.forEach(([left, middle, right]) => {
            this.manager.drawLine(left, middle);
            this.manager.drawLine(middle, right);
        });
        xArrow.labelPoints.forEach(([from, to]) => this.manager.drawLine(from, to));

        //draw y arrow
        this.manager.drawLine(yArrow.fromPoint, yArrow.toPoint);
        yArrow.arrowPoints.forEach(([left, middle, right]) => {
            this.manager.drawLine(left, middle);
            this.manager.drawLine(middle, right);
        });
        yArrow.labelPoints.forEach(([from, to]) => this.manager.drawLine(from, to));
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
