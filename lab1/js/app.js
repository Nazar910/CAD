'use strict';
const Point = require('./point');
const Figure = require('./figures/figure');
const Circle = require('./figures/circle');
const Arc = require('./figures/arc');
const Grid = require('./grid');
const Arrow = require('./figures/arrow');
const TangentNormal = require('./figures/tangent-normal');

const symManager = Symbol('manager');
const symDrawOuterLine = Symbol('drawOuterLine');
const symDrawFullCircles = Symbol('drawFullCircles');
const symDrawConeLikeFigures = Symbol('drawConeLikesFigures');
const symDrawSizes = Symbol('drawSize');
const symShouldBeConverted = Symbol('shouldBeConverted');
const symShouldBeRotated = Symbol('shouldBeRotated');
const symDrawCoordinates = Symbol('shouldBeConverted');
const symDrawLemniscate = Symbol('drawLemniscate');
const GRID_STEP = 200;

/**
 * Converts a point to affine
 * @param {Point} p - point to be converted
 * @return {Point}
 */
function convertToAffine(p) {
    const { R1x, R1y, R2x, R2y } = this;

    return new Point(R1x * p.x + R1y * p.y, R2x * p.x + R2y * p.y);
}

/**
 * Converts a point to a projective
 * @param {Point} p - point to be converted
 * @return {Point}
 */
function convertToProjective(p) {
    const { RxP, RyP, xWeight, yWeight, zWeight } = this;

    const resX
        = (xWeight * p.x * RxP.x + yWeight * p.y * RxP.y) / (zWeight + xWeight * p.x + yWeight * p.y);
    const resY
        = (xWeight * p.x * RyP.x + yWeight * p.y * RyP.y) / (zWeight + xWeight * p.x + yWeight * p.y);

    return new Point(resX, resY);
}

/**
 * Rotates point on specified angle
 * @param {Point} p
 * @returns {Point}
 */
function rotatePoint(p) {
    const { angle, center } = this;

    const x = (p.x - center.x) * Math.cos(angle) - (p.y - center.y) * Math.sin(angle) + center.x;
    const y = (p.x - center.x) * Math.sin(angle) + (p.y - center.y) * Math.cos(angle) + center.y;
    return new Point(x, y);
}

class App {
    /**
     * @param {CanvasManager} manager
     * @param {Affine} affine
     * @param {Projective} projective
     * @param {Rotation} rotation
     */
    constructor(manager, affine, projective, rotation) {
        this[symManager] = manager;

        let shouldBeConverted = null;
        let shouldBeRotated = null;

        if (affine) {
            shouldBeConverted = convertToAffine.bind(affine);
        }

        if (projective) {
            shouldBeConverted = convertToProjective.bind(projective);
        }

        if (rotation) {
            shouldBeRotated = rotatePoint.bind(rotation);
        }

        Object.assign(this, {
            [symShouldBeConverted]: shouldBeConverted,
            [symShouldBeRotated]: shouldBeRotated
        })
    }

    get shouldBeConverted() {
        return this[symShouldBeConverted];
    }

    get shouldBeRotated() {
        return this[symShouldBeRotated];
    }

    get manager() {
        return this[symManager];
    }

    /**
     * @param {Figure} figure
     */
    [symDrawOuterLine](figure) {
        const {center, alpha, R, K} = figure;
        //draw arcs
        const upperArc = new Arc(center, R, -90 - alpha / 2, -90 + alpha / 2);
        const bottomArc = new Arc(center, R, 90 - alpha / 2, 90 + alpha / 2);

        console.log('Before');
        console.log(upperArc.pointsArray);

        //fixme
        if (this.shouldBeConverted) {
            upperArc.convertPoints(this.shouldBeConverted);
            bottomArc.convertPoints(this.shouldBeConverted);
        }

        //fixme
        if (this.shouldBeRotated) {
            upperArc.convertPoints(this.shouldBeRotated);
            bottomArc.convertPoints(this.shouldBeRotated);
        }

        console.log('After');
        console.log(upperArc.pointsArray);
        this.manager.drawLineFromPointsArray(upperArc.pointsArray);
        this.manager.drawLineFromPointsArray(bottomArc.pointsArray);

        //draw side lines
        let leftUnion = new Point(center.x - K, center.y);
        let rightUnion = new Point(center.x + K, center.y);

        //fixme
        if (this.shouldBeConverted) {
            leftUnion = this.shouldBeConverted(leftUnion);
            rightUnion = this.shouldBeConverted(rightUnion);
        }

        //fixme
        if (this.shouldBeRotated) {
            leftUnion = this.shouldBeRotated(leftUnion);
            rightUnion = this.shouldBeRotated(rightUnion);
        }

        this.manager.drawLine(leftUnion, upperArc.startPoint);
        this.manager.drawLine(leftUnion, bottomArc.endPoint);

        this.manager.drawLine(rightUnion, upperArc.endPoint);
        this.manager.drawLine(rightUnion, bottomArc.startPoint);
    }

