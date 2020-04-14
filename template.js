// I USE THIS TO CREATE OBJECTS AND THEN MOVE TO GAME.JS

//MAGIC GOBLIN
// let magicGoblinImage = new Image();
// magicGoblinImage.src = './Sprites/MagicGoblin.png';

// let magicGoblins = [];
// setInterval(function() {
// 	let magicGoblinObj = {
// 		x: -1,
// 		y: Math.random() * 110 + 440,
// 		w: 64,
// 		h: 64,
// 		health: 50,
// 		str: 15,
// 		spriteX: 0,
// 		spriteY: 704,
// 		healthBar: 50
// 	};

// 	if (currentGameLevel === 'Medium') {
// 		magicGoblinObj.str = 20;
// 		magicGoblinObj.health = 75;
// 		magicGoblinObj.healthBar = 75;
// 	} else if (currentGameLevel === 'Hard') {
// 		magicGoblinObj.str = 25;
// 		magicGoblinObj.health = 100;
// 		magicGoblinObj.healthBar = 100;
// 	}

// 	magicGoblins.push(magicGoblinObj);
// }, 3200);

// function drawMagicGoblin() {
// 	magicGoblins.forEach((goblin, index) => {
// 		if (goblin.spriteX >= 512) {
// 			goblin.spriteX = 0;
// 		}

// 		ctx.fillStyle = 'red';
// 		ctx.fillRect(goblin.x, goblin.y, 50, 5);
// 		ctx.fillStyle = 'green';
// 		ctx.fillRect(goblin.x, goblin.y, goblin.health / goblin.healthBar * 50, 5);

// 		ctx.drawImage(
// 			magicGoblinImage,
// 			(goblin.spriteX += 64),
// 			goblin.spriteY,
// 			64,
// 			64,
// 			(goblin.x += 1.3),
// 			goblin.y,
// 			goblin.w,
// 			goblin.h
// 		);
// 		detectMagicGoblinCollision(goblin, index); //collision with archer
// 		detectArrowMagicGoblinCollision(goblin, index); // collision with arrow
// 	});
// }

// //COLLISION ON MAGIC GOBLIN
// function detectMagicGoblinCollision(gob, index) {
// 	//detect collision between gold goblins and archer
// 	if (gob.x > canvas.width) {
// 		console.log('Goblin Hurt People!');
// 		magicGoblins.splice(index, 1);
// 		castleHealth -= gob.str;
// 		document.querySelector('.castleAmount').innerText = `${castleHealth}`;
// 		if (castleHealth <= 0) {
// 			wonGame = 'false';
// 			gameOver();
// 		}
// 	}
// }

// //COLLISION ON ARROW AND MAGIC GOBLIN
// function detectArrowMagicGoblinCollision(goblin, i) {
// 	arrows.forEach((arrow, index) => {
// 		if (
// 			goblin.x < arrow.x + arrow.w &&
// 			goblin.x + goblin.w > arrow.x &&
// 			goblin.y < arrow.y + arrow.h &&
// 			goblin.y + goblin.h > arrow.y
// 		) {
// 			console.log('arrow hit goblin');
// 			goblin.health -= archerObj.str;
// 			console.log(goblin.health);
// 			arrows.splice(index, 1);
// 			if (goblin.health <= 0) {
// 				magicGoblins.splice(i, 1);
// 			}
// 		}
// 	});
// }

// // SPELL CREATION
// let spells = [];
// function spellShoot() {
// 	let spell = {
// 		x: magicGoblinObj.x + 5,
// 		y: magicGoblinObj.y + (magicGoblinObj.h / 2 + 10),
// 		w: 10,
// 		h: 10
// 	};
// 	spells.push(spell);
// }

// setInterval(function() {
// 	spellShoot();
// }, 3000);

// function drawSpells() {
// 	ctx.fillStyle = 'red';
// 	spells.forEach((spell) => {
// 		ctx.fillRect((spell.x += 2), spell.y, spell.w, spell.h);
// 	});
// }
