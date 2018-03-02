let data = {
			    rows: [],
			    cols: [],
			    diagonalA: [],
			    diagonalB: [],
			    diagonalC: [],
			    counter: 0
			};

let user = JSON.parse(JSON.stringify(data));
let bot = JSON.parse(JSON.stringify(data));

module.exports= {
	user: user,
	bot: bot,
	event: {},
	data: data,
	countCol : 5,
    row : 0,
    cellIndex: [],
	palyer:{},
	turn: true,
    onclick: true,
    message:{},
};

