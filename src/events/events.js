const store = require('../store');
const Howel = require('howler');
const board = require('../board/board');

let clickSound = new Howl({
    src: ['sounds/click.mp3']
});

module.exports =(win)=> {
    return {

        findIndex: function (colIndex, count) {
            let item = count + '' + colIndex;
            if (store.countCol < 0) {
                store.countCol = 5;
                store.row = 0;
                return;
            } else {         
                return store.cellIndex.indexOf(item);
            }
        },

        dropBall: function (){
            let self = this;
            return function (){
                if (store.onclick) {
                    let i = self.findIndex(this.colIndex, store.countCol);
                    clickSound.play();

                    while (i < 0) {
                        store.row++;
                        store.countCol--;
                        i = self.findIndex(this.colIndex, store.countCol);
                    }

                    if (~i && store.cellIndex[i]) {
                        self.checkWinner(this.colIndex, store.countCol);
                        store.cellIndex[i] = store.player.color;
                        let x = this.transform.position.x;
                        store.player.position.set(x, 350 - (store.row * 70));
                        board.playerTurn();
                        store.row = 0;
                        store.countCol = 5;
                    }
                };
            }
        },

        checkWinner: function (col, row) {
            if (store.player.color === 'red') {
                win.verticalHorzintal(col, row, store.user.rows, store.user.cols);
                win.diagonal(col, row, store.user.diagonalA, store.user.diagonalB, store.user.diagonalC);
            } else {
                win.verticalHorzintal(col, row, store.bot.rows, store.bot.cols);
                win.diagonal(col, row, store.bot.diagonalA, store.bot.diagonalB, store.bot.diagonalC);
            }
        }
    }
}
