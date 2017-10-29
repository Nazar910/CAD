'use strict';
const Point = require('./point');
const Figure = require('./figures/figure');
const Circle = require('./figures/circle');
const Arc = require('./figures/arc');

const symManager = Symbol('manager');
const symDrawOuterLine = Symbol('drawOuterLine');
const symDrawFullCircles = Symbol('drawFullCircles');
const symDrawConeLikeFigures = Symbol('drawConeLikesFigures');
const symDrawSizes = Symbol('drawSize');
const convertToAffine = Symbol('convertToAffine');
const convertToProjective = Symbol('convertToProjective');

class App {
    /**
     * @param {CanvasManager} manager
     */
    constructor(manager) {
        this[symManager] = manager;
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

        this.manager.drawLineFromPointsArray(upperArc.pointsArray);
        this.manager.drawLineFromPointsArray(bottomArc.pointsArray);

        //draw side lines
        const leftUnion = new Point(center.x - K, center.y);
        const rightUnion = new Point(center.x + K, center.y);

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

        this.manager.drawLineFromPointsArray(circleBottom.pointsArray);
        this.manager.drawLineFromPointsArray(circleTop.pointsArray);
        this.manager.drawLineFromPointsArray(circleMiddle.pointsArray);

        this.manager.drawHorizontalBarDottedLine(circleTop.center, r + 20);
        this.manager.drawHorizontalBarDottedLine(circleBottom.center, r + 20);
    }

    /**
     * @param {Figure} figure
     */
    [symDrawConeLikeFigures](figure) {
        const {center, r, l, rK} = figure;
        //draw half-circles
        const rightHalfCircle = new Arc(new Point(center.x + (l + r), center.y), rK, -90, 90);
        const leftHalfCircle = new Arc(new Point(center.x - (l + r), center.y), rK, 90, 270);

        this.manager.drawLineFromPointsArray(rightHalfCircle.pointsArray);
        this.manager.drawLineFromPointsArray(leftHalfCircle.pointsArray);

        //joinArc bound-points with line
        this.manager.drawLine(rightHalfCircle.startPoint, rightHalfCircle.endPoint);
        this.manager.drawLine(leftHalfCircle.startPoint, leftHalfCircle.endPoint);

        //finish triangles from half-circles to the center circle
        const centerCircleLeftPoint = new Point(center.x - r, center.y);
        const centerCircleRightPoint = new Point(center.x + r, center.y);

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

    /**
     * Draws a figure
     * @param {Figure} figure
     */
    drawFigure(figure) {

        if (!figure || !(figure instanceof Figure)) {
            throw new Error('figure of type Figure required!')
        }

        const {center, R} = figure;

        if (figure.sizesNeeded) {
            //draw sizes
            this[symDrawSizes](figure);
        }

        if (figure.affinePoint) {
            const {R1x, R1y, R2x, R2y} = figure;

            /**
             * Converts a point to affine
             * @param {Point} p - point to be converted
             * @return {Point}
             */
            const convertToAffine = (p) => {
                return new Point(R1x * p.x + R1y * p.y, R2x * p.x + R2y * p.y);
            };

            //convert affine point
            figure = figure.convertEachPoint(convertToAffine);
        }

        if (figure.projectivePoint) {
            const {RxP, RyP, xWeight, yWeight, zWeight} = figure;

            /**
             * Converts a point to a projective
             * @param {Point} p - point to be converted
             * @return {Point}
             */
            const convertToProjective = (p) => {
                const resX
                    = (xWeight * p.x * RxP.x + yWeight * p.y * RxP.y) / (zWeight + xWeight * p.x + yWeight * p.y);
                const resY
                    = (xWeight * p.x * RyP.x + yWeight * p.y * RyP.y) / (zWeight + xWeight * p.x + yWeight * p.y);

                return new Point(resX, resY);
            };

            //convert projective point
            figure = figure.convertEachPoint(convertToProjective);
        }

        this.manager.drawVerticalBarDottedLine(center, R + 20);
        this.manager.drawHorizontalBarDottedLine(center, R + 20);

        //draw outer arcs and side lines
        this[symDrawOuterLine](figure);

        //draw full circles
        this[symDrawFullCircles](figure);

        //draw cone like figures
        this[symDrawConeLikeFigures](figure);

    }


}

module.exports = App;
