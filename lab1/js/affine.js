'use strict';
const assert = require('assert');

class Affine {
    constructor(R1x, R1y, R2x, R2y) {
        assert(!isNaN(R1x), 'R1x is required!');
        assert(!isNaN(R1y), 'R1y is required!');
        assert(!isNaN(R2x), 'R2x is required!');
        assert(!isNaN(R2y), 'R2y is required!');

        Object.assign(this, {
            R1x,
            R1y,
            R2x,
            R2y
        })
    }
}

module.exports = Affine;
