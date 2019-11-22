let text = document.getElementsByClassName("text-center");
console.log(text[2].textContent);

let helloID = document.getElementById("hello");
helloID.textContent = "WRITE THIS!";
//helloID.className = "green-text";
helloID.classList.add("green-text");
helloID.classList.remove("green-text");
helloID.classList.add("blue-text");
helloID.style.textAlign="center";

// buttons with functions
function changeColor() {
    let myP = document.getElementById("hello");
    myP.classList.remove("blue-text");
    myP.classList.add("green-text");

}

//buttons with Event listeners
let blueButton = document.getElementById("blueButton");
blueButton.addEventListener("click", changeColor);