// CANVAS
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
canvas.style.backgroundImage = 'url(./Img/stonewallbg.jpg)';
canvas.style.backgroundRepeat = 'no-repeat';
canvas.style.backgroundSize = 'contain';
let animateId;

let castleHealth = 500;


// POTION (HEALING)
let potionImage = new Image();
potionImage.src = './Sprites/Potion.png';

let potions = [];
setInterval(function() {
	let potionObj = {
		x: Math.random() * 700,
		y: -1,
		w: 18,
		h: 18,
		health: 25
	};
	if (potions.length < 10) {
		potions.push(potionObj);
	}
}, 8000);

function drawPotion() {
	potions.forEach((potion, index) => {
		ctx.drawImage(potionImage, potion.x, potion.y++, potion.w, potion.h);
		detectPotionCollision(potion, index);
	});
}

//COLLISION ON POTION
function detectPotionCollision(pot, index) {
	//detect collision between potion and knight
	if (
		pot.x < archerObj.x + archerObj.w &&
		pot.x + pot.w > archerObj.x &&
		pot.y < archerObj.y + archerObj.h &&
		pot.y + pot.h > archerObj.y
	) {
		console.log('POTION!');
        archerObj.health += pot.health;
        document.querySelector('.health').innerText = `Health : ${archerObj.health}`
		potions.splice(index, 1);
	}
}

// Archer
let archerImage = new Image();
archerImage.src = './Sprites/Archer.png';

let archerObj = {
	x: canvas.width / 2,
	y: canvas.height - 150,
	w: 64.5,
	h: 65.5,
	health: 100,
	str: 25,
	arrowAmount: 50
};

function drawArcher() {
	ctx.drawImage(archerImage, 10, 127.4, 63, 63.7, archerObj.x, archerObj.y, archerObj.w, archerObj.h);
}

// MOVEMENT KEYS
document.onkeydown = function(e) {
	if (e.key === 'ArrowUp' && archerObj.y > 360) {
		archerObj.y -= 15;
	}
	if (e.key === 'ArrowLeft' && archerObj.x > 0) {
		archerObj.x -= 15;
	}
	if (e.key === 'ArrowDown' && archerObj.y < 520) {
		archerObj.y += 15;
	}
	if (e.key === 'ArrowRight' && archerObj.x < 700) {
		archerObj.x += 15;
	}
	if (e.key === ' ') {
		shoot();
	}
};

//GOBLIN
let goblinImage = new Image();
goblinImage.src = './Sprites/Goblin.png';

let goblins = [];
setInterval(function() {
	let goblinObj = {
		x: -1,
		y: Math.random() * 110 + 440,
		w: 50.5,
		h: 51.5,
		health: 50,
		str: 10
	};
	if (goblins.length < 10) {
		goblins.push(goblinObj);
	}
}, 4000);


function drawGoblin() {
	goblins.forEach((goblin, index) => {
		ctx.drawImage(goblinImage, 10, 127.4, 63, 63.7, goblin.x++, goblin.y, goblin.w, goblin.h);
		detectGoblinCollision(goblin, index); //collision with archer
		detectArrowGoblinCollision(goblin, index); // collision with arrow
	});
}

//COLLISION ON GOBLIN
function detectGoblinCollision(gob, index) {
	//detect collision between goblins and knight
	if (
		gob.x < archerObj.x + archerObj.w &&
		gob.x + gob.w > archerObj.x &&
		gob.y < archerObj.y + archerObj.h &&
		gob.y + gob.h > archerObj.y
	) {
		console.log('GOBLIN HURT ME!');
        archerObj.health -= gob.str;
        document.querySelector('.health').innerText = `Health : ${archerObj.health}`
        // if(archerObj.health <= 0) {
        //     console.log('GAME OVER YOU DIED!')
        //     window.cancelAnimationFrame(animateId)
        // }
    }
    if (gob.x > canvas.width) {
        console.log('Goblin Hurt People!')
        goblins.splice(index, 1)
        castleHealth -= gob.str
        document.querySelector('.castle').innerText = `Castle Population : ${castleHealth}`
    }
}

// ARROW CREATION
let arrows = [];
function shoot() {
	if (archerObj.arrowAmount === 0) {
		console.log('out of arrows');
		return;
	} else {
		archerObj.arrowAmount--;
        document.querySelector('.arrows').innerText = `Arrows : ${archerObj.arrowAmount}`

		let arrow = {
			x: archerObj.x,
			y: archerObj.y + (archerObj.h / 2 + 10),
			w: 15,
			h: 2
		};
		arrows.push(arrow);
	}
}

function drawArrows() {
	ctx.fillStyle = 'black';
	arrows.forEach((arrow) => {
		ctx.fillRect((arrow.x -= 15), arrow.y, arrow.w, arrow.h);
	});
}

// EXTRA ARROW FALLING
let arrowImage = new Image();
arrowImage.src = './Sprites/Arrow.png';

let fallingArrows = [];
setInterval(function() {
	let arrowObj = {
		x: Math.random() * 700,
		y: -1,
		w: 25,
		h: 18,
		amount: 15
	};
	fallingArrows.push(arrowObj);
}, 10000);

function drawFallingArrows() {
	fallingArrows.forEach((arrow, index) => {
		ctx.drawImage(arrowImage, arrow.x, arrow.y++, arrow.w, arrow.h);
		detectArrowCollision(arrow, index);
	});
}

//COLLISION ON ARROW W/ ARCHER
function detectArrowCollision(arrow, index) {
	//detect collision between arrow and archer
	if (
		arrow.x < archerObj.x + archerObj.w &&
		arrow.x + arrow.w > archerObj.x &&
		arrow.y < archerObj.y + archerObj.h &&
		arrow.y + arrow.h > archerObj.y
	) {
		console.log('MORE ARROWS!');
        archerObj.arrowAmount += arrow.amount;
        document.querySelector('.arrows').innerText = `Arrows : ${archerObj.arrowAmount}`
		fallingArrows.splice(index, 1);
	}
}

//COLLISION ON ARROW AND GOBLIN
function detectArrowGoblinCollision(goblin, index) {
	arrows.forEach((arrow, index) => {
		if (
			goblin.x < arrow.x + arrow.w &&
			goblin.x + goblin.w > arrow.x &&
			goblin.y < arrow.y + arrow.h &&
			goblin.y + goblin.h > arrow.y
		) {
			console.log('arrow hit goblin');
			goblin.health -= archerObj.str;
			arrows.splice(index, 1);
			if (goblin.health <= 0) {
				goblins.splice(index, 1);
			}
		}
	});
}

// ANIMATE FUNCTION
function animate() {
	animateId = window.requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height); //Clears Everything

	drawArcher();
	drawGoblin();
	drawPotion();
	drawArrows();
	drawFallingArrows();
}

canvas.onclick = (function() { // CLICK ON CANVAS WINDOW TO START
    window.requestAnimationFrame(animate);
})

