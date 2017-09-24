'use strict';
const symX = Symbol('x');
const symY = Symbol('y');

class Point {
    /**
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x, y) {
        if (isNaN(x)) {
            throw new Error('x is required and should be a number!');
        }

        if (isNaN(y)) {
            throw new Error('y is required and should be a number!');
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
