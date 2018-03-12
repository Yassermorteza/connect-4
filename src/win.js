'use strict';

const store = require('./store');
const board = require('./board/board');

module.exports = {

    counter: 0,

    sequence: function(value) {
        let array = value.sort();
        for (let i = 0; i < array.length; i++) {
            if (array[i] + 1 === array[i + 1]) {
                this.counter++;
                if (this.counter >= 3) {
                    this.counter = 0;
                    return true;
                }
            } else {
                this.counter = 0;
            }
        }

        return false;
    },

    verticalHorzintal: function(cel, row, player) {

        if (!player.rows[cel]) {
            player.rows[cel] = [];
            player.rows[cel].push(row);
        } else {
            player.rows[cel].push(row);
            if (player.rows[cel].length >= 4) {
                return this.sequence(player.rows[cel]);
            };
        };

        if (!player.cols[row]) {
            player.cols[row] = [];
            player.cols[row].push(cel);
        } else {
            player.cols[row].push(cel);
            if (player.cols[row].length >= 4) {
                return this.sequence(player.cols[row]);
            };
        };

    },

    diagonal: function(cel, row, player) {

        let sum = cel + row;
        let num = Number(row + '' + cel);
        let length = player.diagonalA.length;

        if (length === 0) {
            player.diagonalA[0] = [];
            player.diagonalA[0].push(num);
        } else {
            for (let i = 0; i < length; i++) {
                if (player.diagonalA[i]) {
                    for (let j = 0; j < player.diagonalA[i].length; j++) {
                        if (player.diagonalA[i][j] - 11 === num || player.diagonalA[i][j] + 11 === num) {
                            player.diagonalA[i].push(num);
                            if (player.diagonalA[i].length === 4) {
                                return true;
                            }
                        } else {
                            player.diagonalA[length + 1] = [];
                            player.diagonalA[length + 1].push(num);
                        };
                    };
                };
            };
        };

        if (sum >= 3 && sum <= 8) {
            if (!player.diagonalB[sum]) {
                player.diagonalB[sum] = [];
                player.diagonalB[sum].push(sum);
                player.diagonalC[sum] = [];
                player.diagonalC[sum].push(row);
            } else {
                player.diagonalB[sum].push(sum);
                player.diagonalC[sum].push(row);
                if (player.diagonalB[sum].length >= 4 && this.sequence(player.diagonalC[sum])) {
                    return true;
                };
            };
        };
    }
};