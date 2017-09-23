'use strict';
const Arc = require('./arc');

const symRadius = Symbol('radiusP');
const symCenter = Symbol('center');
const symPoints = Symbol('points');

class Circle {
    /**
     * @param {Point} center
     * @param {Number} radius
     */
    constructor(center, radius) {
        const arc = new Arc(center, radius, 0, 360);

        Object.assign(this, {
            [symRadius]: radius,
            [symCenter]: center,
            [symPoints]: arc.pointsArray
        })
    }

    get pointsArray() {
        return this[symPoints];
    }
}

module.exports = Circle;
