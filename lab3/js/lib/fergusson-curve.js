"use strict";
//TODO: hermite curve
const CURVE_START = 0.1;
const CURVE_END = 0.9;
const CURVE_STEP = 0.1;

const assert = require('assert');

const Point = require('./point');


const getCurrentKoefs = t => {
    const k1 = (1 - t) * (1 - t) * (1 - t);//(1 - 3 * t * t + 2 * t * t * t);
    const k2 = 3 * t * (1 - t) * (1 - t);//t * (1 - t) * (1 - t);
    const k3 = 3 * t * t * (1 - t);//t * (3 * t * t - 2 * t * t * t);
    const k4 = t * t * t;//t * t*(1- t);

    return [k1, k2, k3, k4];
}

class FergussonCurve {

    /**
     * @param {Point} p0 
     * @param {Point} p1 
     * @param {Point} p2 
     * @param {Point} p3 
     */
    constructor(p0, p1, p2, p3) {
        assert(p0 instanceof Point, 'p0 should be instanceof Point');
        assert(p1 instanceof Point, 'p1 should be instanceof Point');
        assert(p2 instanceof Point, 'p2 should be instanceof Point');
        assert(p3 instanceof Point, 'p3 should be instanceof Point');

        const points = [];
        for (let t = CURVE_START; t < CURVE_END; t += CURVE_STEP) {
            const [k1, k2, k3, k4] = getCurrentKoefs(t);

            const x = k1 * p0.x + k2 * p1.x + k3 * p2.x + k4 * p3.x;
            const y = k1 * p0.y + k2 * p1.y + k3 * p2.y + k4 * p3.y;

            points.push(new Point(x, y));
        }

        this._points = points;
    }

    get points() {
        return this._points;
    }
}

module.exports = FergussonCurve;