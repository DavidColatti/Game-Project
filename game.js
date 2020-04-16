const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const score = document.querySelector('.score');
const backBtn = document.querySelector('.backbutton');
let wonGame;

//LOCAL STORAGE
let currentGameLevel = localStorage.getItem('currentGameLevel');
let mute = localStorage.getItem('mute');

// CANVAS STRUCTURE
canvas.width = 800;
canvas.height = 600;
canvas.style.backgroundImage = 'url(./Img/stonewallbg.jpg)';
canvas.style.backgroundRepeat = 'no-repeat';
canvas.style.backgroundSize = 'contain';
let animateId;
let castleHealth = 200;

//AUDIO
let gameMusic = new Audio();
gameMusic.src = './MP3/gameMusic.mp3';
gameMusic.volume = 0.5;
document.onload = gameMusic.play();

let arrowSound = new Audio();
arrowSound.src = './MP3/arrowSound.mp3';
arrowSound.volume = 0.5;

let orcDeathSound = new Audio();
orcDeathSound.src = './MP3/orcDeath.mp3';
orcDeathSound.volume = 0.2;

let orcLaugh = new Audio();
orcLaugh.src = './MP3/orcLaugh.mp3';
orcLaugh.loop = true;
orcLaugh.volume = 0.5;

let victorySound = new Audio();
victorySound.src = './MP3/victorySound.mp3';
victorySound.loop = true;
victorySound.volume = 0.5;

let gotHitSound = new Audio();
gotHitSound.src = './MP3/gotHit.mp3';

if (mute === true) {
	gameMusic.src = '';
	arrowSound.src = '';
	orcDeathSound.src = '';
	orcLaugh.src = '';
	victorySound.src = '';
	gotHitSound.src = '';
}

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
		health: 20
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
		if (archerObj.health === 100) {
			console.log('I HAVE FULL HEALTH');
		} else if (archerObj.health > 75) {
			console.log('POTION GAVE ME FULL HEALTH!');
			archerObj.health = 100;
			document.querySelector('.healthAmount').innerText = `${archerObj.health}`;
			potions.splice(index, 1);
		} else {
			console.log('POTION HEALED ME A BIT!');
			archerObj.health += pot.health;
			document.querySelector('.healthAmount').innerText = `${archerObj.health}`;
			potions.splice(index, 1);
		}
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
	arrowAmount: 50,
	spriteX: 0,
	spriteY: 640,
	alive: true
};

if (archerObj.health <= 0) {
	alive = false;
}

function drawArcher() {
	ctx.fillStyle = 'red';
	ctx.fillRect(archerObj.x + 5, archerObj.y, 50, 5);
	ctx.fillStyle = 'green';
	ctx.fillRect(archerObj.x + 5, archerObj.y, archerObj.health / 100 * 50, 5);

	ctx.drawImage(
		archerImage,
		archerObj.spriteX,
		archerObj.spriteY,
		64,
		64,
		archerObj.x,
		archerObj.y,
		archerObj.w,
		archerObj.h
	);

	detectSpellArcherCollision(archerObj);
}

// MOVEMENT KEYS
document.onkeydown = function(e) {
	if (e.key === 'ArrowUp' && archerObj.y > 360) {
		moveArcher(e.key);
	} else if (e.key === 'ArrowLeft' && archerObj.x > 0) {
		moveArcher(e.key);
	} else if (e.key === 'ArrowDown' && archerObj.y < 520) {
		moveArcher(e.key);
	} else if (e.key === 'ArrowRight' && archerObj.x < 700) {
		moveArcher(e.key);
	}
	if (e.key === ' ') {
		shoot();
	}
};

function moveArcher(e) {
	if (e === 'ArrowUp') {
		archerObj.y -= 15;
		archerObj.spriteY = 512;
	} else if (e === 'ArrowLeft') {
		archerObj.x -= 15;
		archerObj.spriteY = 576;
	} else if (e === 'ArrowRight') {
		archerObj.x += 15;
		archerObj.spriteY = 704;
	} else if (e === 'ArrowDown') {
		archerObj.y += 15;
		archerObj.spriteY = 640;
	}

	if (archerObj.spriteX >= 512) {
		archerObj.spriteX = 0;
	}
	archerObj.spriteX += 64;
}

