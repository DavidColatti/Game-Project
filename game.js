const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.querySelector('.startBtn');
const resetBtn = document.querySelector('.resetBtn');
const gameLevel = document.querySelector('#Levels');
const rightSide = document.querySelector('.rightSection');
const result = document.querySelector('.result');
canvas.style.display = 'none';
resetBtn.style.display = 'none';
rightSide.style.display = 'none';
let wonGame;
let currentGameLevel;

function theGame() {
	canvas.style.display = 'inline';
	startBtn.style.display = 'none';
	gameLevel.style.display = 'none';
	rightSide.style.display = 'inline';
	resetBtn.style.display = 'none';
	result.style.display = 'none'
	currentGameLevel = gameLevel.value;

	// CANVAS STRUCTURE
	canvas.width = 800;
	canvas.height = 600;
	canvas.style.backgroundImage = 'url(./Img/stonewallbg.jpg)';
	canvas.style.backgroundRepeat = 'no-repeat';
	canvas.style.backgroundSize = 'contain';
	let animateId;
	let castleHealth = 200;

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
		spriteY: 640
	};

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
			str: 15,
			hitTimes: 1,
			spriteX: 0,
			spriteY: 704
		};

		if (currentGameLevel === 'Medium' || currentGameLevel === 'Hard') {
			goblinObj.str = 20;
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
				archerObj.health -= gob.str;
				document.querySelector('.healthAmount').innerText = `${archerObj.health}`;
				gob.hitTimes--;
				if (archerObj.health <= 0) {
					archerObj.health = 0;
					document.querySelector('.healthAmount').innerText = `${archerObj.health}`;
					wonGame = 'false'
					gameOver();
				}
			}
		}
		if (gob.x > canvas.width) {
			console.log('Goblin Hurt People!');
			goblins.splice(index, 1);
			castleHealth -= gob.str;
			document.querySelector('.castleAmount').innerText = `${castleHealth}`;
			if(castleHealth <= 0) {
				wonGame = 'false'
				gameOver();
			}
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
				console.log(goblin.health);
				console.log();
				arrows.splice(index, 1);
				if (goblin.health <= 0) {
					goblins.splice(i, 1);
				}
			}
		});
	}

	// GAME OVER FUNCTION
	function gameOver() {
		console.log('GAME IS OVER');
		window.cancelAnimationFrame(animateId);
		canvas.style.display = 'none';
		resetBtn.style.display = 'inline';
		rightSide.style.display = 'none';
		gameResults()
	}

	// GAME RESULTS
	function gameResults() {
		result.style.display = 'inline'

		if (wonGame === 'true') {
			result.innerText = 'YOU WON'
		} else if (archerObj.health <= 0){
			result.innerText = 'YOU DIED!'
		} else if (castleHealth <= 0) {
			result.innerText = 'YOU LET THE CITIZENS DIE!'
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
	}

	window.requestAnimationFrame(animate);
}

startBtn.addEventListener('click', theGame);
