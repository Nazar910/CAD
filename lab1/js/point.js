'use strict';
const symX = Symbol('x');
const symY = Symbol('y');

class Point {
    /**
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x, y) {
        if (isNaN(x) || x < 0) {
            throw new Error('x is required, should be a number and should be greater than 0!');
        }

        if (isNaN(y) || y < 0) {
            throw new Error('y is required, should be a number and should be greater than 0!');
        }

        Object.assign(this, {
            [symX]: x,
            [symY]: y
        })
    }

    get x() {
        return this[symX];
    }

    get y() {
        return this[symY];
    }
}

module.exports = Point;
