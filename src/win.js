const store = require('./store');
const board = require('./board/board');

module.exports ={

    counter: 0,

    sequence: function (value){
        let array = value.sort();
        for (let i = 0; i < array.length; i++) {
            if (array[i] + 1 === array[i + 1]) {
                if (store.player.color === 'red') {
                    store.user.counter++;
                    if (store.user.counter >= 3) {
                        store.user.counter = 0;
                        board.showMessage();
                        return true;
                    }
                } else {
                    store.bot.counter++;
                    if (store.bot.counter >= 3) {
                        store.bot.counter = 0;
                        board.showMessage();
                        return true;
                    }
                }
            } else {
                store.user.counter = 0;
                store.bot.counter = 0;
                return false;
            }
        }
    },

    sequence2: function (value){
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
                return false;
            }
        }
    },

    verticalHorzintal: function (cel, row, rows, cels){
        if (!rows[cel]) {
            rows[cel] = [];
            rows[cel].push(row);
        } else {
            rows[cel].push(row);
            if (rows[cel].length >= 4) {
                this.sequence(rows[cel], store.user, store.bot);
            };
        };

        if (!cels[row]) {
            cels[row] = [];
            cels[row].push(cel);
        } else {
            cels[row].push(cel);
            if (cels[row].length >= 4) {
                this.sequence(cels[row], store.user, store.bot);
            };
        };

    },

    diagonal: function (cel, row, diagonalA, diagonalB, diagonalC){

        let sum = cel + row;
        let num = Number(row + '' + cel);
        let length = diagonalA.length;

        if (length === 0) {
            diagonalA[0] = [];
            diagonalA[0].push(num);
        } else {
            for (let i = 0; i < length; i++) {
                if (diagonalA[i]) {
                    for (let j = 0; j < diagonalA[i].length; j++) {
                        if (diagonalA[i][j] - 11 === num || diagonalA[i][j] + 11 === num) {
                            diagonalA[i].push(num);
                            if (diagonalA[i].length === 4) {
                                return board.showMessage();
                            }
                        } else {
                            diagonalA[length + 1] = [];
                            diagonalA[length + 1].push(num);
                        };
                    };
                };
            };
        };

        if (sum >= 3 && sum <= 8) {
            if (!diagonalB[sum]) {
                diagonalB[sum] = [];
                diagonalB[sum].push(sum);
                diagonalC[sum] = [];
                diagonalC[sum].push(row);
            } else {
                diagonalB[sum].push(sum);
                diagonalC[sum].push(row);
                if (diagonalB[sum].length >= 4 && this.sequence2(diagonalC[sum])) {
                    return board.showMessage();
                };
            };
        };
    }
};
    
