'use strict';

const PIXI = require('pixi.js');
const Howel = require('howler');
const store = require('../store');
const ai = require('../ai');

const texture = PIXI.Texture.fromImage('images/board.png');
const redBall = PIXI.Texture.fromImage('images/red.png');
const greenBall = PIXI.Texture.fromImage('images/green.png');

const victorySound = new Howl({src: ['sounds/victory.mp3']});

let container = new PIXI.Container();
container.hitArea = new PIXI.Rectangle(0, 0, 480, 450);
container.position.set(350, 150);

let data = {
		    rows: [],
		    cols: [],
		    diagonalA: [],
		    diagonalB: [],
		    diagonalC: [],
            matrix: []
			};

module.exports = {
		
	  	boardcell: [],
        ball: {},
        color: '',
        state: '',

	    board: function(){
		    for (let i = 0; i <= 5; i++) {
                store.matrix[i] = [];
		        for (let j = 0; j <= 6; j++) {
                    store.matrix[i].push(0);
                    store.bot.matrix[i] = [];
                    store.user.matrix[i] = [];   
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
		            this.boardcell.on('click', store.event.dropBall());
		            container.addChild(this.boardcell);
		        }
		    }
		},

		playerTurn: function(){
            if (store.turn) {
                this.ball = redBall;
                this.color = 'red';
                store.turn = false;
            } else {
                this.ball = greenBall;
                this.color = 'green';
                store.turn = true;
            }
            store.color = this.color;
            store.player = new PIXI.Sprite(this.ball);
            store.player.position.set(0, -70);
            store.player.width = 70;
            store.player.height = 70;
            store.player.color = this.color;
            container.addChild(store.player);
        },

        showMessage: function(){
            
            let empty = ai.emptyCells().length;
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

            store.message = new PIXI.Text(`${this.state}!!! Play again.`, style);
            store.message.position.set(60, 150);
            container.addChild(store.message);
            store.message.interactive = true;
            store.message.cursor = "pointer";
            store.message.on('click',this.reset());
            store.layer.interactive = false;
            store.onclick = false;
            victorySound.play();

        },

        reset: function() {

        	let self =this;

        	return function(){
        		
	            store.onclick = true;
	            store.turn = true;
	            store.user = JSON.parse(JSON.stringify(data));
	            store.bot = JSON.parse(JSON.stringify(data));
	            store.cellIndex = [];
	            store.countCol = 5;
	            store.row = 0;
	            container.removeChild(store.message);
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

        container: ()=> container
};
