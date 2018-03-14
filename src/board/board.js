'use strict';

const PIXI = require('pixi.js');
const Howel = require('howler');
const store = require('../store');
const win = require('../win');
const ai = require('../ai');

const texture = PIXI.Texture.fromImage('images/board.png');
const redBall = PIXI.Texture.fromImage('images/red.png');
const greenBall = PIXI.Texture.fromImage('images/green.png');

const victorySound = new Howl({src: ['sounds/victory.mp3']});
const loosSound = new Howl({src: ['sounds/loos.mp3']});
const clickSound = new Howl({src: ['sounds/click.mp3']});

const container = new PIXI.Container();
container.hitArea = new PIXI.Rectangle(0, 0, 480, 450);
container.position.set(350, 150);

module.exports = {
		
  	boardcell: [],
    matrix: [],
    message: {},
    ball: {},
    color: '',
    state: '',
    turn: true,

    board: function(){
	    for (let i = 0; i <= 5; i++) {
            this.matrix[i] = [];
	        for (let j = 0; j <= 6; j++) {
                this.matrix[i].push(0);  
	            store.cellIndex.push(i + '' + j);
	            let x = j * 70;
	            let y = i * 70;
	            let rectangle = new PIXI.Rectangle(0, 0, 100, 100);
	            texture.frame = rectangle;
	            this.boardcell = new PIXI.Sprite(texture);
	            this.boardcell.width = 70;
	            this.boardcell.height = 70;
	            this.boardcell.colIndex = j;
	            this.boardcell.rowIndex = i;
	            this.boardcell.position.set(x, y);
	            this.boardcell.interactive = true;
	            this.boardcell.on('click', this.dropBall());
	            container.addChild(this.boardcell);
	        }
	    };
	},

	playerTurn: function(){
        if (this.turn) {
            this.ball = redBall;
            this.color = 'red';
            this.turn = false;
        } else {
            this.ball = greenBall;
            this.color = 'green';
            this.turn = true;
        }
        store.player = new PIXI.Sprite(this.ball);
        store.player.position.set(0, -70);
        store.player.width = 70;
        store.player.height = 70;
        store.player.color = this.color;
        container.addChild(store.player);
    },

    showMessage: function(){
        
        let empty = this.emptyCells().length;
        if(empty < 1){
            this.state = 'No Winner';
        }else{
            this.state = this.color.toUpperCase() + ' win';
        }

        let style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
        });

        this.message = new PIXI.Text(`${this.state}!!! Play again.`, style);
        this.message.position.set(60, 150);
        container.addChild(this.message);
        this.message.interactive = true;
        this.message.cursor = "pointer";
        this.message.on('click',this.reset());
        store.layer.interactive = false;
        store.onclick = false;
        if(this.color === 'red'){    
            victorySound.play();
        }else{
            loosSound.play();
        }

    },

    reset: function() {

    	let self =this;

    	return function(){
    		
            store.onclick = true;
            store.cellIndex = [];
            store.countCol = 5;
            store.row = 0;
            container.removeChild(self.message);
            for (let i = 0; i < container.children.length; i++) {
                if (container.children[i].color) {
                    container.removeChild(container.children[i]);
                };
                container.children.forEach(item => {
                    if (item.color) {
                        container.removeChild(item);
                    };
                });
            }
            store.layer.interactive = true;
            self.playerTurn();
            self.board();
    	}
    },

    findIndex: function (colIndex, count) {
        let item = count + '' + colIndex;
        if (store.countCol < 0) {
            store.countCol = 5;
            store.row = 0;
            return;
        } else {         
            return store.cellIndex.indexOf(item);
        };
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
                    self.matrix[store.countCol][colIndex] = store.player.color;
                    store.cellIndex[i] = store.player.color;
                    store.colIndex = colIndex;
                    store.player.position.set(x, 350 - (store.row * 70));
                    clickSound.play();
                    // require('../ai').checkStore();

                    let empty = self.emptyCells().length;
                    
                    if(win.winner(self.matrix, store.player.color) || empty < 1){
                        return self.showMessage();
                    }

                    self.playerTurn();
                    store.row = 0;
                    store.countCol = 5;
                    store.index = false;
                };
            };
        };
    },

    emptyCells: function() {
        let empty = new Array();
        for (let i = 0; i < this.matrix.length; i++) {
            empty[i] = [];
            for (let j = 0; j < this.matrix[i].length; j++) {

                if (typeof this.matrix[i][j] === 'number') {
                    empty[i].push(j);
                };
            };
        };

        return empty.filter(el => el.length > 0);
    },

    container: ()=> container
};
