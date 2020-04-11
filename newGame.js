// CANVAS
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
canvas.style.backgroundImage = 'url(./Img/stonewallbg.jpg)'
canvas.style.backgroundRepeat = 'no-repeat'
canvas.style.backgroundSize = 'contain';
let animateId;


// POTION (HEALING)
let potionImage = new Image();
potionImage.src = './Sprites/Potion.png';

let potions = [];
setInterval(function() {
	let potionObj = {
		x: Math.random()*700,
		y: -1,
		w: 50,
		h: 50,
		health:25
	}
	if (potions.length < 10) {
		potions.push(potionObj);
	}
}, 8000)


function drawPotion() {
	potions.forEach((potion, index) => {
		ctx.drawImage(potionImage, potion.x, potion.y++, potion.w, potion.h);
		detectPotionCollision(potion, index)
	});
}

//COLLISION ON POTION
function detectPotionCollision(pot, index) { //detect collision between potion and knight
	if (pot.x < knightObj.x + knightObj.w &&
		pot.x + pot.w > knightObj.x &&
		pot.y < knightObj.y + knightObj.h &&
		pot.y + pot.h > knightObj.y) {
		  console.log('POTION!')
		  knightObj.health += pot.health
		  potions.splice(index, 1)
	  }
}


// KNIGHT
let knightImage = new Image();
knightImage.src = './Sprites/Knight.png';

let knightObj = {
	x: canvas.width / 2,
	y: canvas.height - 150,
	w: 64.5,
	h: 65.5,
	health: 100,
	str: 25
};

function drawKnight() {
	ctx.drawImage(knightImage, 10, 127.4, 63, 63.7, knightObj.x, knightObj.y, knightObj.w, knightObj.h);
}

// MOVEMENT KEYS
document.onkeydown = function(e) {
    if(e.key === 'ArrowUp' && knightObj.y > 360) {
        knightObj.y -= 15;
    }
    if(e.key === 'ArrowLeft' && knightObj.x > 0) {
        knightObj.x -= 15;
    }
    if(e.key === 'ArrowDown' && knightObj.y < 520) {
        knightObj.y += 15;
    }
    if(e.key === 'ArrowRight' && knightObj.x < 700) {
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
		y: (Math.random()*110) + 440,
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
		detectGoblinCollision(goblin, index);
	});
}

//COLLISION ON GOBLIN
function detectGoblinCollision(gob, index) { //detect collision between goblins and knight
	if (gob.x < knightObj.x + knightObj.w &&
		gob.x + gob.w > knightObj.x &&
		gob.y < knightObj.y + knightObj.h &&
		gob.y + gob.h > knightObj.y) {
		  console.log('GOBLIN!')
		  knightObj.health -= gob.str
		  goblins.splice(index, 1)
	  }
}


// ANIMATE FUNCTION
function animate() {
	animateId = window.requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height); //Clears Everything

	
	drawKnight();
	drawGoblin();
	drawPotion();
}

window.requestAnimationFrame(animate);