document.onkeyup = function(e) {
	if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === 'ArrowRight') {
		archerObj.spriteX = 0;
		archerObj.spriteY = 576;
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
		str: 15,
		hitTimes: 1,
		spriteX: 0,
		spriteY: 704,
		alive: true
	};

	if (currentGameLevel === 'Medium' || currentGameLevel === 'Hard') {
		goblinObj.str = 20;
	}

	if (goblinObj.health <= 0) {
		alive = false;
	}

	goblins.push(goblinObj);
}, 2000);

function drawGoblin() {
	goblins.forEach((goblin, index) => {
		if (goblin.spriteX >= 512) {
			goblin.spriteX = 0;
		}

		ctx.fillStyle = 'red';
		ctx.fillRect(goblin.x, goblin.y, 50, 5);
		ctx.fillStyle = 'green';
		ctx.fillRect(goblin.x, goblin.y, goblin.health / 50 * 50, 5);

		if (currentGameLevel === 'Medium') {
			ctx.drawImage(
				goblinImage,
				(goblin.spriteX += 64),
				goblin.spriteY,
				64,
				64,
				(goblin.x += 2.5),
				goblin.y,
				goblin.w,
				goblin.h
			);
		} else if (currentGameLevel === 'Hard') {
			ctx.drawImage(
				goblinImage,
				(goblin.spriteX += 64),
				goblin.spriteY,
				64,
				64,
				(goblin.x += 3),
				goblin.y,
				goblin.w,
				goblin.h
			);
		} else {
			ctx.drawImage(
				goblinImage,
				(goblin.spriteX += 64),
				goblin.spriteY,
				64,
				64,
				(goblin.x += 2),
				goblin.y,
				goblin.w,
				goblin.h
			);
		}
		detectGoblinCollision(goblin, index); //collision with archer
		detectArrowGoblinCollision(goblin, index); // collision with arrow
	});
}

//COLLISION ON GOBLIN
function detectGoblinCollision(gob, index) {
	//detect collision between goblins and archer
	if (
		gob.x < archerObj.x + archerObj.w &&
		gob.x + gob.w - 15 > archerObj.x + 15 &&
		gob.y < archerObj.y + archerObj.h &&
		gob.y + gob.h > archerObj.y
	) {
		if (gob.hitTimes > 0) {
			console.log('GOBLIN HURT ME!');
			gotHitSound.play()
			archerObj.health -= gob.str;
			document.querySelector('.healthAmount').innerText = `${archerObj.health}`;
			gob.hitTimes--;
			if (archerObj.health <= 0) {
				archerObj.health = 0;
				document.querySelector('.healthAmount').innerText = `${archerObj.health}`;
				gameOver();
			}
		}
	}
	if (gob.x > canvas.width) {
		console.log('Goblin Hurt People!');
		goblins.splice(index, 1);
		castleHealth -= gob.str;
		document.querySelector('.castleAmount').innerText = `${castleHealth}`;
		if (castleHealth <= 0) {
			gameOver();
		}
	}
}

//GOLD GOBLIN
let goldGoblinImage = new Image();
goldGoblinImage.src = './Sprites/GoldenGoblin.png';

let goldGoblins = [];
setInterval(function() {
	let goldGoblinObj = {
		x: -1,
		y: 420,
		w: 94,
		h: 94,
		health: 400,
		str: 30,
		hitTimes: 1,
		spriteX: 0,
		spriteY: 704,
		healthBar: 400,
		alive: true
	};

	if (currentGameLevel === 'Medium') {
		goldGoblinObj.str = 40;
		goldGoblinObj.health = 500;
		goldGoblinObj.healthBar = 500;
	} else if (currentGameLevel === 'Hard') {
		goldGoblinObj.str = 50;
		goldGoblinObj.health = 600;
		goldGoblinObj.healthBar = 600;
	}

	if (goldGoblinObj.health <= 0) {
		alive = false;
	}

	goldGoblins.push(goldGoblinObj);
}, 40000);

