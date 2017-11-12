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

    convertPoints(convertFunc) {
        const center = convertFunc(this.center);
        const points = this.pointsArray.map(convertFunc);

        Object.assign(this, {
            [symCenter]: center,
            [symPoints]: points
        });
    }

    get pointsArray() {
        return this[symPoints];
    }

    get center() {
        return this[symCenter];
    }
}

module.exports = Circle;
