'use strict';
const assert = require('assert');
const Point = require('../point');

const symCenter = Symbol('center');
const symC = Symbol('C');
const symPointsArray = Symbol('pointsArray');

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

        const lemniscateOfBernoulli = new LemniscateOfBernoulli();

        Object.assign(lemniscateOfBernoulli, {
            [symCenter]: centerP,
            [symC]: cN
        });

        return lemniscateOfBernoulli;
    }

}

class LemniscateOfBernoulli {
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
        const center = this[symCenter];
        const c = this[symC];

        const lemniscateFormula = (x) => {
            const innerSqrt = Math.sqrt(Math.pow(c, 4) + 4 * x * x * c * c);
            const result = Math.abs(Math.round((innerSqrt - x * x - c * c) * 1000) / 1000);
            const resultWithPositiveSign = Math.sqrt(result);
            console.log('Inner sqrt', innerSqrt);
            console.log('Result', result);
            console.log('resultWithPositiveSign', resultWithPositiveSign);

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

        return topLine.concat(bottomLine.reverse());
    }
}

module.exports = LemniscateOfBernoulli;
