'use strict';

let data = {
    rows: [],
    cols: [],
    diagonalA: [],
    diagonalB: [],
    diagonalC: [],
    matrix: []
};

let user = JSON.parse(JSON.stringify(data));
let bot = JSON.parse(JSON.stringify(data));

module.exports = {
    user: user,
    bot: bot,
    event: {},
    countCol: 5,
    row: 0,
    cellIndex: [],
    palyer: {},
    turn: true,
    onclick: true,
    message: {},
    color: '',
    botCol: '',
    layer: {},
    matrix: new Array(),
    colIndex: '',
    win: {}
};