const canvas = document.getElementById("Blockcrash")
const ctx = canvas.getContext("2d")
ctx.font = "45px Orbitron";


let playerWidth = 200;
let playerHeight = 15;
let playerVelocityX = 0;
let playerVelocity = 0

let ballheight = 20;
let ballwidth = 30;
let ballvelocityY = 0;
let ballvelocityX = 0

let boardWidth = canvas.width
let boardHeight = canvas.height

let blockarray = [];
let blockwidth = 49;
let blockheight = 20;
let blockamount = 0;

let startX = 15;
let startY = 10;
let gapX = 10;
let gapY = 10;

console.log(boardHeight, boardWidth)


let player = {
    xaxeln: boardWidth / 2 - playerWidth / 2,
    yaxeln: boardHeight - playerHeight - 10,
    width: playerWidth,
    height: playerHeight,
    velocityX: playerVelocityX
}

let ball = {
    xaxel: boardWidth / 2,
    yaxel: boardHeight / 2,
    width: ballwidth,
    height: ballheight,
    velocityY: ballvelocityY,
    velocityX: ballvelocityX
}
window.onload = function () {

    createBlocks();
    requestAnimationFrame(animate);

}


document.addEventListener("keydown", function (platåå2) {

    if (platåå2.key === "Enter") {

        blockarray.splice(createBlocks);

        if (ball.yaxel + ball.height >= canvas.height) {
            player = {
                xaxeln: boardWidth / 2 - playerWidth / 2,
                yaxeln: boardHeight - playerHeight - 10,
                width: playerWidth,
                height: playerHeight,
                velocityX: playerVelocityX
            }

            ball = {
                xaxel: boardWidth / 2,
                yaxel: boardHeight / 2,
                width: ballwidth,
                height: ballheight,
                velocityY: ballvelocityY,
                velocityX: ballvelocityX
            }

            for (let col = 0; col < 20; col++) {
                let x = startX + (blockwidth + gapX) * col;



                for (let row = 0; row < 6; row++) {
                    let y = startY + (blockheight + gapY) * row;
                    blockarray.push({ x: x, y: y, width: blockwidth, height: blockheight });
                    blockamount++;
                }
            }

        }
    }
    if (ball.velocityX == 0 && ballvelocityY == 0) {
        if (platåå2.code === "KeyL") {
            ball.velocityX = 4
            ball.velocityY = 4
        }
        if (platåå2.code === "KeyM") {
            ball.velocityX = 7
            ball.velocityY = 7
        }
        if (platåå2.code === "KeyS") {
            ball.velocityX = 10
            ball.velocityY = 10
        }
    }
});


document.addEventListener("keydown", function (platåå) {
    console.log(platåå)

    if (platåå.key === "ArrowRight") {
        playerVelocity = 6
        player.velocityX = playerVelocity
    }
    if (platåå.key === "ArrowLeft") {
        playerVelocity = 6
        player.velocityX = -playerVelocity
    }


});

document.addEventListener("keyup", function (platåå) {
    console.log(platåå)

    if (platåå.key === "ArrowRight") {

        player.velocityX = 0
    }
    if (platåå.key === "ArrowLeft") {

        player.velocityX = 0
    }

});



function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.xaxeln += player.velocityX

    if (player.xaxeln < 0) {

        player.xaxeln = 0;
    }
    else if (player.xaxeln + playerWidth > canvas.width) {

        player.xaxeln = canvas.width - playerWidth;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "white"
    ctx.fillRect(player.xaxeln, player.yaxeln, player.width, player.height)

    player.xaxeln = player.xaxeln + player.velocityX

    ctx.fillStyle = "white"

    ctx.fillRect(ball.xaxel, ball.yaxel, ball.width, ball.height)

    blocksen();
    ballman();

    requestAnimationFrame(animate);
}
function ballman() {
    console.log(ball.yaxel)

    ball.xaxel += ball.velocityX;
    ball.yaxel += ball.velocityY;

    if (ball.yaxel < 0) {

        ball.velocityY *= -1;
    }
    if (ball.xaxel < 0 || (ball.xaxel + ball.width > canvas.width)) {

        ball.velocityX *= -1;
    }
    if (ball.yaxel + ball.height >= canvas.height) {

        ball.velocityY = 0
        ball.velocityX = 0
        ctx.fillText("Game Over: Press 'Enter' to Restart", 175, canvas.height / 2);

    }
    if (
        ball.yaxel + ball.height > player.yaxeln &&
        ball.xaxel + ball.width > player.xaxeln &&
        ball.xaxel < player.xaxeln + player.width
    ) {
        ball.velocityY *= -1;
    }


}
function createBlocks() {



    for (let col = 0; col < 20; col++) {
        let x = startX + (blockwidth + gapX) * col;



        for (let row = 0; row < 6; row++) {
            let y = startY + (blockheight + gapY) * row;
            blockarray.push({ x: x, y: y, width: blockwidth, height: blockheight });
            blockamount++;
        }
    }
}




function blocksen() {

    for (let b = 0; b < blockarray.length; b++) {
        ctx.fillRect(blockarray[b].x, blockarray[b].y, blockarray[b].width, blockarray[b].height);
        if (
            ball.yaxel < blockarray[b].y + blockarray[b].height &&
            ball.yaxel + ball.height > blockarray[b].y &&
            ball.xaxel < blockarray[b].x + blockarray[b].width &&
            ball.xaxel + ball.width > blockarray[b].x
        ) {

            ball.velocityY *= -1;


            blockarray.splice(b, 1);
            b--;

            break

        }
    }

    if (blockarray.length === 0) {

        ctx.fillStyle = "white";
        ctx.font = "45px Orbitron";
        ctx.fillText("You win!", 500, canvas.height / 2);
        ball.velocityY = 0;
        ball.velocityX = 0;
    }
}






