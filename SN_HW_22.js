//declaration of variables
//in
let numberToConvert = document.getElementById("textboxNumber");
    numberToConvert.onkeydown = function (e) {if (e.keyCode == 13) { e.preventDefault();}};     //prevent multiline, cancel Enter button action
let enterUnitText = document.getElementById("enterUnitText");
enterUnitText.textContent="Enter your kilometers here:"
//out
let conversionResult = document.getElementById("conversionResult");
let unit = document.getElementsByClassName("unit")[0];
unit.textContent="  kilometers";
//radio buttons
let speed = document.getElementsByName("speed");
let selectedSpeed;

//main conversion function
calculateMiles = () => {
//check what radio button is selected
    for(var i = 0; i < speed.length; i++) {
        if(speed[i].checked)
            selectedSpeed = speed[i].value;
      }

    //show pre-conversion units
    if (selectedSpeed === "miles") {
        unit.textContent = "  kilometers";
    } else {
        unit.textContent = "  miles";
    }

    //text enhancement
    enterUnitText.textContent="Enter your "+unit.textContent+" here:"

    if (isNaN(numberToConvert.value)) {conversionResult.textContent="Stop writting letters!";   //bulletproofing to avoid NaN
    } else if (numberToConvert.value !== "" && selectedSpeed === "miles"){                      //conversion to miles
        conversionResult.textContent = Math.round(numberToConvert.value * 0.621371*100)/100+" "+selectedSpeed;
    } else if (numberToConvert.value !== "" && selectedSpeed === "kilometers"){                 //conversion to kilometers
        conversionResult.textContent = Math.round(numberToConvert.value * 1.60934*100)/100+" "+selectedSpeed;
    } else {
        conversionResult.textContent = "Enter some numbers to convert!";                        //ifEmpty
    }}

//execute on change
numberToConvert.addEventListener("input",calculateMiles);
speed[0].addEventListener("click", calculateMiles);
speed[1].addEventListener("click", calculateMiles);