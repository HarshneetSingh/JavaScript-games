// *********elements****************
const gameStart = document.querySelector('.game-start');
const main = document.querySelector('main');
const startGamebtn = document.querySelector('.start-btn');
// ************** elements for time ****************
let remainingTime = 10;
let randomMoleInterval;
let remaintime;

// **************elements for score****************
let score = 0;
let hitPositionId = null;
startGamebtn.addEventListener("click", startGame)
let scoreArr = [];


// ********window reloading*******8
window.addEventListener("DOMContentLoaded", () => {
    // * addding highest score to the game
    const highestscore = document.createElement('div');
    const localarr = JSON.parse(localStorage.getItem('result'));

    // *bringing local storage 
    if (!null) {
        localarr.sort();
        highestscore.className = "highest-score";
        highestscore.innerHTML = `<h2 style="font-style: italic">Highest score: <span class="highest-span-score" style="color:white;">${localarr[0]}</span></h2>`;
        main.appendChild(highestscore)
    }
})
// ********startgame***********
function startGame() {
    // *removing game start contnet

    gameStart.style.display = "none";

    // *adding curvedShape design 

    const curvedShape = document.createElement('div');

    curvedShape.className = "curved-shape";
    main.appendChild(curvedShape)

    // *adding score and time

    scoreTime()

    // *adding grid

    gridMaker(12)

    // *adding information about the game and the start buttonBounce
    const gameInfo = document.createElement('div');
    const playBtnFromDom = document.createElement('button');
    playBtnFromDom.className = "playBtn";
    playBtnFromDom.innerHTML = "Play";
    playBtnFromDom.addEventListener('click', () => {
        const gameInfo = document.querySelector('.game-info');
        main.removeChild(gameInfo);

        // * setting interval   
        interval()
    })

    gameInfo.className = "game-info";
    gameInfo.innerHTML = `<p>You'll we be getting mice
    randomly within the hole.
    Catching them will get you +1 :)</p>`;
    gameInfo.appendChild(playBtnFromDom);
    main.appendChild(gameInfo)


}
// ********* grid maker ********
function gridMaker(num) {
    const gridMaker = document.createElement('div');
    gridMaker.className = "grid";
    const spanScore = document.querySelector('.span-score');

    for (let index = 0; index < num; index++) {
        const grid = document.createElement('div');
        grid.className = "grid-item";
        grid.dataset.id = index;
        // Eventlistener for adding a score 
        grid.addEventListener('mousedown', (e) => {

            if (e.target.dataset.id === hitPositionId) {                                                  // if (grid.classList.contains('grid-item-bug')) {
                score++;                                                                             //     score++;
                spanScore.textContent = score;
                hitPositionId = null;                                                                         //     grid.classList.remove('grid - item - bug');
            }                                                                                           // }                         
        })
        gridMaker.appendChild(grid);

    }
    main.appendChild(gridMaker);
}
// *******setting score and time*****
function scoreTime() {
    // setting score and time container
    const scoreTimeDiv = document.createElement('div');
    scoreTimeDiv.className = "score-time";
    // setting score 
    const score = document.createElement('div');
    score.className = "score";
    score.innerHTML = `Score: <span class="span-score" style="color: white; font-size: 1.5rem;">${00}</span>`;
    // setting ttime 
    const time = document.createElement('div');
    time.className = "time";
    time.innerHTML = `Time: <span class="span-time" style="color: white; font-size: 1.5rem;">${10}</span>`

    scoreTimeDiv.appendChild(score);
    scoreTimeDiv.appendChild(time);
    main.appendChild(scoreTimeDiv);
}
// **********interval*******
function interval() {

    randomMoleInterval = setInterval(randomMole, 300);
    remaintime = setInterval(timeCountdown, 1000);

}
// *****interval random mole *********
function randomMole() {
    // *bringing grid items node list for first removing existing backgrounf bug then adding a new bug 
    const gridNode = document.querySelectorAll('.grid-item')
    const mole = gridNode[Math.floor(Math.random() * gridNode.length)];
    hitPositionId = mole.dataset.id;
    // *remoiving existing backgrounf bug
    gridNode.forEach(function (node) {
        node.classList.remove('grid-item-bug');
    })
    // adding new backgrounf bug
    mole.classList.add('grid-item-bug');

    console.log(mole);
}
// *****interval timeCountDown*********
function timeCountdown() {
    const timeInnerContent = document.querySelector('.span-time')

    remainingTime--;
    timeInnerContent.innerHTML = `${remainingTime}`;
    if (remainingTime === 0) {
        clearInterval(randomMoleInterval);
        clearInterval(remaintime)

        // *now end phase of the game 

        // removing curved shap 

        const curvedShape = document.querySelector('.curved-shape');

        curvedShape.style.animation = "curvedRemoved 0.5s ease-in-out 1";
        curvedShape.style.top = "1500px";

        setTimeout(() => { main.removeChild(curvedShape) }, 1000);

        // removed the grid and time shit
        const endGrid = document.querySelector('.grid');
        const endScoreTime = document.querySelector('.score-time');
        main.removeChild(endGrid);
        main.removeChild(endScoreTime);


        result(score)
        score = 0;
        remainingTime = 10;
    }

}
// ******** displaying result **********
function result(score) {
    let localStorageAvailable = checkingLocalStorage();
    localStorageAvailable.push(score);
    localStorage.setItem('result', JSON.stringify(localStorageAvailable));
    // *adding result 

    // adding result section 
    const result = document.createElement('section');
    result.classList.add('result');
    // added scoreboard text
    const resultBoard = document.createElement('div');
    resultBoard.classList.add('result-board');
    resultBoard.innerHTML = `SCOREBOARD`

    // added result tr
    const resultRow = document.createElement('tr');
    resultRow.classList.add('tr')

    // added result th of main tr
    const resultCell = document.createElement('th');
    resultCell.classList.add('cell');
    resultCell.innerHTML = `Plays`
    const resultCell2 = document.createElement('th');
    resultCell2.classList.add('cell2');
    resultCell2.innerHTML = `Score`

    // appending childrens
    setTimeout(() => main.appendChild(result), 500)
    result.appendChild(resultBoard);
    resultBoard.appendChild(resultRow);
    resultRow.appendChild(resultCell);
    resultRow.appendChild(resultCell2);

    // added result td of child trs
    if (localStorageAvailable.length < 6)
        localStorageAvailable.forEach(function (score, index) {
            const resultRow2 = document.createElement('tr');
            resultRow2.classList.add('tr2')

            const resultCell3 = document.createElement('td');
            resultCell3.classList.add('cell');
            resultCell3.innerHTML = `${index + 1}`
            const resultCell4 = document.createElement('td');
            resultCell4.classList.add('cell2');
            resultCell4.innerHTML = `${score}`


            resultBoard.appendChild(resultRow2);
            resultRow2.appendChild(resultCell3);
            resultRow2.appendChild(resultCell4);
        })

    // adding play again button 
    const playAgain = document.createElement('button');
    playAgain.classList.add('playAgain');
    playAgain.innerHTML = 'Play Again';

    playAgain.addEventListener('click', () => {
        const removeScoreBoard = document.querySelector('.result')
        main.removeChild(removeScoreBoard)

        startGame()
    })
    result.appendChild(playAgain);
    const clearBoard = document.createElement('button');
    clearBoard.classList.add('playAgain');
    clearBoard.innerHTML = 'Clear ScoreBoard';


    clearBoard.addEventListener('click', () => {
        const removeScores = document.querySelectorAll('.tr2');
        removeScores.forEach((scores) => {
            resultBoard.removeChild(scores)

        })
        localStorage.clear();
    })
    result.appendChild(clearBoard);
}
// *********setting local storage **********
function checkingLocalStorage() {
    let scores;
    if (localStorage.getItem('result')) {
        scores = JSON.parse(localStorage.getItem('result'))
    } else {
        scores = []
    }
    return scores;
}
