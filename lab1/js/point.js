const symX = Symbol('x');
const symY = Symbol('y');

class Point {
    constructor(x, y) {
        if (!x) {
            throw new Error('x is required!');
        }

        if (!y) {
            throw new Error('y is required!');
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
