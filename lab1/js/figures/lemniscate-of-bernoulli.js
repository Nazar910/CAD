'use strict';
const assert = require('assert');
const Point = require('../point');

const symCenter = Symbol('center');
const symC = Symbol('C');
const symPointsArray = Symbol('pointsArray');
const symConstructor = Symbol('constructor');

class Builder {
    /**
     * @param {Point} centerP
     */
    center(centerP) {
        assert(centerP instanceof Point, 'Point center should be instance of Point');
        this.centerP = centerP;

        return this;
    }

    /**
     * @param {Number} cN - distance between focuses
     */
    c(cN) {
        assert(cN > 0, 'R should be greater than 0!');
        this.cN = cN;

        return this;
    }

    /**
     * method that builds up a figure object and does some additional checks
     * @return {LemniscateOfBernoulli}
     */
    build() {
        const { centerP, cN } = this;

        //check required fields
        assert(cN, 'c is required!');
        assert(centerP, 'Point center is required!');

        return LemniscateOfBernoulli[symConstructor](cN, centerP);
    }

}

class LemniscateOfBernoulli {
    static [symConstructor](c, center) {
        const lemniscateFormula = (x) => {
            const innerSqrt = Math.sqrt(Math.pow(c, 4) + 4 * x*x * c*c);
            const result = Math.abs(Math.round((innerSqrt - x*x - c*c) * 1000) / 1000);
            const resultWithPositiveSign = Math.sqrt(result);

            return [
                resultWithPositiveSign,
                -resultWithPositiveSign
            ]
        };

        const topLine = [];
        const bottomLine = [];

        for (let x = - c * Math.sqrt(2); x <= c * Math.sqrt(2); x += 1) {
            const [yToTop, yToBottom] = lemniscateFormula(x);

            const { x: xC, y: yC } = center;
            try {
                topLine.push(new Point(x + xC, yToTop + yC));
                bottomLine.push(new Point(x + xC, yToBottom + yC));
            } catch (e) {
                debugger;
            }
        }

        const lemniscate = new this();

        Object.assign(lemniscate, {
            [symC]: c,
            [symCenter]: center,
            [symPointsArray]: topLine.concat(bottomLine.reverse())
        });

        return lemniscate;
    }

    static get Builder() {
        return new Builder();
    }

    get center() {
        return this[symCenter];
    }

    get c() {
        return this[symC];
    }

    get pointsArray() {
        return this[symPointsArray];
    }

    convertPoints(convertFunc) {
        const points = this.pointsArray.map(convertFunc);

        Object.assign(this, {
            [symPointsArray]: points
        });
    }
}

module.exports = LemniscateOfBernoulli;