    /**
     * @param {Figure} figure
     */
    [symDrawFullCircles](figure) {
        const {center, L, r} = figure;
        //draw normal circles
        const circleBottom = new Circle(new Point(center.x, center.y + L), r);
        const circleTop = new Circle(new Point(center.x, center.y - L), r);
        const circleMiddle = new Circle(new Point(center.x, center.y), r);

        //fixme
        if (this.shouldBeConverted) {
            circleBottom.convertPoints(this.shouldBeConverted);
            circleTop.convertPoints(this.shouldBeConverted);
            circleMiddle.convertPoints(this.shouldBeConverted);
        }

        //fixme
        if (this.shouldBeRotated) {
            circleBottom.convertPoints(this.shouldBeRotated);
            circleTop.convertPoints(this.shouldBeRotated);
            circleMiddle.convertPoints(this.shouldBeRotated);
        }

        this.manager.drawLineFromPointsArray(circleBottom.pointsArray);
        this.manager.drawLineFromPointsArray(circleTop.pointsArray);
        this.manager.drawLineFromPointsArray(circleMiddle.pointsArray);

        //TODO: uncomment when there is possible to draw under angle
        // this.manager.drawHorizontalBarDottedLine(circleTop.center, r + 20);
        // this.manager.drawHorizontalBarDottedLine(circleBottom.center, r + 20);
    }

    /**
     * @param {Figure} figure
     */
    [symDrawConeLikeFigures](figure) {
        const {center, r, l, rK} = figure;
        //draw half-circles
        const rightHalfCircle = new Arc(new Point(center.x + (l + r), center.y), rK, -90, 90);
        const leftHalfCircle = new Arc(new Point(center.x - (l + r), center.y), rK, 90, 270);

        //fixme
        if (this.shouldBeConverted) {
            rightHalfCircle.convertPoints(this.shouldBeConverted);
            leftHalfCircle.convertPoints(this.shouldBeConverted);
        }

        //fixme
        if (this.shouldBeRotated) {
            rightHalfCircle.convertPoints(this.shouldBeRotated);
            leftHalfCircle.convertPoints(this.shouldBeRotated);
        }

        this.manager.drawLineFromPointsArray(rightHalfCircle.pointsArray);
        this.manager.drawLineFromPointsArray(leftHalfCircle.pointsArray);

        //joinArc bound-points with line
        this.manager.drawLine(rightHalfCircle.startPoint, rightHalfCircle.endPoint);
        this.manager.drawLine(leftHalfCircle.startPoint, leftHalfCircle.endPoint);

        //finish triangles from half-circles to the center circle
        let centerCircleLeftPoint = new Point(center.x - r, center.y);
        let centerCircleRightPoint = new Point(center.x + r, center.y);

        //fixme
        if (this.shouldBeConverted) {
            centerCircleLeftPoint = this.shouldBeConverted(centerCircleLeftPoint);
            centerCircleRightPoint = this.shouldBeConverted(centerCircleRightPoint);
        }

        //fixme
        if (this.shouldBeRotated) {
            centerCircleLeftPoint = this.shouldBeRotated(centerCircleLeftPoint);
            centerCircleRightPoint = this.shouldBeRotated(centerCircleRightPoint);
        }

        this.manager.drawLine(leftHalfCircle.startPoint, centerCircleLeftPoint);
        this.manager.drawLine(leftHalfCircle.endPoint, centerCircleLeftPoint);

        this.manager.drawLine(rightHalfCircle.startPoint, centerCircleRightPoint);
        this.manager.drawLine(rightHalfCircle.endPoint, centerCircleRightPoint);
    }

