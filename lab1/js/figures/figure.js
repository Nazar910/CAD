'use strict';
const symCenter = Symbol('center');
const symAlpha = Symbol('alpha');
const symR = Symbol('R');
const symr = Symbol('r');
const syml = Symbol('l');
const symL = Symbol('L');

class Figure {
    /**
     * Creates a figure
     * @param {Point} center
     * @param {Number} alpha - angle of the arc
     * @param {Number} R - radius of the big arc
     * @param {Number} r - radius of small circle inside
     * @param {Number} l - distance between half-circles on sides and center
     * @param {Number} L - distance between circles on top and bottom from center
     */
    constructor({ center, alpha, R, r, l, L }) {
        //TODO: add check for all parameters
        if (!center) {
            throw new Error('Point center is required!');
        }

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

        if (L + r > R) {
            throw new Error('R should be bigger than L + r')
        }

        Object.assign(this, {
            [symCenter]: center,
            [symAlpha]: alpha,
            [symR]: R,
            [symr]: r,
            [syml]: l,
            [symL]: L,
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
}

module.exports = Figure;
