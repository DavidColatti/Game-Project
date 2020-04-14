// //GOLD GOBLIN
// let goldGoblinImage = new Image();
// goldGoblinImage.src = './Sprites/GoldenGoblin.png';

// let goldGoblins = [];
// setInterval(function() {
//     let goldGoblinObj = {
//         x: -1,
//         y: Math.random() * 110 + 440,
//         w: 74,
//         h: 74,
//         health: 300,
//         str: 30,
//         hitTimes: 1,
//         spriteX: 0,
//         spriteY: 704
//     };

//     if (currentGameLevel === 'Medium' || currentGameLevel === 'Hard') {
//         goldGoblinObj.str = 40;
//     }

//     goldGoblins.push(goldGoblinObj);
// }, 3000);

// function drawGoldGoblin() {
//     goldGoblins.forEach((goblin, index) => {
//         if (goblin.spriteX >= 512) {
//             goblin.spriteX = 0;
//         }

//         ctx.fillStyle = 'red';
//         ctx.fillRect(goblin.x, goblin.y, 50, 5);
//         ctx.fillStyle = 'green';
//         ctx.fillRect(goblin.x, goblin.y, goblin.health / 300 * 50, 5);

//         ctx.drawImage(
//             goldGoblinImage,
//             (goblin.spriteX += 64),
//             goblin.spriteY,
//             64,
//             64,
//             (goblin.x ++),
//             goblin.y,
//             goblin.w,
//             goblin.h
//         );
//         detectGoblinCollision(goblin, index); //collision with archer
//         detectArrowGoblinCollision(goblin, index); // collision with arrow
//     });
// }

