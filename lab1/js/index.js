'use strict';
const $ = require('jquery');
const Figure = require('./figures/figure');
const Point = require('./point');
const CanvasManager = require('./canvas-manager');
const App = require('./app');
const Affine = require('./affine');

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
const $showImgBtn = $('button#show-img');

let showImg = true;

window.onload = () => {
    $errors.hide();
};

$showImgBtn.click(() => {
    showImg = !showImg;
    $img.toggle(showImg);
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

    canvasManager.lineWidth = 1;
    canvasManager.drawCoordinates(width, height);

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

        const app = new App(canvasManager, new Affine(0.5, 0.5, 0, 1));

        app.drawFigure(figure);
    } catch (e) {
        $errors.show();
        $errors.append(`<h3>Oops we'ves got an error: <strong>${e.message}</strong></h3>`);
    }
});
