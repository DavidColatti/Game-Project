// KNIGHT
let knightImage = new Image()
knightImage.src = './Sprites/Knight.png'
knightImage.onload = drawKnight;

let knight = {
    x: (canvas.width - 200),
    y: (canvas.height - 150),
    w: 94.5,
    h: 95.5
}

function drawKnight() {
    ctx.drawImage(knightImage, 10, 127.4, 63, 63.7, knight.x, knight.y, knight.w, knight.h)
}


// GOBLIN
let goblinImage = new Image()
goblinImage.src = './Sprites/Goblin.png'
goblinImage.onload = drawGoblin;

let goblin = {
    x: (canvas.width - 300),
    y: (canvas.height - 150),
    w: 94.5,
    h: 95.5
}

function drawGoblin() {
    ctx.drawImage(goblinImage, 10, 127.4, 63, 63.7, goblin.x, goblin.y, goblin.w, goblin.h)
}


// ARCHER
let archerImage = new Image()
archerImage.src = './Sprites/Archer.png'
archerImage.onload = drawArcher;

let archer = {
    x: (canvas.width - 400),
    y: (canvas.height - 150),
    w: 94.5,
    h: 95.5
}

function drawArcher() {
    ctx.drawImage(archerImage, 10, 127.4, 63, 63.7, archer.x, archer.y, archer.w, archer.h)
}


// SKELETON
let skeletonImage = new Image()
skeletonImage.src = './Sprites/Skeleton.png'
skeletonImage.onload = drawSkeleton;

let skeleton = {
    x: (canvas.width - 500),
    y: (canvas.height - 150),
    w: 94.5,
    h: 95.5
}

function drawSkeleton() {
    ctx.drawImage(skeletonImage, 10, 127.4, 63, 63.7, skeleton.x, skeleton.y, skeleton.w, skeleton.h)
}