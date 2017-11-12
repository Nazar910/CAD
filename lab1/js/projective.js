'use strict';
const assert = require('assert');
const Point = require('./point');

class Projective {
    constructor(RxP, RyP, xWeight, yWeight, zWeight) {
        assert(RxP, 'RxP is required!');
        assert(RxP instanceof Point, 'RxP should be instance of Point!');
        assert(RyP, 'RyP is required!');
        assert(RyP instanceof Point, 'RyP should be instance of Point!');
        assert(!isNaN(xWeight), 'xWeight is required!');
        assert(!isNaN(yWeight), 'yWeight is required!');
        assert(!isNaN(zWeight), 'zWeight is required!');

        Object.assign(this, {
            RxP,
            RyP,
            xWeight,
            yWeight,
            zWeight
        })
    }
}

module.exports = Projective;
