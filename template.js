// function drawMagicGoblin() {
// 	magicGoblins.forEach((goblin, index) => {
// 		if (goblin.spriteX >= 512 && goblin.health > 0) {
// 			goblin.spriteX = 0;
// 		}

// 		ctx.fillStyle = 'red';
// 		ctx.fillRect(goblin.x, goblin.y, 50, 5);
// 		ctx.fillStyle = 'green';
// 		if (goblin.health <= 0) {
// 			goblin.health = 0;
// 		}
// 		ctx.fillRect(goblin.x, goblin.y, goblin.health / goblin.healthBar * 50, 5);

// 		if (goblin.health > 0) {
// 			goblin.x += 1.3;
// 			goblin.spriteX += 64;
// 		}
// 		if (goblin.health <= 0 && goblin.spriteX != 320) {
// 			goblin.spriteX += 64;
// 		}

// 		ctx.drawImage(magicGoblinImage, goblin.spriteX, goblin.spriteY, 64, 64, goblin.x, goblin.y, goblin.w, goblin.h);
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
// 			gameOver();
// 		}
// 	}
// }