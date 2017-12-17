'use strict';
const assert = require('assert');
const Point = require('../point');

class Tangent {
    /**
     * @param {Number} x0
     * @param {Number} c
     */
    constructor(x0, c) {
        assert(!isNaN(x0), 'x0 is required!');
        assert(!isNaN(c), 'c is required!');

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
            return k * (x - x0) + lemniscateFormula(x0)[0];
        };

        const points = [];

        for (let x = x0 - 50; x < x0 + 50; x++) {
            try {
                console.log('x is', x);
                console.log('y is', tangent(x));
                points.push(new Point(x, tangent(x)));
            } catch (e) {
                debugger;
            }
        }

        Object.assign(this, {
            points
        })
    }
}

module.exports = Tangent;