function drawGoldGoblin() {
	goldGoblins.forEach((goblin, index) => {
		if (goblin.spriteX >= 512) {
			goblin.spriteX = 0;
		}

		ctx.fillStyle = 'red';
		ctx.fillRect(goblin.x, goblin.y, 90, 5);
		ctx.fillStyle = 'green';
		ctx.fillRect(goblin.x, goblin.y, goblin.health / goblin.healthBar * 90, 5);

		ctx.drawImage(
			goldGoblinImage,
			(goblin.spriteX += 64),
			goblin.spriteY,
			64,
			64,
			(goblin.x += 0.7),
			goblin.y,
			goblin.w,
			goblin.h
		);
		detectGoldGoblinCollision(goblin, index); //collision with archer
		detectArrowGoldGoblinCollision(goblin, index); // collision with arrow
	});
}

//COLLISION ON GOLD GOBLIN
function detectGoldGoblinCollision(gob, index) {
	//detect collision between gold goblins and archer
	if (
		gob.x < archerObj.x + archerObj.w &&
		gob.x + gob.w - 15 > archerObj.x + 15 &&
		gob.y < archerObj.y + archerObj.h &&
		gob.y + gob.h > archerObj.y
	) {
		if (gob.hitTimes > 0) {
			console.log('GOBLIN HURT ME!');
			gotHitSound.play()
			archerObj.health -= gob.str;
			document.querySelector('.healthAmount').innerText = `${archerObj.health}`;
			gob.hitTimes--;
			if (archerObj.health <= 0) {
				archerObj.health = 0;
				document.querySelector('.healthAmount').innerText = `${archerObj.health}`;
				gameOver();
			}
		}
	}
	if (gob.x > canvas.width) {
		console.log('Goblin Hurt People!');
		goldGoblins.splice(index, 1);
		castleHealth -= gob.str;
		document.querySelector('.castleAmount').innerText = `${castleHealth}`;
		if (castleHealth <= 0) {
			gameOver();
		}
	}
}

//COLLISION ON ARROW AND GOLD GOBLIN
function detectArrowGoldGoblinCollision(goblin, i) {
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
				orcDeathSound.play();
				goldGoblins.splice(i, 1);
				wonGame = 'true';
				gameOver();
			}
		}
	});
}

// ARROW CREATION
let arrows = [];
function shoot() {
	if (archerObj.arrowAmount === 0) {
		console.log('out of arrows');
		return;
	} else {
		arrowSound.play();
		archerObj.arrowAmount--;
		document.querySelector('.arrowsAmount').innerText = `${archerObj.arrowAmount}`;

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
arrowImage.src = './Sprites/ArrowBag.png';

let fallingArrows = [];
setInterval(function() {
	let arrowObj = {
		x: Math.random() * 700,
		y: -1,
		w: 30,
		h: 30,
		amount: 15
	};

	fallingArrows.push(arrowObj);
}, 7000);

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
		if (archerObj.arrowAmount === 50) {
			console.log('I CANT HOLD MORE ARROWS!');
		} else if (archerObj.arrowAmount > 35) {
			console.log('I HAVE A FULL BAG OF ARROWS NOW');
			archerObj.arrowAmount = 50;
			document.querySelector('.arrowsAmount').innerText = `${archerObj.arrowAmount}`;
			fallingArrows.splice(index, 1);
		} else {
			console.log('MORE ARROWS!');
			archerObj.arrowAmount += arrow.amount;
			document.querySelector('.arrowsAmount').innerText = `${archerObj.arrowAmount}`;
			fallingArrows.splice(index, 1);
		}
	}
}

//COLLISION ON ARROW AND GOBLIN
function detectArrowGoblinCollision(goblin, i) {
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
				orcDeathSound.play();
				goblins.splice(i, 1);
			}
		}
	});
}

// MAGIC GOBLIN
let magicGoblinImage = new Image();
magicGoblinImage.src = './Sprites/MagicGoblin.png';

let magicGoblins = [];
setInterval(function() {
	let magicGoblinObj = {
		x: -1,
		y: Math.random() * 110 + 440,
		w: 64,
		h: 64,
		health: 50,
		str: 15,
		spriteX: 0,
		spriteY: 704,
		healthBar: 50,
		spellCount: 1,
		alive: true,
		get shoot() {
			let goblin = this;
			setInterval(function() {
				if (goblin.health > 0) {
					spellShoot(goblin);
				}
			}, 1800);
		}
	};

	magicGoblinObj.shoot;

	if (currentGameLevel === 'Medium') {
		magicGoblinObj.str = 20;
		magicGoblinObj.health = 75;
		magicGoblinObj.healthBar = 75;
		magicGoblinObj.spellCount = 2;
	} else if (currentGameLevel === 'Hard') {
		magicGoblinObj.str = 25;
		magicGoblinObj.health = 75;
		magicGoblinObj.healthBar = 75;
		magicGoblinObj.spellCount = 3;
	}

	if (magicGoblinObj.health <= 0) {
		alive = false;
	}

	magicGoblins.push(magicGoblinObj);
}, 5000);

