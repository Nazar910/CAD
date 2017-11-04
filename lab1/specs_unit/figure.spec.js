'use strict';
const { expect } = require('chai');

const Figure = require('../js/figures/figure.js');

describe('Figure', () => {

    describe('not all required steps setted up', () => {

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


});
