'use strict';
const $ = require('jquery');
const Figure = require('./figures/figure');
const Point = require('./point');
const CanvasManager = require('./canvas-manager');
const App = require('./app');

const width = 800;
const height = 800;
const canvas = document.getElementById('myCanvas');
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

const $form = $('#my-form');
const $errors = $('div#errors');
const $btnTestData = $('button#test-data');

window.onload = () => {
    $errors.hide();
};

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
    const data = $form.serializeArray().reduce((obj, {name, value}) => Object.assign(obj, {
            [name]: +value
    }), {});
    console.log(data);
    e.preventDefault();

    const canvasManager = new CanvasManager(canvas);

    try {
        data.center = new Point(data.xCenter, data.yCenter);

        const figure = new Figure(data);

        const app = new App(canvasManager);

        app.drawFigure(figure);
    } catch (e) {
        $errors.show();
        $errors.append(`<h3>Oops we've got an error: ${e.message}</h3>`);
    }
});
