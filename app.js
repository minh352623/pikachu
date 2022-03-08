const cardsArray = [
  {
    name: "fire",
    img: "img/fire.png",
  },
  {
    name: "youtube",
    img: "img/youtube.png",
  },
  {
    name: "flash",
    img: "img/flash.png",
  },
  {
    name: "gift",
    img: "img/gift.png",
  },
  {
    name: "tron",
    img: "img/tron.png",
  },
  {
    name: "ufo",
    img: "img/ufo.png",
  },
  {
    name: "plant",
    img: "img/plant.png",
  },
  {
    name: "burger",
    img: "img/burger.png",
  },
];
const grid = document.querySelector(".grid");
const modal = document.querySelector(".modal");
//để nhớ thẻ đã click trước đó
let previousItem;
//
let count = 0;
let firstGuess = "";
let secondGuess = "";
function generateCard() {
    grid.innerHTML = "";
  //công thức random phần tử trong mảng:sort(() => 0.5 - Math.random())
  const cardArrayMerge = cardsArray
    .concat(cardsArray)
    .sort(() => 0.5 - Math.random());
  cardArrayMerge.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-name", item.name); //cách 1
    // cart.dataset.name = item.name;//cách 2

    const front = document.createElement("div");
    const back = document.createElement("div");
    //front card
    front.className = "front";
    card.appendChild(front);
    //back card
    back.className = "back";
    card.appendChild(back);
    back.style.backgroundImage = `url(${item.img})`;
    grid.appendChild(card);
  });
}
generateCard();
function matchingCart() {
  const selecteds = document.querySelectorAll(".selected");
  [...selecteds].forEach((item) => item.classList.add("matched"));
}

function resetGuess() {
  const selecteds = document.querySelectorAll(".selected");
  [...selecteds].forEach((item) => item.classList.remove("selected"));
  count = 0;
  firstGuess = "";
  secondGuess = "";
  previousItem = null;
  const matcheds = document.querySelectorAll(".matched");
  const cardLength = document.querySelectorAll(".card").length;
  if (matcheds.length === cardLength) {
    modal.classList.add("active");
    modal.addEventListener("click", function(e){
        
        if(e.target.matches(".yes")){
            modal.classList.remove("active");
            matcheds.forEach((item) => item.classList.remove("matched"));
            generateCard();
            
        }else if(e.target.matches(".no")){
            matcheds.forEach((item) => item.classList.remove("matched"));
            generateCard();
            alert("chơi tiếp đi game hay mà");
            modal.classList.remove("active");

        }
    }) 
    
  }
}

grid.addEventListener("click", function (e) {
  const clicked = e.target;
  if (
    clicked.nodeName === "SECTION" ||
    previousItem === clicked ||
    clicked.parentNode.classList.contains("selected") ||
    clicked.parentNode.classList.contains("matched")
  ) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    }
    // clicked.classList.add("matched");
    if (firstGuess !== "" && secondGuess !== "") {
      if (firstGuess === secondGuess) {
        setTimeout(matchingCart, 500);
      }
      setTimeout(resetGuess, 500);
    }
    previousItem = clicked;
  }
});
