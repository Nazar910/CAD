const symX = Symbol('x');
const symY = Symbol('y');

class Point {
    constructor(x, y) {
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
