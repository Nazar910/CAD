'use strict';
const assert = require('assert');
const Point = require('../point');
const LemniscateOfBernoulli = require('./lemniscate-of-bernoulli');

class TangentNormal {
    /**
     * @param {Number} x0
     * @param {LemniscateOfBernoulli} lemniscateOfBernoulli
     */
    constructor(x0, lemniscateOfBernoulli) {
        assert(!isNaN(x0), 'x0 is required!');
        assert(lemniscateOfBernoulli, 'lemniscateOfBernoulli is required!');
        assert(lemniscateOfBernoulli instanceof LemniscateOfBernoulli, 'lemniscate should be instance of LemniscateOfBernoulli');

        const { c, center } = lemniscateOfBernoulli;

        const x0LeftBorder = center.x - c * Math.sqrt(2);
        const x0RightBorder = center.x + c * Math.sqrt(2);
        assert(x0LeftBorder < x0 && x0 < x0RightBorder, 'x0 should be in range from [-c*sqrt(2), c*sqrt(2)]');

        //TODO
        const lemniscateFormula = (x) => {
            const innerSqrt = Math.sqrt(Math.pow(c, 4) + 4 * x * x * c * c);
            const result = Math.abs(Math.round((innerSqrt - x * x - c * c) * 1000) / 1000);
            const resultWithPositiveSign = Math.sqrt(result);

            return [
                resultWithPositiveSign,
                -resultWithPositiveSign
            ]
        };

        const derived = (x) => {
            const upper = (4 * c*c * x) / (Math.sqrt(Math.pow(c, 4) + 4 * c*c * x*x)) - 2 * x;
            const innerSqrt = Math.sqrt(Math.pow(c, 4) + 4 * c*c * x*x);
            console.log('Derived innerSqrt is', innerSqrt);
            const forBottomSqrt = - c*c + innerSqrt - x*x;
            console.log('Derived for bottomSqrt is', forBottomSqrt);
            const bottom = 2 * Math.sqrt(forBottomSqrt);
            console.log('Upper is', upper);
            console.log('Bottom is', bottom);
            return (upper / bottom);

            // return - (c*c) + Math.sqrt(Math.pow(c, 4) + 4 * x*x * c*c) - (x*x);
        };

        const tangent = (x) => {
            const k = derived(x0);
            console.log('K is', k);
            return [
                k * (x - x0) + lemniscateFormula(x0)[0],
                -k * (x - x0) + lemniscateFormula(x0)[1]
            ];
        };

        const normal = (x) => {
            const k = derived(x0);
            console.log('K is', k);
            return [
                -(1/k) * (x - x0) + lemniscateFormula(x0)[0],
                (1/k) * (x - x0) + lemniscateFormula(x0)[1]
            ];
        };

        const upperTangent = [];
        const bottomTangent = [];

        const upperNormal = [];
        const bottomNormal = [];

        for (let x = x0 - 50; x < x0 + 50; x++) {
            upperTangent.push(new Point(x, tangent(x)[0]));
            bottomTangent.push(new Point(x, tangent(x)[1]));

            upperNormal.push(new Point(x, normal(x)[0]));
            bottomNormal.push(new Point(x, normal(x)[1]));
        }

        Object.assign(this, {
            upperTangent,
            bottomTangent,
            upperNormal,
            bottomNormal
        })
    }
}

module.exports = TangentNormal;
