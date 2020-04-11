// CANVAS
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth - 100;
canvas.height = 600;
let animateId;

// KNIGHT
let knightImage = new Image();
knightImage.src = './Sprites/Knight.png';

let knightObj = {
	x: canvas.width / 2,
	y: canvas.height - 150,
	w: 94.5,
	h: 95.5,
	health: 100,
	str: 25
};

function drawKnight() {
	ctx.drawImage(knightImage, 10, 127.4, 63, 63.7, knightObj.x, knightObj.y, knightObj.w, knightObj.h);
}

// MOVEMENT KEYS
document.onkeydown = function(e) {
    if(e.key === 'ArrowUp' && knightObj.y > 410) {
        knightObj.y -= 15;
    }
    if(e.key === 'ArrowLeft' && knightObj.x > 0) {
        knightObj.x -= 15;
    }
    if(e.key === 'ArrowDown' && knightObj.y < 500) {
        knightObj.y += 15;
    }
    if(e.key === 'ArrowRight' && knightObj.x < 870) {
        knightObj.x += 15;
    }
}

//GOBLIN
let goblinImage = new Image();
goblinImage.src = './Sprites/Goblin.png';

let goblins = [];
setInterval(function() {
	let goblinObj = {
		x: -1,
		y: (Math.random()*100) + 400,
		w: 90.5,
		h: 91.5,
		health: 50,
		str: 5
	};
	if (goblins.length < 10) {
		goblins.push(goblinObj);
	}
}, 3000);

function drawGoblin() {
	goblins.forEach((goblin) => {
		ctx.drawImage(goblinImage, 10, 127.4, 63, 63.7, goblin.x++, goblin.y, goblin.w, goblin.h);
	});
}


// ANIMATE FUNCTION
function animate() {
	animateId = window.requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height); //Clears Everything

	drawKnight();
	drawGoblin();
}

window.requestAnimationFrame(animate);
