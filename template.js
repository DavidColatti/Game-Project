// //COLLISION ON SPELL AND ARCHER
// function detectSpellArcherCollision(archer) {
// 	spells.forEach((spell, index) => {
// 		if (
// 			spell.x < spell.x + spell.w &&
// 			archer.x + archer.w > spell.x &&
// 			archer.y < spell.y + spell.h &&
// 			archer.y + archer.h > spell.y
// 		) {
// 			console.log('Spell Hit Me!');
// 			archer.health -= magicGoblinObj.str;
// 			spells.splice(index, 1);
// 			if (archer.health <= 0) {
// 				gameOver();
// 			}
// 		}
// 	});
// }
