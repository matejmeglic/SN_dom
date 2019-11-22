//define divs
let red = document.getElementById("red");
let yellow = document.getElementById("yellow");
let green = document.getElementById("green");

//change to color
changeToRed = ()  => {red.classList.add("red");}
changeToYellow = () => {yellow.classList.add("yellow");}
changeToGreen = () => {green.classList.add("green")}; 

//change back to black
changeToDark = () => {
    red.classList.remove("red");
    yellow.classList.remove("yellow");
    green.classList.remove("green");
 }

//define events (business logic)
red.addEventListener("mouseover", changeToRed);
red.addEventListener("mouseout", changeToDark);
yellow.addEventListener("mouseover", changeToYellow);
yellow.addEventListener("mouseout", changeToDark);
green.addEventListener("mouseover", changeToGreen);
green.addEventListener("mouseout", changeToDark);

