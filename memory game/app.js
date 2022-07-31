"use strict";
const candys = [
  {
    name: "lollypop",
    img: "img/1.jpg",
  },
  {
    name: "lollypop",
    img: "img/1.jpg",
  },
  {
    name: "gem-candy",
    img: "img/2.png",
  },
  {
    name: "gem-candy",
    img: "img/2.png",
  },
  {
    name: "bean",
    img: "img/3.jpg",
  },
  {
    name: "bean",
    img: "img/3.jpg",
  },
  {
    name: "half-lollypop",
    img: "img/4.jpg",
  },
  {
    name: "half-lollypop",
    img: "img/4.jpg",
  },

  {
    name: "bar",
    img: "img/5.jpg",
  },
  {
    name: "bar",
    img: "img/5.jpg",
  },
  {
    name: "fish",
    img: "img/6.webp",
  },
  {
    name: "fish",
    img: "img/6.webp",
  },
];

candys.sort(() => {
  return 0.5 - Math.random();
});

// *************elements********
const startbtn = document.querySelector(".start");
const pageHeader = document.querySelector(".page-header");
const grid = document.querySelector(".grid-show");

let imgclick = [];
let imgclickid = [];
// ******** elements for time and score****************
const scoreContent = document.querySelector(".score");
const scoreTimeDiv = document.querySelector(".score-time");
const time = document.querySelector(".time");
const session = document.querySelector(".session");
let interval;
let scr = 0;
let secs = 0;
let minutes = 0;
let miniSecs = 0;
let dispScr = 0;
let dispSecs = 0;
let dispMinutes = 0;
let dispMiniSecs = 0;
// ***************** game end ELEMENTS********************************
const timeTaken = document.querySelector(".time-taken");
const scoreTaken = document.querySelector(".score-taken");

// *************   score board elements ****************************
const scoreStore = document.querySelector(".num");
const timeStore = document.querySelector(".tt");

// window.addEventListener('DOMContentLoaded', storing)

