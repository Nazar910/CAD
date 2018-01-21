"use strict";
const assert = require('assert');
const CanvasManager = require('./canvas-manager');
const FergussonCurve = require('./lib/fergusson-curve');
const Point = require('./lib/point');

class App {
    /**
     * 
     * @param {CanvasManager} canvasManager 
     */
    constructor(canvasManager) {
        assert(canvasManager instanceof CanvasManager, 'argument should be instance of CanvasManger');

        this._canvasManager = canvasManager;
    }

    get manager() {
        return this._canvasManager;
    }

    _draweCurve([x0, y0], [x1,y1], [x2, y2], [x3, y3]) {
        const p0 = new Point(x0, y0);
        const p1 = new Point(x1, y1);
        const p2 = new Point(x2, y2);
        const p3 = new Point(x3, y3);

        const curve = new FergussonCurve(p0, p1, p2, p3);
        this.manager.drawLineFromPointsArray(curve.points);
    }

    drawTrain() {
        console.log('Choo choo mfker!');
        this._draweCurve([10, 10], [30, 30], [50, 30], [60, 20]);
    }
}

module.exports = App;