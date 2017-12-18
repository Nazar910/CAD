'use strict';
const assert = require('assert');

const Point = require('./point');
const Tuplet = require('./tuplet');

const symPoints = Symbol('points');

class Grid {
    /**
     * @param {Number} width
     * @param {Number} height
     * @param {Point} center
     * @param {Number} step
     */
    constructor(width, height, center, step) {
        assert(!isNaN(width), 'width is required!');
        assert(!isNaN(height), 'height is required!');
        assert(!isNaN(step), 'step is required!');
        assert(center , 'center point is required!');
        assert(center instanceof Point, 'center should be instance of Point!');

        const points = [];

        for (let x = - center.x; x < width; x += step) {
            points.push(new Tuplet(new Point(x, - center.y), new Point(x, height)));
        }

        for (let y = - center.y; y < height; y += step) {
            points.push(new Tuplet(new Point(- center.x, y), new Point(width, y)));
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
