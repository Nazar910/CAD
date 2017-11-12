'use strict';
const { expect } = require('chai');
const Point = require('../js/point');

const Figure = require('../js/figures/figure.js');

describe('Figure', () => {

    describe('not all required steps set up', () => {

        it('should fail', () => {
            try {
                Figure.Builder
                    .alpha(30)
                    .R(150)
                    .build();
            } catch (e) {
                expect(e.message).to.be.equal('Point center is required!');
            }
        });


    });

    describe('all required steps are set up', () => {

        it('should be successful', () => {
            const figure = Figure.Builder
                .center(new Point(350, 350))
                .alpha(60)
                .R(150)
                .r(30)
                .l(50)
                .L(100)
                .rK(30)
                .K(130)
                .build();

            expect(figure.center).to.deep.equal(new Point(350, 350));
            expect(figure.alpha).to.be.equal(60);
            expect(figure.R).to.be.equal(150);
            expect(figure.r).to.be.equal(30);
            expect(figure.l).to.be.equal(50);
            expect(figure.L).to.be.equal(100);
            expect(figure.rK).to.be.equal(30);
            expect(figure.K).to.be.equal(130);
        });

        describe('and one optional', () => {

            it('should be successful', () => {
                const figure = Figure.Builder
                    .center(new Point(350, 350))
                    .alpha(60)
                    .R(150)
                    .r(30)
                    .l(50)
                    .L(100)
                    .rK(30)
                    .K(130)
                    .sizes(true)
                    .build();

                expect(figure.sizesNeeded).to.be.equal(true);
            })

        })

    })


});
