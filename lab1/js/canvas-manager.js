'use strict';
const Point = require('./point');
const Arc = require('./figures/arc');

const symCtx = Symbol('ctx');
const symCanvas = Symbol('height');
const symRefreshContext = Symbol('height');

class CanvasManager {
    /**
     * @param canvas - canvas object from html
     * gets by document.getElementById (not jquery)
     */
    constructor(canvas) {

        Object.assign(this, {
            [symCanvas]: canvas,
            [symCtx]: canvas.getContext('2d')
        });
    }

    get ctx() {
        return this[symCtx];
    }

    get canvasWidth() {
        return this[symCanvas].width;
    }

    get canvasHeight() {
        return this[symCanvas].height;
    }

    set lineWidth(value) {
        this[symCtx].lineWidth = value;
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
    }

    /**
     * Draws lines by gived array of points
     * @param {Array<Point>} points
     */
    drawLineFromPointsArray(points) {
        const xFrom = points[0].x;
        const yFrom = points[0].y;

        this.ctx.beginPath();
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
     * Draws a horizontal bar-dotted line
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

    /**
     * Draws coordinate grid
     * @param {Number} width
     * @param {Number} height
     */
    drawCoordinates(width, height) {
        const GRID_STEP = 200;

        this.ctx.font = "10px Arial";
        this.ctx.fillText('200px', 170, 10);
        this.ctx.fillText('200px', 10, 190);

        for (let x = 0; x < width; x += GRID_STEP) {
            this.drawLine(new Point(x, 0), new Point(x, height));
        }

        for (let y = 0; y < height; y += GRID_STEP) {
            this.drawLine(new Point(0, y), new Point(width, y))
        }
    }

    /**
     * Draws a vertical text
     * @param {String} text
     * @param {Point} point
     */
    writeVerticalText(text, point) {
        this.ctx.save();
        this.ctx.translate(0, 0);
        this.ctx.rotate(-Math.PI/2);
        this.ctx.textAlign = 'center';
        //workaround because context is rotated (x -> -y, y -> x)
        this.ctx.font = "15px Arial";
        this.ctx.fillText(text, -point.y, point.x - 5);
        this.ctx.restore();
    }

    /**
     * Draws a vertical size for a line
     * @param {Point} startPoint
     * @param {Point} endPoint
     * @param {Number} offset
     * @param {Number} size
     */
    drawVerticalSize(startPoint, endPoint, offset, size) {
        if (startPoint.x !== endPoint.x) {
            throw new Error('X should be equal for starting and ending points!')
        }

        //draw line
        //as `x` is similar for both startP and endP
        const { x } = startPoint;
        const fromPoint = new Point(x + offset, startPoint.y);
        const toPoint = new Point(x + offset, endPoint.y);
        this.drawLine(fromPoint, toPoint);
        //draw arrows
        this.drawLine(new Point(fromPoint.x, fromPoint.y - 3), new Point(fromPoint.x - 3, fromPoint.y - 10));
        this.drawLine(new Point(fromPoint.x, fromPoint.y - 3), new Point(fromPoint.x + 3, fromPoint.y - 10));

        this.drawLine(new Point(toPoint.x, toPoint.y + 3), new Point(toPoint.x - 3, toPoint.y + 10));
        this.drawLine(new Point(toPoint.x, toPoint.y + 3), new Point(toPoint.x + 3, toPoint.y + 10));

        //draw side-lines
        const offsetForSideLines = offset + (offset < 0 ? -10 : 10);
        this.drawLine(startPoint, new Point(startPoint.x + offsetForSideLines, startPoint.y));
        this.drawLine(endPoint, new Point(endPoint.x + offsetForSideLines, endPoint.y));

        const deltaYMiddle = Math.abs(fromPoint.y - toPoint.y) / 2;
        const middleY = fromPoint.y > toPoint.y
                            ? fromPoint.y - deltaYMiddle
                            : toPoint.y - deltaYMiddle;

        const middlePoint = new Point(fromPoint.x, middleY);
        this.writeVerticalText(String(size), middlePoint);
    }

    /**
     * Draws a horizontal size for a line
     * @param {Point} startPoint
     * @param {Point} endPoint
     * @param {Number} offset
     * @param {Number} size
     */
    drawHorizontalSize(startPoint, endPoint, offset, size) {
        if (startPoint.y !== endPoint.y) {
            throw new Error('Y should be equal for starting and ending points!')
        }

        //draw line
        //as `y` is similar for both startP and endP
        const { y } = startPoint;
        const fromPoint = new Point(startPoint.x, y + offset);
        const toPoint = new Point(endPoint.x, y + offset);
        this.drawLine(fromPoint, toPoint);
        //draw arrows
        this.drawLine(new Point(fromPoint.x - 3, fromPoint.y), new Point(fromPoint.x - 10, fromPoint.y - 3));
        this.drawLine(new Point(fromPoint.x - 3, fromPoint.y), new Point(fromPoint.x - 10, fromPoint.y + 3));

        this.drawLine(new Point(toPoint.x + 3, toPoint.y), new Point(toPoint.x + 10, toPoint.y - 3));
        this.drawLine(new Point(toPoint.x + 3, toPoint.y), new Point(toPoint.x + 10, toPoint.y + 3));

        //draw side-lines
        const offsetForSideLines = offset + (offset < 0 ? -10 : 10);
        this.drawLine(startPoint, new Point(startPoint.x, startPoint.y + offsetForSideLines));
        this.drawLine(endPoint, new Point(endPoint.x, endPoint.y + offsetForSideLines));

        const deltaXMiddle = Math.abs(fromPoint.x - toPoint.x) / 2;
        const middleX = fromPoint.x > toPoint.x
            ? fromPoint.x - deltaXMiddle
            : toPoint.x - deltaXMiddle;

        const middlePoint = new Point(middleX, fromPoint.y);
        this.ctx.font = "15px Arial";
        this.ctx.fillText(String(size), middlePoint.x, middlePoint.y - 5);
    }

    /**
     * Draws a size for an angle
     * @param {Point} center
     * @param {Number} R
     * @param {Number} angleFrom
     * @param {Number} angleTo
     * @param {Number} offset
     * @param {Number} size
     */
    drawSizeForAngle(center, R, angleFrom, angleTo, offset, size) {
        //TODO: ugly
        const angleArc = new Arc(center, R + offset, angleFrom, angleTo);
        this.drawLineFromPointsArray(angleArc.pointsArray);

        const fromPoint = angleArc.startPoint;
        const toPoint = angleArc.endPoint;

        //draw arrows
        this.drawLine(new Point(fromPoint.x, fromPoint.y), new Point(fromPoint.x - 10, fromPoint.y + 2));
        this.drawLine(new Point(fromPoint.x, fromPoint.y), new Point(fromPoint.x - 8, fromPoint.y + 8));

        this.drawLine(new Point(toPoint.x, toPoint.y), new Point(toPoint.x + 10, toPoint.y + 2));
        this.drawLine(new Point(toPoint.x, toPoint.y), new Point(toPoint.x + 8, toPoint.y + 8));

        this.ctx.fillText(String(size), center.x - 30, center.y + R + 15);
    }

    /**
     * Clears the whole canvas
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
}

module.exports = CanvasManager;
