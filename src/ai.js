'use strcit';

const store = require('./store');
const matrix = store.matrix;
const log = console.log;

module.exports = {

    counter: 0,

    checkStore: function() {
        this.result();
    },


    result: function() {
        let emptyCells = this.emptyCells();
        // let user = this.winner(matrix, 'red');
        // let bot = this.winner(matrix, 'green');

        // log('user: ', user);
        // log('bot: ', bot);

    }
};