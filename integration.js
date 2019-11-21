//find array
let texts = document.getElementsByClassName("text-center");

//show lenght and array
console.log(texts.length);


// obarvaj vsak drugi text drugače
/* if (texts.length > 0) {
    for (let i = 0; i < texts.length; i++) {
        let currentElement = texts[i];

        if (i % 2 === 0) {
            currentElement.classList.add("success");
        } else {
            currentElement.classList.add("fail");
        }
    }
} */

//hide every second text
/* if (texts.length > 0) {
    for (let i = 0; i < texts.length; i++) {
        let currentElement = texts[i];

        if (i % 2 === 0) {
            currentElement.classList.add("success");
        } else {
            currentElement.classList.add("hidden");
        }
    }
} */

//show 1st element and write it
texts = document.getElementsByClassName("text-center")[0].textContent;
console.log(texts);



//show windows width, height - wievport
console.log(window.innerHeight, window.innerWidth)

//snowflaks
//let windowHeight = window.innerHeight;
//let windowWidth = window.innerWidth;

windowHeight = 1000;
windowWidth = 1900;

for (let i = 0; i < 500; i++) {
    let snowflake = document.createElement("p");
    snowflake.classList.add("snowflake");
    snowflake.innerText = "*";
    let width = Math.random() * 100;
    snowflake.setAttribute("style", "left:" + width + "px;")
    //add new snowflake to the body html
    document.body.appendChild(snowflake);
}

let snowflakes = document.getElementsByClassName("snowflake");


setInterval(function () {
    for (let i = 0; i < snowflakes.length; i++) {
        let snowflake = snowflakes[i];
        console.log(snowflake.getBoundingClientRect().left, snowflake.getBoundingClientRect().top);

        let y = snowflake.getBoundingClientRect().top;
        let x = snowflake.getBoundingClientRect().left;

        if (x < windowWidth && y < windowHeight) {
            let width = x + Math.random() * 10;
            let height = y + Math.random() * 10;
            snowflake.setAttribute("style", "left:" + width + "px; top:" + height + "px;")
        } else {
            let width = Math.random() * 1900;
            snowflake.setAttribute("style", "left:" + width + "px; top:" + 10 + "px;")
        }
    }
}, 100);