function drawMagicGoblin() {
	magicGoblins.forEach((goblin, index) => {
		if (goblin.spriteX >= 512) {
			goblin.spriteX = 0;
		}

		ctx.fillStyle = 'red';
		ctx.fillRect(goblin.x, goblin.y, 50, 5);
		ctx.fillStyle = 'green';
		ctx.fillRect(goblin.x, goblin.y, goblin.health / goblin.healthBar * 50, 5);

		ctx.drawImage(
			magicGoblinImage,
			(goblin.spriteX += 64),
			goblin.spriteY,
			64,
			64,
			(goblin.x += 1.3),
			goblin.y,
			goblin.w,
			goblin.h
		);
		detectMagicGoblinCollision(goblin, index); //collision with archer
		detectArrowMagicGoblinCollision(goblin, index); // collision with arrow
	});
}

//COLLISION ON MAGIC GOBLIN
function detectMagicGoblinCollision(gob, index) {
	//detect collision between gold goblins and archer
	if (gob.x > canvas.width) {
		console.log('Goblin Hurt People!');
		magicGoblins.splice(index, 1);
		castleHealth -= gob.str;
		document.querySelector('.castleAmount').innerText = `${castleHealth}`;
		if (castleHealth <= 0) {
			gameOver();
		}
	}
}

//COLLISION ON ARROW AND MAGIC GOBLIN
function detectArrowMagicGoblinCollision(goblin, i) {
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
				orcDeathSound.play();
				magicGoblins.splice(i, 1);
			}
		}
	});
}

// SPELL CREATION
let spells = [];
function spellShoot(goblin) {
	if (goblin.spellCount > 0) {
		goblin.spellCount--;

		let spell = {
			x: goblin.x + goblin.w - 20,
			y: goblin.y + (goblin.h / 2 + 10),
			w: 20,
			h: 20,
			str: goblin.str
		};
		spells.push(spell);
	}
}

let spellImage = new Image();
spellImage.src = './Sprites/Spell.png';

function drawSpells() {
	ctx.fillStyle = 'red';
	spells.forEach((spell) => {
		ctx.drawImage(spellImage, (spell.x += 3), spell.y, spell.w, spell.h);
	});
}

// //COLLISION ON SPELL AND ARCHER
function detectSpellArcherCollision(archer) {
	spells.forEach((spell, index) => {
		if (
			archer.x < spell.x + spell.w &&
			archer.x + archer.w > spell.x &&
			archer.y < spell.y + spell.h &&
			archer.y + archer.h > spell.y
		) {
			console.log('Spell Hit Me!');
			gotHitSound.play()
			archer.health -= spell.str;
			document.querySelector('.healthAmount').innerText = `${archerObj.health}`;
			spells.splice(index, 1);
			if (archer.health <= 0) {
				gameOver();
			}
		}
	});
}

// GAME OVER FUNCTION
function gameOver() {
	backBtn.innerText = 'Play Again!';
	score.style.visibility = 'hidden';
	window.cancelAnimationFrame(animateId);
	ctx.clearRect(0, 0, canvas.width, canvas.height); //Clears Everything
	gameMusic.volume = 0.5;
	gameResults();
}

// GAME RESULTS
function gameResults() {
	canvas.style.transition = '2s';
	if (wonGame === 'true') {
		victorySound.play()
		canvas.style.backgroundImage = 'url(./Img/VictoryBackground.png)';
	} else {
		orcLaugh.play()
		canvas.style.backgroundImage = 'url(./Img/DefeatBackground.png)';
	}
}

// ANIMATE FUNCTION
function animate() {
	animateId = window.requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height); //Clears Everything

	drawArcher();
	drawArrows();
	drawFallingArrows();
	drawPotion();
	drawGoblin();
	drawGoldGoblin();
	drawMagicGoblin();
	drawSpells();
}

window.requestAnimationFrame(animate);
