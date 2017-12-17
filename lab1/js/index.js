'use strict';
const $ = require('jquery');
const Figure = require('./figures/figure');
const LemniscateOfBernoulli = require('./figures/lemniscate-of-bernoulli');
const Point = require('./point');
const CanvasManager = require('./canvas-manager');
const CanvasManager2 = require('./canvas-manager2');
const App = require('./app');
const Affine = require('./affine');
const Projective = require('./projective');
const Rotation = require('./rotation');

const width = 800;
const height = 800;
const canvas = document.getElementById('myCanvas');
canvas.setAttribute('width', String(width));
canvas.setAttribute('height', String(height));

const $lab1 = $('div#lab1');
const $lab2 = $('div#lab2');

$lab2.hide();

const $form1 = $('div#lab1 #my-form');
const $form2 = $('div#lab2 #my-form2');
const $errors = $('div#errors');
const $btnTestData = $('button#test-data');
const $l2btnTestData = $('button#l2-test-data');
const $sizes = $('#sizes');
const $select = $('select#lab');

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

    $form1.find('input').val(function () {
        return testData[this.id];
    })
});

$l2btnTestData.click(() => {
    const testData = {
        l2xCenter: 350,
        l2yCenter: 350,
        c: 150
    };

    $form2.find('input').val(function () {
        return testData[this.id];
    })
});

$select.on('change', function (e) {
    console.log(e.target.value);

    switch(e.target.value) {
        case 'lab1':
            $lab1.show();
            $lab2.hide();
            break;
        case 'lab2':
            $lab1.hide();
            $lab2.show();
            break;
    }
});

$form1.submit(e => {
    const data = $form1.serializeArray()
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
        let rotation = null;

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

        if (data.rotationAngle) {
            rotation = new Rotation(data.rotationAngle, data.xCenter, data.yCenter);
        }

        const app = new App(canvasManager,
            affine,
            projective,
            rotation
            // new Affine(0.5, 0, 0.5, 0.5),
            // new Projective(new Point(1000, 3), new Point(6, 900), 2.5, 1.5, 500)
        );

        app.drawFigure(figure);
    } catch (e) {
        $errors.show();
        $errors.append(`<h3>Oops we'ves got an error: <strong>${e.message}</strong></h3>`);
    }
});

$form2.submit(e => {
    const data = $form2.serializeArray()
        .reduce((obj, {name, value}) => Object.assign(obj, {
            [name]: +value
        }), {});
    e.preventDefault();
    $errors.empty();
    $errors.hide();

    try {
        const lemniscateOfBernoulli = LemniscateOfBernoulli.Builder
            .center(new Point(data.xCenter, data.yCenter))
            .c(data.c)
            .build();

        const canvasManager2 = new CanvasManager2(canvas);
        canvasManager2.clearCanvas();

        let rotation = null;

        if (data.angleRotation) {
            rotation = new Rotation(data.angleRotation, data.xCenter, data.yCenter);
        }

        const app = new App(canvasManager2, null, null, rotation);

        app.drawLemniscateOfBernoulli(lemniscateOfBernoulli);
    } catch (e) {
        $errors.show();
        $errors.append(`<h3>Oops we'ves got an error: <strong>${e.message}</strong></h3>`);
    }
});

