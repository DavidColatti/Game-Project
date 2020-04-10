// CANVAS
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth - 100;
canvas.height = 600;

// BACKGROUND
function drawBackground() {
    canvas.style.backgroundImage = 'url(/Img/stonewallbg.jpg)';
    canvas.style.backgroundRepeat = 'no-repeat';
    canvas.style.backgroundSize = 'cover'
}


// ANIMATE FUNCTION
function animate() {
	animateId = window.requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height); //cleared everythign

    drawBackground()
    drawKnight()
    drawGoblin()
    drawArcher()
    drawSkeleton()
}

window.requestAnimationFrame(animate)
