'use strict';
const assert = require('assert');

const Point = require('./point');

const symFrom = Symbol('from');
const symTo = Symbol('to');

class Tuplet {
    /**
     * @param {Point} from
     * @param {Point} to
     */
    constructor(from, to) {
        assert(from, 'from is required!');
        assert(from instanceof Point, 'from should be instance of Point!');
        assert(to, 'to is required!');
        assert(to instanceof Point, 'to should be instance of Point!');

        Object.assign(this, {
            [symFrom]: from,
            [symTo]: to
        })
    }

    get from() {
        return this[symFrom];
    }

    get to() {
        return this[symTo];
    }
}

module.exports = Tuplet;
