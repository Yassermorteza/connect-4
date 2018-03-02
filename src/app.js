const PIXI = require('pixi.js');
const board = require('./board/board');
const events = require('./events/events');
const store = require('./store');
const win = require('./win');

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

let event = events(win);
store.event = event;
console.log(store);
let container = board.container();

let layer = new PIXI.Graphics();

layer.lineStyle(2, 0x0000FF, 1);
layer.beginFill(0xDFDFDF, 1);
layer.drawRect(0, 0, 490, 420);
layer.interactive = true;
layer.on('mousemove', moveRightLeft);
container.addChild(layer);

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

// let container = stage.container();
// container.hitArea = new Rectangle(0, 0, 480, 450);
// container.position.set(350, 150);


// let texture = Texture.fromImage('images/board.png');

// let clickSound = new Howl({
//     src: ['sounds/click.mp3']
// });

// let boardcoll;
// let records = [];
// const events = event(records);

// function board() {
//     for (let j = 0; j <= 5; j++) {
//         for (let i = 0; i <= 6; i++) {
//             records.push(j + '' + i);
//             let x = i * 70;
//             let y = j * 70;
//             let rectangle = new Rectangle(0, 0, 100, 100);
//             texture.frame = rectangle;
//             boardcoll = new Sprite(texture);
//             boardcoll.width = 70;
//             boardcoll.height = 70;
//             boardcoll.colIndex = i;
//             boardcoll.rowIndex = j;
//             boardcoll.position.set(x, y);
//             boardcoll.interactive = true;
//             boardcoll.on('click', events.dropBall());
//             container.addChild(boardcoll);
//         }
//     }
// }

// let countCol = 5;
// let row = 0;

// function indexOf(colIndex, count) {
//     let item = count + '' + colIndex;
//     if (countCol < 0) {
//         countCol = 5;
//         row = 0;
//         return;
//     } else {
//         return records.indexOf(item);
//     }
// }

// function dropBall() {
//     if (onclick) {
//         let i = indexOf(this.colIndex, countCol);
//         clickSound.play();

//         while (i < 0) {
//             row++;
//             countCol--;
//             i = indexOf(this.colIndex, countCol);
//         }

//         if (~i && records[i]) {
//             checkWinner(this.colIndex, countCol);
//             records[i] = message.player.color;
//             let x = this.transform.position.x;
//             message.player.position.set(x, 350 - (row * 70));
//             message.playerTurn(container);
//             row = 0;
//             countCol = 5;
//         }
//     };
// };


// let store = {
//     rows: [],
//     cols: [],
//     diagonalA: [],
//     diagonalB: [],
//     diagonalC: [],
//     counter: 0
// };

// let user = JSON.parse(JSON.stringify(store));
// let bot = JSON.parse(JSON.stringify(store));

// function checkWinner(col, row) {
//     if (message.player.color === 'red') {
//         win.verticalHorzintal(col, row, user.rows, user.cols, user, bot);
//         win.diagonal(col, row, user.diagonalA, user.diagonalB, user.diagonalC);
//     } else {
//         win.verticalHorzintal(col, row, bot.rows, bot.cols, user, bot);
//         win.diagonal(col, row, bot.diagonalA, bot.diagonalB, bot.diagonalC);
//     }
// };

// function reset() {

//     onclick = true;
//     turn = true;
//     user = JSON.parse(JSON.stringify(store));
//     bot = JSON.parse(JSON.stringify(store));
//     records = [];
//     countCol = 5;
//     row = 0;
//     container.removeChild(message.message);
//     for (let i = 0; i < container.children.length; i++) {
//         if (container.children[i].color) {
//             container.removeChild(container.children[i]);
//         };
//         container.children.forEach(item => {
//             if (item.color) {
//                 container.removeChild(item);
//             };
//         });
//     }

//     message.playerTurn();
//     board();
// };

// function sequence(value) {
//     let array = value.sort();
//     for (let i = 0; i < array.length; i++) {
//         log(user);
//         if (array[i] + 1 === array[i + 1]) {
//             if (player.color === 'red') {
//                 user.counter++;
//                 if (user.counter >= 3) {
//                     user.counter = 0;
//                     showMessage();
//                     return true;
//                 }
//             } else {
//                 bot.counter++;
//                 if (bot.counter >= 3) {
//                     bot.counter = 0;
//                     showMessage();
//                     return true;
//                 }
//             }
//         } else {
//             user.counter = 0;
//             bot.counter = 0;
//             return false;
//         }
//     }
// };

// let counter = 0;

// function sequence2(value) {
//     let array = value.sort();
//     for (let i = 0; i < array.length; i++) {
//         if (array[i] + 1 === array[i + 1]) {
//             counter++;
//             if (counter >= 3) {
//                 counter = 0;
//                 return true;
//             }
//         } else {
//             counter = 0;
//             return false;
//         }
//     }
// }

// function checkVerticalHorzintal(col, row, rows, cols) {

//     if (!rows[col]) {
//         rows[col] = [];
//         rows[col].push(row);
//     } else {
//         rows[col].push(row);
//         if (rows[col].length >= 4) {
//             sequence(rows[col]);
//         };
//     };

//     if (!cols[row]) {
//         cols[row] = [];
//         cols[row].push(col);
//     } else {
//         cols[row].push(col);
//         if (cols[row].length >= 4) {
//             sequence(cols[row]);
//         };
//     };

// };

// function rightLeftDiagonal(col, row, diagonalA, diagonalB, diagonalC) {

//     let sum = col + row;
//     let num = Number(row + '' + col);
//     let length = diagonalA.length;

//     if (length === 0) {
//         diagonalA[0] = [];
//         diagonalA[0].push(num);
//     } else {
//         for (let i = 0; i < length; i++) {
//             if (diagonalA[i]) {
//                 for (let j = 0; j < diagonalA[i].length; j++) {
//                     if (diagonalA[i][j] - 11 === num || diagonalA[i][j] + 11 === num) {
//                         diagonalA[i].push(num);
//                         if (diagonalA[i].length === 4) {
//                             return showMessage();
//                         }
//                     } else {
//                         diagonalA[length + 1] = [];
//                         diagonalA[length + 1].push(num);
//                     };
//                 };
//             };
//         };
//     };

//     if (sum >= 3 && sum <= 8) {
//         if (!diagonalB[sum]) {
//             diagonalB[sum] = [];
//             diagonalB[sum].push(sum);
//             diagonalC[sum] = [];
//             diagonalC[sum].push(row);
//         } else {
//             diagonalB[sum].push(sum);
//             diagonalC[sum].push(row);
//             if (diagonalB[sum].length >= 4 && sequence2(diagonalC[sum])) {
//                 return showMessage();
//             };
//         };
//     };
// };

// let message;

// function showMessage() {

//     let style = new TextStyle({
//         fontFamily: 'Arial',
//         fontSize: 36,
//         fontStyle: 'italic',
//         fontWeight: 'bold',
//         fill: ['#ffffff', '#00ff99'], // gradient
//         stroke: '#4a1850',
//         strokeThickness: 5,
//         dropShadow: true,
//         dropShadowColor: '#000000',
//         dropShadowBlur: 4,
//         dropShadowAngle: Math.PI / 6,
//         dropShadowDistance: 6,
//         wordWrap: true,
//         wordWrapWidth: 440
//     });

//     message = new PIXI.Text('You Win!!! Play again.', style);
//     message.position.set(60, 150);
//     container.addChild(message);
//     message.interactive = true;
//     message.on('click', reset);
//     onclick = false;
//     victorySound.play();

// };