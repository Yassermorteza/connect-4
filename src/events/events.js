'use strict';

const store = require('../store');
const Howel = require('howler');
const board = require('../board/board');


let clickSound = new Howl({
    src: ['sounds/click.mp3']
});

module.exports = {

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
            let colIndex ;
            let x ;
            if (store.onclick) {
                if(store.index){
                    if(store.botCol !== ''){
                        colIndex = store.botCol;
                        x = colIndex * 70;
                    }else{
                        colIndex = Math.floor(Math.random() * Math.floor(7)); 
                        x = colIndex * 70;
                    }
                }else{
                    colIndex = this.colIndex;
                    x = this.transform.position.x;
                };

                let i = self.findIndex(colIndex, store.countCol);

                while (i < 0) {
                    store.row++;
                    store.countCol--;
                    i = self.findIndex(colIndex, store.countCol);
                }

                if (~i && store.cellIndex[i]) {
                    store.matrix[store.countCol][colIndex] = store.player.color;
                    store.cellIndex[i] = store.player.color;
                    store.colIndex = colIndex;
                    store.player.position.set(x, 350 - (store.row * 70));
                    clickSound.play();
                    require('../ai').checkStore();
                    let empty = require('../ai').emptyCells().length;
                    if(empty < 1){
                        return board.showMessage();
                    };

                    if (store.player.color === 'red') {
                        if(self.checkWinner(colIndex, store.countCol, store.user)) return board.showMessage();
                    } else {
                        if(self.checkWinner(colIndex, store.countCol, store.bot)) return board.showMessage();
                    } 

                    board.playerTurn();
                    store.row = 0;
                    store.countCol = 5;
                    store.index = false;
                }
            };
        }
    },

    checkWinner: function (col, row, player) {
        return store.win.verticalHorzintal(col, row, player) || 
                store.win.diagonal(col, row, player);
    }
}
