'use strict';

require("babel-polyfill");
const PIXI = require('pixi.js');
const board = require('./board/board');
const store = require('./store');

let w, h, x = 0;

let size = [window.innerWidth - 100, window.innerHeight - 80];
let ratio = window.devicePixelRatio * 2;
let renderer = PIXI.autoDetectRenderer(size[0], size[1], {
    antialiasing: false,
    transparent: false,
    resolution: ratio,
    autoResize: true,
    backgroundColor: 0xFFFFFF
});

document.body.appendChild(renderer.view);

function resize() {
    if (window.innerWidth / window.innerHeight >= ratio) {
        w = window.innerHeight * ratio;
        h = window.innerHeight;
    } else {
        w = window.innerWidth;
        h = window.innerWidth / ratio;
    }
    renderer.view.style.width = w + 'px';
    renderer.view.style.height = h + 'px';
};

resize();
window.onresize = resize;

let container = board.container();

let layer = new PIXI.Graphics();

layer.lineStyle(2, 0x0000FF, 1);
layer.beginFill(0xDFDFDF, 1);
layer.drawRect(0, 0, 490, 420);
layer.interactive = true;
layer.on('mousemove', moveRightLeft);
container.addChild(layer);

store.layer = layer;

function moveRightLeft() {
    x = Math.round(renderer.plugins.interaction.mouse.global.x) - 380;
    store.player.position.set(x, -70);
};

function animate() {
    renderer.render(container);
    requestAnimationFrame(animate);
};

animate();
board.board();
board.playerTurn();