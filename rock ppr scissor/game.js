const userSelectionImg = [
    {
        id: "rock",
        img: "/RPS-GAME.IMG/left_rock-removebg-preview.png"
    },
    {
        id: "paper",
        img: "/RPS-GAME.IMG/left_ppr-removebg-preview.png"
    },
    {
        id: "scissor",
        img: "/RPS-GAME.IMG/left_scissor-removebg-preview.png"
    }
];
const compSelectionImg = [
    {
        id: "rock",
        img: "/RPS-GAME.IMG/right_rock-removebg-preview.png"
    },
    {
        id: "paper",
        img: "/RPS-GAME.IMG/right_ppr-removebg-preview.png"
    },
    {
        id: "scissor",
        img: "/RPS-GAME.IMG/right_scissor-removebg-preview.png"
    }
];
const btns = document.querySelectorAll(".btn");
const userImg = document.querySelector('.user-img');
const computerImg = document.querySelector('.computer-img');
const result = document.querySelector('.curr-result');
const ttlWon = document.getElementById("ttl-won");
const ttllose = document.getElementById("ttl-lose");
const ttldraw = document.getElementById("ttl-draw");

let countForWon = 0;
let countForLose = 0;
let countForDraw = 0;
btns.forEach((btn) => {
    btn.addEventListener('click', function (e) {

        // ************* bringing dataset from the input given by user by clicking button ..
        // * and filtering the img and mapping the image in 
        const userTarget = e.currentTarget.dataset.id;
        userImgLoader(userSelectionImg, userTarget);


        // ********bringing random number for random picture 
        const randomNumber = Math.floor(Math.random() * compSelectionImg.length)
        const randomImg = compSelectionImg[randomNumber];

        randomCompImg(randomImg);

        comparing(randomImg, userTarget);





    })
})

function userImgLoader(arr, target) {
    const targetUserItem = arr.filter((item) => {
        if (item.id === target) {
            return item;
        }
    }).map((item) => {
        const img = item.img;
        return img;
    })

    return userImg.innerHTML = `<img src="${targetUserItem}" alt="">`;

}
function randomCompImg(randomImg) {
    return computerImg.innerHTML = `<img src="${randomImg.img}" alt="">`
};



function comparing(randomItem, userTarget) {
    
    const randomImgTarget = randomItem.id;
    console.log(randomImgTarget)
    if (userTarget === "rock" && randomImgTarget === "paper") {
        result.innerHTML = `YOU LOSE!!`;
        countForLose++
       return ttllose.innerHTML=`${countForLose}`;
    }
    else if ((userTarget === "rock" && randomImgTarget === "scissor")) {
        result.innerHTML = `YOU WIN!!`;
        countForWon++;
      return  ttlWon.innerHTML=`${countForWon}`;
    } else if (userTarget === "paper" && randomImgTarget === "rock") {
        result.innerHTML = `YOU WIN!!`;
        countForWon++;
       return ttlWon.innerHTML=`${countForWon}`;
    } else if ((userTarget === "paper" && randomImgTarget === "scissor")) {
        result.innerHTML = `YOU LOSE!!`;
        countForLose++
      return    ttllose.innerHTML=`${countForLose}`;
    } else if (userTarget === "scissor" && randomImgTarget === "rock") {
        result.innerHTML = `YOU LOSE!!`;
        countForLose++
       return  ttllose.innerHTML=`${countForLose}`;
    } else if ((userTarget === "scissor" && randomImgTarget === "paper")) {
        result.innerHTML = `YOU WIN!!`;
        countForWon++;
     return  ttlWon.innerHTML=`${countForWon}`;
    } else {
        result.innerHTML = `DRAW!!`;
        countForDraw++;
    return   ttldraw.innerHTML=`${countForDraw}`;

    }

}

// function comparing(randomItem, userTarget) {
//     // by switch 

//     const randomImgTarget = randomItem.id;
//     switch (userTarget + randomImgTarget) {
//         case "rockscissor":
//         case "paperrock":
//         case "scissorpaper":
//             result.innerHTML = `YOU WIN!!`;
//             countForWon++;
//             break;


//         case "scissorrock":
//         case "rockpaper":
//         case "paperscissor":
//             result.innerHTML = `YOU lOSE!!`;
//             countForLose++
//             break;


//         default:
//             result.innerHTML = `DRAW!!`;
//             countForDraw++;
//             break;
//     }
//     console.log(countForDraw);
//     console.log(countForLose);
//     console.log(countForWon);
// }