    /**
     * Draws size by a given figure parameters
     * @param {Figure} figure
     */
    [symDrawSizes](figure) {
        const {center, L, K, R, r, l, rK, alpha} = figure;

        const toPoint = new Point(center.x, center.y - L);
        //L size
        this.manager.drawVerticalSize(center, toPoint, K + 30, L);
        //K size
        this.manager.drawHorizontalSize(center, new Point(center.x - K, center.y), R + 50, K);
        //l size
        const lSizeStartP = new Point(center.x - r, center.y);
        this.manager.drawHorizontalSize(lSizeStartP, new Point(lSizeStartP.x - l, center.y), -(R + 50), l);
        //R
        this.manager.drawVerticalSize(center, new Point(center.x, center.y - R), -(R + 30), R);
        //2r
        this.manager.drawVerticalSize(
            new Point(center.x, center.y + L + r),
            new Point(center.x, center.y + L - r),
            K + 30, 2 * r);

        //rK
        this.manager.drawHorizontalSize(
            new Point(center.x + r + l + rK, center.y),
            new Point(center.x + r + l, center.y),
            -(R + 30), rK);
        //alpha
        this.manager.drawSizeForAngle(center, R, 90 - alpha / 2, 90 + alpha / 2, 20, alpha);
    }

    [symDrawCoordinates]() {
        const grid = new Grid(this.manager.canvasWidth, this.manager.canvasHeight, this.manager.center, GRID_STEP);

        const xArrow = new Arrow(new Point(0, 0), new Point(100, 0), 'x');
        const yArrow = new Arrow(new Point(0, 0), new Point(0, 100), 'y');

        //fixme
        if (this.shouldBeConverted) {
            grid.convertPoints(this.shouldBeConverted);
            xArrow.convertPoints(this.shouldBeConverted);
            yArrow.convertPoints(this.shouldBeConverted);
        }

        this.manager.lineWidth = 1;
        grid.pointsTupletsArray.forEach(({from, to}) => this.manager.drawLine(from, to));

        //draw x arrow
        this.manager.drawLine(xArrow.fromPoint, xArrow.toPoint);
        xArrow.arrowPoints.forEach(([left, middle, right]) => {
            this.manager.drawLine(left, middle);
            this.manager.drawLine(middle, right);
        });
        xArrow.labelPoints.forEach(([from, to]) => this.manager.drawLine(from, to));

        //draw y arrow
        this.manager.drawLine(yArrow.fromPoint, yArrow.toPoint);
        yArrow.arrowPoints.forEach(([left, middle, right]) => {
            this.manager.drawLine(left, middle);
            this.manager.drawLine(middle, right);
        });
        yArrow.labelPoints.forEach(([from, to]) => this.manager.drawLine(from, to));
    }

    /**
     * Draws a figure
     * @param {Figure} figure
     */
    drawFigure(figure) {

        // this.manager.drawCoordinates();
        this[symDrawCoordinates]();

        if (!figure || !(figure instanceof Figure)) {
            throw new Error('figure of type Figure required!')
        }

        const { center, R } = figure;

        if (figure.sizesNeeded) {
            //draw sizes
            this[symDrawSizes](figure);
        }

        //TODO: uncomment this and draw dotted lines under angle
        // this.manager.drawVerticalBarDottedLine(center, R + 20);
        // this.manager.drawHorizontalBarDottedLine(center, R + 20);

        //draw outer arcs and side lines
        this[symDrawOuterLine](figure);

        //draw full circles
        this[symDrawFullCircles](figure);

        //draw cone like figures
        this[symDrawConeLikeFigures](figure);

    }

    /**
     * Draws a lemniscate
     * @param lemniscateOfBernoulli
     */
    [symDrawLemniscate](lemniscateOfBernoulli) {
        //fixme
        if (this.shouldBeRotated) {
            lemniscateOfBernoulli.convertPoints(this.shouldBeRotated);
        }

        this.manager.drawLineFromPointsArray(lemniscateOfBernoulli.pointsArray);
    }

    /**
     * Draws lemniscate of Bernoulli
     * @param {LemniscateOfBernoulli} lemniscateOfBernoulli
     */
    drawLemniscateOfBernoulli(lemniscateOfBernoulli) {
        this[symDrawCoordinates]();
        this[symDrawLemniscate](lemniscateOfBernoulli);
    }

    drawTangentAndNormalToLemniscate(lemniscateOfBernoulli, x0) {
        const tangent = new TangentNormal(x0, lemniscateOfBernoulli);
        this.manager.drawLineFromPointsArray(tangent.upperTangent);
        this.manager.drawLineFromPointsArray(tangent.bottomTangent);
        this.manager.drawLineFromPointsArray(tangent.upperNormal);
        this.manager.drawLineFromPointsArray(tangent.bottomNormal);
    }


}

module.exports = App;
