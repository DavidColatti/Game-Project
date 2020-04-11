// // CANVAS
// const canvas = document.querySelector('#canvas');
// const ctx = canvas.getContext('2d');
// canvas.width = innerWidth - 100;
// canvas.height = 600;

// // KNIGHT
// let knightImage = new Image();
// knightImage.src = './Sprites/Knight.png';

// class Knight {
// 	constructor(x) {
// 		this.x = x;
// 		this.y = canvas.height - 150;
// 		this.w = 94.5;
// 		this.h = 95.5;
// 		this.health = 100;
// 		this.str = 25;
// 	}

// 	drawKnight() {
// 		ctx.drawImage(knightImage, 10, 127.4, 63, 63.7, this.x, this.y, this.w, this.h);
// 	}

// 	attack() {
// 		return this.str
// 	}

// 	receivedDamage(damage) {
// 		return this.health -= damage
// 	}
// }

// // MONSTER CPU
// let goblinImage = new Image();
// goblinImage.src = './Sprites/Goblin.png';

// class Monster {
// 	constructor(x, health, str) {
// 		this.x = x;
// 		this.y = canvas.height - 140;
// 		this.w = 90.5;
// 		this.h = 90.5;
// 		this.health = health;
// 		this.str = str;
// 	}

// 	drawGoblin() {		
// 		ctx.drawImage(goblinImage, 10, 127.4, 63, 63.7, this.x, this.y, this.w, this.h);
// 	}

// 	attack() {
// 		return this.str
// 	}

// 	receivedDamage(damage) {
// 		return this.health -= damage
// 	}
// }



// // EXAMPLE PLAYERS
// let enemy = new Monster(10, 100, 10);
// let david = new Knight(canvas.width / 2);


// // MOVEMENT KEYS
// document.onkeydown = function(e) {
//     if(e.key === 'ArrowUp' && david.y > 410) {
//         david.y -= 15;
//     }
//     if(e.key === 'ArrowLeft' && david.x > 0) {
//         david.x -= 15;
//     }
//     if(e.key === 'ArrowDown' && david.y < 500) {
//         david.y += 15;
//     }
//     if(e.key === 'ArrowRight' && david.x < 870) {
//         david.x += 15;
//     }
// }




// // ANIMATE FUNCTION
// function animate() {
// 	animateId = window.requestAnimationFrame(animate);
// 	ctx.clearRect(0, 0, canvas.width, canvas.height); //Clears Everything

// 	enemy.drawGoblin();
// 	david.drawKnight();
// }

// window.requestAnimationFrame(animate);
