//Guess a number - game

// in
let numberTextbox = document.getElementById("textboxNumber");
numberTextbox.onkeydown = function (e) { if (e.keyCode == 13) { e.preventDefault(); } };     // prevent multiline, cancel Enter button action
let randomNumber = Math.floor(Math.random() * 100);
let counter = 0;

// css interaction
let containerMain = document.getElementById("container");
containerMain.classList.add("undefined");
// out
let highLow = document.getElementsByClassName("highLow")[0];


// main function
guessNumber = () => {
    // css madness
    containerMain.classList.remove("success");
    containerMain.classList.add("undefined");

    // bullet-proofing
    (numberTextbox.value > 100) ? highLow.textContent = "Input a number lower or equal to 100!"
        : (numberTextbox.value < 0) ? highLow.textContent = "Input a number higher or equal to 0!"
            : isNaN(numberTextbox.value) ? highLow.textContent = "Stop writting letters!"
                
                // business logic
                : (Number(numberTextbox.value) == randomNumber) ? guessSuccess() // call another function because there are multiple lines of code, unsupported in ternary operators
                    : (Number(numberTextbox.value) > randomNumber) ? highLow.textContent = "You guessed too high, try a lower number!"
                        : (Number(numberTextbox.value) < randomNumber) ? highLow.textContent = "You guessed too low, try a higher number!"
                            : console.log("seems like you found a nieche case, good for you!");

    //   test tool - uncomment to see what selected number is !                     Q: How can we solve that with appendChild (without setting dedicated <p> in .html)
    let showNumber = document.getElementById("testID");
    showNumber.textContent = randomNumber;
}

guessSuccess = () => {
    counter += 1;
    highLow.textContent = `CONGRATS! You won ${counter} times. Wanna try again?`;
    randomNumber = Math.floor(Math.random() * 100);             // success, create another Random number and try again
    containerMain.classList.remove("undefined");                //css madness
    containerMain.classList.add("success");
}

//execute on input change
numberTextbox.addEventListener("input", guessNumber);