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
     * @param {Point} p1 coordinates of point1
     * @param {Point} p2 coordinates of point2
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

    /**
     * Draws a vertical bar-dotted line
     * @param {Point} center - center of the figure
     * @param {Number} L - distance from center to the end of bar-dotted line
     */
    drawVerticalBarDottedLine(center, L) {
        const dashBar = [5 ,20]; //DASH, BAR

        const yFrom = center.y - L;
        const yTo = center.y + L;

        for (let y = yFrom, i = 0; y < yTo; i++) {
            this.ctx.moveTo(center.x, y);
            y += dashBar[i % 2];
            this.ctx.lineTo(center.x, y);
            this.ctx.stroke();

            y += 5;
        }

    }

    /**
     * Draws a vertical bar-dotted line
     * @param {Point} center - center of the figure
     * @param {Number} L - distance from center to the end of bar-dotted line
     */
    drawHorizontalBarDottedLine(center, L) {
        const dashBar = [5 ,20]; //DASH, BAR

        const xFrom = center.x - L;
        const xTo = center.x + L;

        for (let x = xFrom, i = 0; x < xTo; i++) {
            this.ctx.moveTo(x, center.y);
            x += dashBar[i % 2];
            this.ctx.lineTo(x, center.y);
            this.ctx.stroke();

            x += 5;
        }

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
