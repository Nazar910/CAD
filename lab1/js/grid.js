'use strict';
const assert = require('assert');

const Point = require('./point');
const Tuplet = require('./tuplet');

const symPoints = Symbol('points');

class Grid {
    /**
     * @param {Number} width
     * @param {Number} height
     * @param {Number} step
     */
    constructor(width, height, step) {
        assert(!isNaN(width), 'width is required!');
        assert(!isNaN(height), 'height is required!');
        assert(!isNaN(step), 'step is required!');

        const points = [];

        for (let x = 0; x < width; x += step) {
            points.push(new Tuplet(new Point(x, 0), new Point(x, height)));
        }

        for (let y = 0; y < height; y += step) {
            points.push(new Tuplet(new Point(0, y), new Point(width, y)));
        }

        Object.assign(this, {
            [symPoints]: points
        })
    }

    convertPoints(convertFunc) {
        const points = this.pointsTupletsArray
            .map(({from, to}) => new Tuplet(convertFunc(from), convertFunc(to)));

        Object.assign(this, {
            [symPoints]: points
        });
    }

    get pointsTupletsArray() {
        return this[symPoints];
    }
}

module.exports = Grid;
