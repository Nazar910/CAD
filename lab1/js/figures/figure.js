'use strict';
const assert = require('assert');
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
     * @param {Number} alphaAngle - angle of the arc
     */
    alpha(alphaAngle) {
        assert(alphaAngle > 0, 'alpha should be greater than 0!');
        this.alphaAngle = alphaAngle;

        return this;
    }

    /**
     * @param {Number} Rn - radius of the big arc
     */
    R(Rn) {
        assert(Rn > 0, 'R should be greater than 0!');
        this.Rn = Rn;

        return this;
    }

    /**
     * @param {Number} rN - radius of small circle inside
     */
    r(rN) {
        assert(rN > 0, 'r should be greater than 0!');
        this.rN = rN;

        return this;
    }

    /**
     * @param {Number} lN - distance between half-circles on sides and center
     */
    l(lN) {
        assert(lN > 0, 'l should be greater than 0!');
        this.lN = lN;

        return this;
    }

    /**
     * @param {Number} Ln - distance between circles on top and bottom from center
     */
    L(Ln) {
        assert(Ln > 0, 'L should be greater than 0!');
        this.Ln = Ln;

        return this;
    }

    /**
     * @param {Number} Kn - distance between center and join of side lines
     */
    K(Kn) {
        assert(Kn > 0, 'K should be greater than 0!');
        this.Kn = Kn;

        return this;
    }

    /**
     * @param {Number} rKn - radius of the half-circles
     */
    rK(rKn) {
        assert(rKn > 0, 'rK should be greater than 0!');
        this.rKn = rKn;

        return this;
    }

    /**
     * @param {Boolean} sizesRequired - true if sizes are required (false otherwise)
     */
    sizes(sizesRequired) {
        this.sizesRequired = sizesRequired;

        return this;
    }

    /**
     * method that builds up a figure object and does some additional checks
     * @return {Figure}
     */
    build() {
        const { centerP, alphaAngle, Rn, rN, lN, Ln, Kn, rKn, sizesRequired } = this;

        //check required fields
        assert(alphaAngle, 'alpha is required!');
        assert(Rn, 'R is required!');
        assert(centerP, 'Point center is required!');
        assert(rN, 'r is required!');
        assert(lN, 'l is required!');
        assert(Ln, 'L is required!');
        assert(Kn, 'K is required!');
        assert(rKn, 'rK is required!');

        //check additional conditions
        assert(Ln + rN < Rn, 'R should be bigger than L + r');
        assert(rKn + lN + rN < Kn, 'K should be bigger than rK + l + r');

        const figure = new Figure();

        Object.assign(figure, {
            [symCenter]: centerP,
            [symAlpha]: alphaAngle,
            [symR]: Rn,
            [symr]: rN,
            [syml]: lN,
            [symL]: Ln,
            [symK]: Kn,
            [symRK]: rKn,
            [symSizes]: sizesRequired
        });

        return figure;
    }

}

class Figure {
    static get Builder() {
        return new Builder();
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
