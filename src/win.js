'use strict';

module.exports = {

    counter: 0,

    sequence: function(array) {
        for (let i = 0; i < array.length; ++i) {
            if (array[i]) {
                for (let j = 0; j < array[i].length; ++j) {
                    if (array[i][j] + 1 === array[i][j + 1]) {
                        this.counter++;
                        if (this.counter >= 3) {
                            this.counter = 0;
                            return true;
                        }
                    } else {
                        this.counter = 0;
                    };
                }
            }
        };

        return false;
    },

    diagonal: function(array) {

        for (let i = 0; i < array.length; ++i) {

            for (let j = 0; j < array[i].length; ++j) {
                let r = 1;
                let c = 0;
                let r1 = 1;
                let c1 = 0;
                //Southeast Northwest
                while (j + r < 7 && i + r < 6 && array[i + c][j + c] + 1 === array[i + r][j + r]) {
                    r++;
                    c++;
                    if (c >= 3) {
                        return true
                    };
                };
                // Southwest NorthEast
                while (j - r1 >= 0 && i + r1 < 6 && array[i + c1][j - c1] - 1 === array[i + r1][j - r1]) {
                    r1++;
                    c1++;
                    if (c1 >= 3) {
                        return true
                    };
                };
            };
        };

        return false;
    },

    winner: function(matrix, player) {
        let horizontal = [];
        let vertical = [];

        for (let i = 0; i < matrix.length; i++) {
            horizontal[i] = [];
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === player) {
                    horizontal[i][j] = j;
                    if (!vertical[j]) {
                        vertical[j] = [];
                        vertical[j].push(i);
                    } else {
                        vertical[j].push(i);
                    };
                };
            };
        };

        return this.sequence(horizontal) || this.sequence(vertical) || this.diagonal(horizontal);
    },


};