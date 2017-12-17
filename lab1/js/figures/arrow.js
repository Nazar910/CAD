'use strict';
const Point = require('./../point');
const assert = require('assert');

const symFromP = Symbol('fromP');
const symToP = Symbol('endP');
const symLabel = Symbol('label');
const symLabelPoints = Symbol('labelPoints');
const symArrowPoints = Symbol('arrowPoints');

class Arrow {
    /**
     * @param {Point} fromP
     * @param {Point} toP
     * @param {String} label - 'x' or 'y'
     */
    constructor(fromP, toP, label) {
        assert(fromP, 'From Point is required!');
        assert(fromP instanceof Point, 'From should be instance of Point!');

        assert(toP, 'To Point is required!');
        assert(toP instanceof Point, 'To should be instance of Point!');

        assert(label, 'Label is required!');
        assert(label === 'x' || label === 'y', 'label should be x or y!');

        const labelPoints = [];
        const arrowPoints = [];

        switch (label) {
            case 'x':
                labelPoints.push([new Point(toP.x + 5, toP.y + 5), new Point(toP.x + 10, toP.y - 5)]);
                labelPoints.push([new Point(toP.x + 10, toP.y + 5), new Point(toP.x + 5, toP.y - 5)]);
                arrowPoints.push([new Point(toP.x - 5, toP.y - 2), toP, new Point(toP.x - 5, toP.y + 2)]);
                break;
            case 'y':
                labelPoints.push([new Point(toP.x + 4, toP.y + 5), new Point(toP.x - 4, toP.y + 15)]);
                labelPoints.push([new Point(toP.x - 4, toP.y + 5), new Point(toP.x, toP.y + 10)]);
                arrowPoints.push([new Point(toP.x - 2, toP.y - 5), toP, new Point(toP.x + 2, toP.y - 5)]);
                break;
        }



        Object.assign(this, {
            [symFromP]: fromP,
            [symToP]: toP,
            [symLabel]: label,
            [symLabelPoints]: labelPoints,
            [symArrowPoints]: arrowPoints
        })
    }

    convertPoints(convertFunc) {
        const fromP = convertFunc(this.fromPoint);
        const toP = convertFunc(this.toPoint);
        const labelsPoints = this.labelPoints.map(([from, to]) => {
            const newFromP = convertFunc(from);
            const newToP = convertFunc(to);

            return [newFromP, newToP];
        });

        const arrowPoints = this.arrowPoints.map(([left, middle, right]) => {
            const newLeft = convertFunc(left);
            const newMiddle = convertFunc(middle);
            const newRight = convertFunc(right);

            return [newLeft, newMiddle, newRight];
        });

        Object.assign(this, {
            [symFromP]: fromP,
            [symToP]: toP,
            [symLabelPoints]: labelsPoints,
            [symArrowPoints]: arrowPoints
        });
    }

    get label() {
        return this[symLabel];
    }

    get fromPoint() {
        return this[symFromP];
    }

    get toPoint() {
        return this[symToP];
    }

    get labelPoints() {
        return this[symLabelPoints];
    }

    get arrowPoints() {
        return this[symArrowPoints];
    }
}

module.exports = Arrow;
