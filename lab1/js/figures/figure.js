'use strict';
const Point = require('../point');

const symCenter = Symbol('center');
const symAlpha = Symbol('alpha');
const symR = Symbol('R');
const symr = Symbol('r');
const syml = Symbol('l');
const symL = Symbol('L');
const symK = Symbol('K');
const symRK = Symbol('rK');
const symSizes = Symbol('sizes');

class Figure {
    /**
     * Creates a figure
     * @param {Point} center
     * @param {Number} alpha - angle of the arc
     * @param {Number} R - radius of the big arc
     * @param {Number} r - radius of small circle inside
     * @param {Number} l - distance between half-circles on sides and center
     * @param {Number} L - distance between circles on top and bottom from center
     * @param {Number} K - distance between center and join of side lines
     * @param {Number} rK - radius of the half-circles
     * @param {Boolean} sizes - true if sizes are required (false otherwise)
     */
    constructor({ center, alpha, R, r, L, l, K, rK, sizes }) {
        //TODO: add check for all parameters
        if (!center || !(center instanceof Point)) {
            throw new Error('Point center is required!');
        }

        //TODO: check for negative values
        if (!alpha) {
            throw new Error('alpha is required!');
        }

        if (!R) {
            throw new Error('R is required!');
        }

        if (!r) {
            throw new Error('r is required!');
        }

        if (!l) {
            throw new Error('l is required!');
        }

        if (!L) {
            throw new Error('L is required!');
        }

        if (!K) {
            throw new Error('K is required!');
        }

        if (L + r > R) {
            throw new Error('R should be bigger than L + r')
        }

        if (K < rK + l + r) {
            throw new Error('K should be bigger than rK + l + r')
        }

        Object.assign(this, {
            [symCenter]: center,
            [symAlpha]: alpha,
            [symR]: R,
            [symr]: r,
            [syml]: l,
            [symL]: L,
            [symK]: K,
            [symRK]: rK,
            [symSizes]: sizes
        })
    }

    get center() {
        return this[symCenter];
    }

    get alpha() {
        return this[symAlpha];
    }

    get R() {
        return this[symR];
    }

    get r() {
        return this[symr];
    }

    get l() {
        return this[syml];
    }

    get L() {
        return this[symL];
    }

    get K() {
        return this[symK];
    }

    get rK() {
        return this[symRK];
    }

    get sizesNeeded() {
        return this[symSizes]
    }
}

module.exports = Figure;
