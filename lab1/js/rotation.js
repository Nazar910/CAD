'use strict';
const assert = require('assert');
const Point = require('./point');

class Rotation {
    /**
     * @param {Number} angle
     * @param {Number} xCenter
     * @param {Number} yCenter
     */
    constructor(angle, xCenter, yCenter) {
        assert(angle, 'angle is required!');
        assert(xCenter, 'xCenter is required!');
        assert(yCenter, 'yCenter is required!');

        const angleInRadian = angle * Math.PI / 180;
        Object.assign(this, {
            angle: angleInRadian,
            center: new Point(xCenter, yCenter)
        })
    }
}

module.exports = Rotation;
