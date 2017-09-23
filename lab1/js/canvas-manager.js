'use strict';
const symCtx = Symbol('ctx');

class CanvasManager {
    /**
     * @param canvas - canvas object from html
     * gets by document.getElementById (not jquery)
     */
    constructor(canvas) {
        this[symCtx] = canvas.getContext('2d');
    }

    get ctx() {
        return this[symCtx];
    }

    /**
     * Draws a line
     * @param p1 {Point} coordinates of point1
     * @param p2 {Point} coordinates of point2
     */
    drawLine(p1, p2) {
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
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

    drawCoordinateLines() {
        this.ctx.moveTo(10, 0);
        this.ctx.lineTo(10, height);

        this.ctx.moveTo(0, 10);
        this.ctx.lineTo(width, 10);

        this.ctx.stroke();
    }
}

module.exports = CanvasManager;
