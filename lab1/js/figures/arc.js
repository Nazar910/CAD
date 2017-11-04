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

        if (isNaN(radius) || radius < 0) {
            throw new Error('radius is required, should be a number and should be greater than 0!');
        }

        if (isNaN(angleFrom)) {
            throw new Error('angleFrom is required, should be a number!');
        }

        if (isNaN(angleTo)) {
            throw new Error('angleTo is required, should be a number!');
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

    convertPoints(convertFunc) {
        const startP = convertFunc(this.startPoint);
        const endP = convertFunc(this.endPoint);
        const points = this.pointsArray.map(convertFunc);

        Object.assign(this, {
            [symStartP]: startP,
            [symEndP]: endP,
            [symPoints]: points
        });
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
