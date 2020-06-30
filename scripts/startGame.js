let score  = 0;
let record = 0;

var map = [];

let cellGray = `
	<div id="cell"></div>
`;


let board = document.getElementById('windowPlay');
for (var i = 0; i < 16; i++) {
	board.innerHTML = board.innerHTML + cellGray;
}

function addCell(integer) {
	let cellX = Math.floor(Math.random()*4);
	let cellY = Math.floor(Math.random()*4);
	while (map[cellY][cellX]>0) {
		cellX = Math.floor(Math.random()*4);
		cellY = Math.floor(Math.random()*4);
	}
	map[cellY][cellX] = integer;

	let cellPlay = 	`
		<div id="${cellX}:${cellY}" class="CellPlay c${integer}">
			<p>
				${integer}
			</p>
		</div>
	`;
	board.innerHTML = board.innerHTML + cellPlay;
}

function drawMap() {
	for (var y = 0; y < map.length; y++) {
		for (var x = 0; x < map[y].length; x++) {
			if (map[y][x]>0) {
				let cell = document.getElementById(`${x}:${y}`);
				cell.style.left = `${x*110+x*15}px`;
				cell.style.top  = `${y*110+y*15}px`;

			}
		}
	}
}




function clearMap() {
	for (var i = 0; i <= 3; i++) {
		map[i] = [0,0,0,0]
	}
}
clearMap()

function rCell() {
	let random = Math.ceil(Math.random()*2)*2;
	score = score+random;
	addCell(random);
}
function arrowPressed(code) {
	let newX = 0;
	let newY = 0;
	switch (code.keyCode) {
		case 37:
			newX = -1;
			break;
		case 38:
			newY = -1;
			break;
		case 39:
            newX = 1;
            break;
        case 40:
        	newY = 1;
        	break;
	}
	moveCells(newX,newY);
}
function moveCells(vecX,vecY) {
	//alert(`${vecX}:${vecY}`);
	for (var y = 0; y < map.length; y++) {
		for (var x = 0; x < map[y].length; x++) {
			let cell = map[y][x];
			if (cell > 0) {
				if (map[y+vecY][x+vecX]==0) {
					let id = `${x}:${y}`;
					let to = `${x+vecX}:${y+vecY}`;
					map[y+vecY][x+vecX] = cell;
					map[y][x] = 0;

					changeId(id,to);
					drawMap();
					//alert(`${x}:${y} = ${cell}____${map[y+vecY][x+vecX]}`);
				} else {
					if (map[y+vecY][x+vecX]==cell) {
						map[y+vecY][x+vecX]=cell*2;
						map[y][x]=0;
						let int = map[y+vecY][x+vecX];
						document.getElementById(`${x}:${y}`).remove();
						document.getElementById(`${x+vecX}:${y+vecY}`).remove();
						createCell(x+vecX,y+vecY,int);
						drawMap();
						score = score+int;
					}
				}
			}
		}
	}
}

function createCell(x,y,int) {
	map[y][x] = int;

	let cellPlay = 	`
		<div id="${x}:${y}" class="CellPlay c${int}">
			<p>
				${int}
			</p>
		</div>
	`;
	board.innerHTML = board.innerHTML + cellPlay;
}
function changeId(id,to) {
	let elemTo = document.getElementById(id);
	elemTo.id = to;
}

function updateScore() {
	let scoVal = document.getElementById("scoreValue");
	let recVal = document.getElementById("recordValue");
	scoVal.innerHTML = score;
	recVal.innerHTML = record;
}

rCell();
rCell();
drawMap();

document.addEventListener('keydown',gameCicleFunc);