"use strict";

// *********elements from html********


const main = document.querySelector('main');

// ********* ELEMENTS OF divBlock ********

let divblockWidth=950;
let divblockHeight=550;
// ********* elements for userBlock******

let userblock = [680, 36]
let currentPosition = userblock;

// ********** elements for ball*********
let ball = [740, 56]
let ballCurrentPosition = ball;
let xDirection = 2;
let yDirection = 2;
let ballDiameter=20 // ball width +height /2
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

    // now adding block 
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

    interval = setInterval(moveBall, 30)
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
            if (currentPosition[0] > divBlockBhedBhaw.left) {
                currentPosition[0] -= 10;
                drawUserBlock(block)
            } else {
                block.style.background = "black";
            }

            break;
        case 'ArrowRight':
            if (currentPosition[0] < 1170) {
                currentPosition[0] += 10;
                drawUserBlock(block)
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
         xDirection =-2;
        return
    }
    if (xDirection === -2 && yDirection === -2) {
       return yDirection=2;
        
    }
    if (xDirection=== -2 && yDirection === 2) {
        xDirection=2
        return
    }
}

//************ collision detection *******

function collsionDetected() {
    const divBlock = document.querySelector(".div-block");
    const divBlockBhedBhaw = divBlock.getBoundingClientRect();
    const divRight=divBlockBhedBhaw.right
    const divTop=divBlockBhedBhaw.top
    const divBottom=divBlockBhedBhaw.bottom
    const divLeft=divBlockBhedBhaw.left



    //1) here ball currentPosition is 740 and we're saying ki agr ball ki position container ke end position se
    //  zayada hoti hai toh change direction and were minusing this ball diameter as ki andr aaye ball

    // 2)checking for top here we're minusing divbottom as it includes top distance plus container height accorfing 
    // to get boudingclient rect 
    if (ballCurrentPosition[0]>= (divRight-ballDiameter-10) || ballCurrentPosition[1]>= (divBottom-divTop-10) || ballCurrentPosition[0]<= divLeft) {
        changeDirection()
    }

    if (ballCurrentPosition[1]<= 20) {
        clearInterval(interval)
    }
}