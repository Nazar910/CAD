"use strict";
const assert = require('assert');

class Point {
    /**
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x, y) {
        assert(!isNaN(x), 'x is required and should be a number!');
        assert(!isNaN(y), 'y is required and should be a number!');

        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
}

module.exports = Point;
