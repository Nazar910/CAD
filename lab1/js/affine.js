'use strict';

class Affine {
    constructor(R1x, R1y, R2x, R2y) {
        Object.assign(this, {
            R1x,
            R1y,
            R2x,
            R2y
        })
    }
}

module.exports = Affine;
