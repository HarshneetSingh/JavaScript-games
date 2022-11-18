"use strict";

// *********elements from html********


const main = document.querySelector('main');

// ********* ELEMENTS OF divBlock ********

let divblockWidth = 950;
let divblockHeight = 550;
// ********* elements for userBlock******
const block = [];
let userblock = [680, 36]
let currentPosition = userblock;
const userBlockWidth= 140;
const userBlockHeight=20;
// ********* elements for Block************
let blockHeight = 20;
let blockWidth = 110;

const blockLeft = [350, 470, 590, 710, 830, 950, 1070];
const blockBottom = [500, 470, 440, 410, 380];
// ********** elements for ball*********
let ball = [740, 56]
let ballCurrentPosition = ball;
let xDirection = 2;
let yDirection = 2;
let ballDiameter = 20 // ball width +height /2
let interval
// ? ************** event listeners ****************************

// ********** window listener ********
window.addEventListener("DOMContentLoaded", startPage)

// ******** document ********************
document.addEventListener('keydown', userMove)


//?  ******** functions ********************************


// ******** START PAGE INFO ********
function startPage() {
    const content = document.createElement('h2');
    content.innerHTML = `Let's break the blocks!!`
    content.className = 'start-h2'
    main.appendChild(content);

    const startBtn = document.createElement('button');
    startBtn.textContent = `Let's Play`;
    startBtn.className = 'start-Btn'
    startBtn.onclick = startOnclick;
    main.appendChild(startBtn);
}

// ******** start btn **********
function startOnclick() {
    // first delete old item
    const startBtn = document.querySelector('.start-Btn');
    const content = document.querySelector('.start-h2');
    main.removeChild(content)
    main.removeChild(startBtn)

    // adding blocks
    drawBlock();

    // now adding   block 
    const divBlock = document.createElement('div');
    divBlock.className = 'div-block'
    main.appendChild(divBlock);

    // adding ball to the divv
    const ball = document.createElement('div');
    ball.className = "ball";
    main.appendChild(ball);
    drawball(ball)

    // adding user block
    const block = document.createElement('div');
    block.className = 'user-block';
    main.appendChild(block);
    drawUserBlock(block)
    // setting interval
    interval = setInterval(moveBall, 30);
}


// ******** drawing blocks *******

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
        this.topLeft = [xAxis, yAxis + blockHeight];


    }

    drawGameBlock() {
        let block = document.createElement('div');
        block.className = 'block';

        block.style.left = this.bottomLeft[0] + 'px';
        block.style.bottom = this.bottomLeft[1] + 'px';
        main.appendChild(block);
    }
}

function drawBlock() {

    for (let index = 0; index < blockBottom.length; index++) {

        for (let j = 0; j < blockLeft.length; j++) {
            block.push(new Block(blockLeft[j], blockBottom[index]));
            new Block(blockLeft[j], blockBottom[index]).drawGameBlock()
        }
    }

}


// ******* drawing user block *******
function drawUserBlock(block) {

    block.style.left = currentPosition[0] + 'px';
    block.style.bottom = currentPosition[1] + 'px';

}

// ******* drawing ball *******
function drawball(ball) {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

// ******** moving ball *******
function moveBall() {
    const ball = document.querySelector('.ball');
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;


    collsionDetected();
    drawball(ball)
}


// ******** user block moving**********
function userMove(e) {
    const block = document.querySelector('.user-block');
    const divBlock = document.querySelector(".div-block");
    const divBlockBhedBhaw = divBlock.getBoundingClientRect();
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > divBlockBhedBhaw.left + 10) {

                currentPosition[0] -= 10;
                drawUserBlock(block);
                block.style.background = "white";
            } else {
                block.style.background = "black";
            }

            break;
        case 'ArrowRight':
            if (currentPosition[0] < divBlockBhedBhaw.right - block.clientWidth - 10) {
                currentPosition[0] += 10;
                drawUserBlock(block)
                block.style.background = "white";
            }
            else {
                block.style.background = "black";
            }
            break;
    }
}

// ******* ball direction change *******

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2;
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        return yDirection = 2;

    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
}

//************ collision detection *******

function collsionDetected() {
    const divBlock = document.querySelector(".div-block");
    const divBlockBhedBhaw = divBlock.getBoundingClientRect();
    const divRight = divBlockBhedBhaw.right
    const divTop = divBlockBhedBhaw.top
    const divBottom = divBlockBhedBhaw.bottom
    const divLeft = divBlockBhedBhaw.left

    
    for (let i = 0; i < block.length; i++) {

        if((ballCurrentPosition[0] > block[i].bottomLeft[0] && ballCurrentPosition[0] < block[i].bottomRight[0]) && (ballCurrentPosition[1] + ballDiameter> block[i].bottomLeft[1] && ballCurrentPosition[1] < block[i].topLeft[1])){
            
             const allblock = document.querySelectorAll('.block');
            allblock[i].classList.remove('block');
            
            block.splice(i,1);
            changeDirection();
        }
    }


    if((ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + userBlockWidth ) &&( ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + userBlockHeight) ){
        changeDirection();
    }
//1) here ball currentPosition is 740 and we're saying ki agr ball ki position container ke end position se
//  zayada hoti hai toh change direction and were minusing this ball diameter as ki andr aaye ball

// 2)checking for top here we're minusing divbottom as it includes top distance plus container height accorfing 
// to get boudingclient rect 
if (ballCurrentPosition[0] >= (divRight - ballDiameter - 10) || ballCurrentPosition[1] >= (divBottom - divTop - 10) || ballCurrentPosition[0] <= divLeft) {
    changeDirection()
}

if (ballCurrentPosition[1] <= 20) {
    clearInterval(interval)
}
}
