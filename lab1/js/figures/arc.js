'use strict';
const Point = require('./../point');

const { PI } = Math;

const symStartP = Symbol('startP');
const symEndP = Symbol('endP');
const symRadius = Symbol('radiusP');
const symAngleFrom = Symbol('angleFrom');
const symAngleTo = Symbol('angleTo');
const symCenter = Symbol('center');
const symPoints = Symbol('points');

class Arc {
    /**
     * @param {Point} center
     * @param {Number} radius
     * @param {Number} angleFrom
     * @param {Number} angleTo
     */
    constructor(center, radius, angleFrom, angleTo) {
        if (!center) {
            throw new Error('Point center is required!');
        }

        if (!radius) {
            throw new Error('radius is required!');
        }

        if (isNaN(angleFrom)) {
            throw new Error('angleFrom is required and should be a number!');
        }

        if (isNaN(angleTo)) {
            throw new Error('angleTo is required and should be a number!');
        }

        if (angleFrom > angleTo) {
            throw new Error('Angle from should be less than angleTo!');
        }

        const { x: xCenter, y: yCenter } = center;

        const points = [];

        for (let currentAngle = angleFrom; currentAngle <= angleTo; currentAngle++) {
            //draw using circle formula
            const x = Math.cos(currentAngle * PI / 180) * radius + xCenter;
            const y = Math.sin(currentAngle * PI / 180) * radius + yCenter;

            points.push(new Point(x, y));
        }

        Object.assign(this, {
            [symStartP]: points[0],
            [symEndP]: points.slice(-1)[0],
            [symRadius]: radius,
            [symAngleFrom]: angleFrom,
            [symAngleTo]: angleTo,
            [symCenter]: center,
            [symPoints]: points
        })
    }

    get pointsArray() {
        return this[symPoints];
    }

    get startPoint() {
        return this[symStartP];
    }

    get endPoint() {
        return this[symEndP];
    }
}

module.exports = Arc;