// ****event listener for start btn  ********************************
startbtn.addEventListener("click", () => {
  pageHeader.style.display = "none";
  startbtn.style.display = "none";
  gridMaker();
  scoreTimeDiv.style.display = "inline-block";
  interval = setInterval(getTime, 10);

});
// **************grid maker************
function gridMaker() {
  for (let index = 0; index < candys.length; index++) {
    const img = document.createElement("img");
    img.setAttribute("src", "img/multi.jpg");
    img.setAttribute("data-id", index);
    img.setAttribute(
      "style",
      "width:130px;height:110px;border:1px solid black ;animation: shuffle 1s 0.5s 1;"
    );
    img.addEventListener("click", onClick);

    grid.appendChild(img);
  }
}
// *******on click the images**********
function onClick(e) {
  let dataId = e.target.getAttribute("data-id");
  e.target.setAttribute("src", candys[dataId].img);
  imgclick.push(candys[dataId].name);
  console.log(imgclick.length);
  imgclickid.push(dataId);

  if (imgclick.length === 2) {
    setTimeout(onclickMatch, 200);
  }
}
// ******** Onclick match****************
function onclickMatch() {
  const imgg = document.querySelectorAll(".grid-show img");
  const clickId1 = imgclickid[0];
  const clickId2 = imgclickid[1];

  //? now checking if the imageclick.length is equal to 2 and both imageclick name is true then
  if (clickId1 == clickId2) {
    imgg[clickId1].setAttribute("src", "img/multi.jpg");
    imgg[clickId2].setAttribute("src", "img/multi.jpg");
  } else if (imgclick[0] === imgclick[1]) {
    imgg[clickId1].setAttribute("src", "img/white.png");
    imgg[clickId2].setAttribute("src", "img/white.png");
    imgg[imgclickid[0]].removeEventListener("click", onClick);
    imgg[imgclickid[1]].removeEventListener("click", onClick);
    getScore(imgg);
  } else {
    imgg[clickId1].setAttribute("src", "img/multi.jpg");
    imgg[clickId2].setAttribute("src", "img/multi.jpg");
  }
  imgclick = [];
  imgclickid = [];
}
// ******** GETTING THE SCORE****************
function getScore(img) {
  if (imgclick[0] === imgclick[1]) {
    scr++;

    if (scr === 6) {

      // * removing child elements from the document

      img.forEach((element) => {
        grid.removeChild(element);
      });

      //* removing score and time elements from the document

      scoreTimeDiv.style.display = 'none';

      // *STOPING TIME 

      clearInterval(interval);

      // calling game won() as score is 6 now 
      const highestTime = document.querySelector('.time');

      gameWon(highestTime.innerHTML);
      // * storing in scoreboard and in local storage
      storing(highestTime.innerHTML);
    }
  }

  return (scoreContent.textContent = `${scr}`);
}
// **********GETTING THE TIME ************
function getTime() {
  miniSecs++; // seconds

  if (miniSecs > 99) {
    miniSecs = 0;
    secs++;
    if (secs > 59) {
      secs = 0;
      minutes++; // minutes

      if (minutes > 59) {
        time.innerHTML = `session is over please play again`
      }
    }
  }

  // if (minutes<10) {
  //   dispMinutes="0"+minutes;
  // }
  // else{
  //   dispMinutes=minutes;

  // }
  // these below lines are turned to ternary operator from above example code
  dispMiniSecs = miniSecs < 10 ? dispMiniSecs = "0" + miniSecs : dispMiniSecs = miniSecs;

  dispSecs = secs < 10 ? dispSecs = "0" + secs : dispSecs = secs;

  dispMinutes = minutes < 10 ? dispMinutes = "0" + minutes : dispMinutes = minutes;

  time.innerHTML = `${dispMinutes}:${dispSecs}:${dispMiniSecs}`;
}
// ***********function to show after the game has won*******
function gameWon(highestTime) {
  const main = document.querySelector('main');
  // * adding new child elements to the document and RESULTS;

  // * adding end congratulations elements to the document;
  const end = document.createElement("div");
  end.className = "end-show";
  end.innerHTML = `<h2>Congratulations!!<span>You Got Us ;)</span></h2>`;
  main.appendChild(end);

  // * adding score elements to the document

  const scoreTaken = document.createElement("div");
  scoreTaken.className = "score-taken";
  scoreTaken.innerHTML = `<h2>Highest Score: <span style="font-size:1.2rem;color:white">${scr}</span></h2>`;
  main.appendChild(scoreTaken);

  // * adding a score element to the document
  const timeTaken = document.createElement("div");
  timeTaken.className = "time-taken";
  timeTaken.innerHTML = `<h2>Time-Taken: <span style="font-size:1.2rem;color:white">${highestTime}</span></h2>`;
  main.appendChild(timeTaken);

  //* adding the button for playing again

  const playAgainButton = document.createElement('button');
  playAgainButton.innerHTML = 'PLAY AGAIN';
  playAgainButton.className = 'Play-again';

  playAgainButton.addEventListener('click', () => location.reload())
  main.appendChild(playAgainButton);
}
// ********storing the result in local storae****
function storing(highestTime) {
  const resultArr = storingChecking(highestTime);
  console.log(resultArr);
  const table = document.querySelector('.table');

  for (let index = 0; index < resultArr.length; index++) {
    const tableRow = document.createElement('tr');
    const tableData = document.createElement('td');
    const tableData2 = document.createElement('td');

    tableRow.className = "score-board";
    tableData.textContent = `${index + 1}`;


    // console.log(JSON.parse(localStorage.getItem(resultArr[index])));

    tableData2.textContent = `${resultArr[index]}`;

    table.appendChild(tableRow);
    tableRow.appendChild(tableData);
    tableRow.appendChild(tableData2);

  }
}
// ********CHECKING LOCAL STORAGE ****************
function storingChecking(highestTime) {
  let local = [];
  if (localStorage.getItem('result')) {
    localStorage.setItem('result', highestTime);

    local.push(JSON.parse(localStorage.getItem('result')));
  }
  else {
    local.push(highestTime);
    localStorage.setItem('result', JSON.stringify(highestTime))
  }
  console.log(local)
  return local;
}