'use strict';
const $ = require('jquery');
const Figure = require('./figures/figure');
const Point = require('./point');
const CanvasManager = require('./canvas-manager');
const App = require('./app');
const Affine = require('./affine');
const Projective = require('./projective');

const width = 800;
const height = 800;
const canvas = document.getElementById('myCanvas');
canvas.setAttribute('width', String(width));
canvas.setAttribute('height', String(height));

const $form = $('#my-form');
const $errors = $('div#errors');
const $btnTestData = $('button#test-data');
const $sizes = $('#sizes');

const $img = $('#variant-image');
const $affine = $('#affine');
const $projective = $('#projective');

const $showImgBtn = $('button#show-img');
const $showAffine = $('button#show-affine');
const $showProjective = $('button#show-projective');

let showImg = true;
let showAffine = false;
let showProjective = false;

window.onload = () => {
    $errors.hide();
    $affine.hide();
    $projective.hide();
};

$showImgBtn.click(() => {
    showImg = !showImg;
    $img.toggle(showImg);
});

$showAffine.click(() => {
    if (showProjective) {
        showProjective = !showProjective;
        $projective.toggle(showProjective);
    }

    showAffine = !showAffine;
    $affine.toggle(showAffine);
});

$showProjective.click(() => {
    if (showAffine) {
        showAffine = !showAffine;
        $affine.toggle(showAffine);
    }

    showProjective = !showProjective;
    $projective.toggle(showProjective);
});

$btnTestData.click(() => {
    //added numbers to the ids because of case-insensitivity
    const testData = {
        xCenter: 350,
        yCenter: 350,
        R1: 150,
        alpha: 60,
        l1: 50,
        L2: 100,
        r2: 30,
        rK: 30,
        K: 130
    };

    $form.find('input').val(function () {
        return testData[this.id];
    })
});

$form.submit(e => {
    const data = $form.serializeArray()
        .reduce((obj, {name, value}) => Object.assign(obj, {
            [name]: +value
        }), {});
    e.preventDefault();
    $errors.empty();
    $errors.hide();

    data.sizes = $sizes.is(':checked');

    const canvasManager = new CanvasManager(canvas);
    canvasManager.clearCanvas();

    try {
        const figure = Figure.Builder
            .center(new Point(data.xCenter, data.yCenter))
            .alpha(data.alpha)
            .R(data.R)
            .r(data.r)
            .l(data.l)
            .L(data.L)
            .rK(data.rK)
            .K(data.K)
            .sizes(data.sizes)
            .build();

        let affine = null;
        let projective = null;

        if (showAffine) {
            const { Rx1, Ry1, Rx2, Ry2 } = data;
            affine = new Affine(Rx1, Ry1, Rx2, Ry2)
        }

        if (showProjective) {
            const { RxPx, RxPy, RyPx, RyPy, xWeight, yWeight, zWeight } = data;
            projective = new Projective(
                new Point(RxPx, RxPy),
                new Point(RyPx, RyPy),
                xWeight, yWeight, zWeight)
        }

        const app = new App(canvasManager,
            affine,
            projective
            // new Affine(0.5, 0, 0.5, 0.5),
            // new Projective(new Point(1000, 3), new Point(6, 900), 2.5, 1.5, 500)
        );

        app.drawFigure(figure);
    } catch (e) {
        $errors.show();
        $errors.append(`<h3>Oops we'ves got an error: <strong>${e.message}</strong></h3>`);
    }
});
