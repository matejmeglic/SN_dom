// //forEach loop - encouraged by ECMA 6

// let array =[1,2,3,4,5];

// array.forEach(function(item) {
//     console.log(item);
// })

// //same result would happen with the following for loop

// for(let i = 0; i<array.length;i++) {
//     console.log(array[i]);
// }


// eventListeners

document.getElementById("myFirstButton")
        .addEventListener("click", function(event) {  // there are a lot of actions we can track (click, keypress, mouseover, mouseout...)
            // correct usage of concatenationa

            let text = "a" + "b";
            let nekText = `${text}`;       // check if this is supported by all major browsers
            // alert(nekText);             // show msgbox with ok button, 
            // alternative to msgbox is confirm() - has OK|cancel buttons
            let confirmed = confirm(nekText);
            if(confirmed ===true) {
                console.log("Jeeej");
            } else {
                console.log("Neeej");
            }
        });


document.getElementById("search")
        .addEventListener("keypress", function(event){  // execute on every keypress
        if (event.which === 13) {                       // which = extract ASCII on enter key (except for ESC, updownleftright and some other function button) ; 13 = enter key
            console.log(event);
        }                       
});

document.getElementById("search").value = "TEXT!"; // definiranje besedila v input 


// cookie
let userSettings = {
    "language" :"en",
    "volume" : 100,
    "bg-color": "#123456"
}

document.cookie = JSON.stringify(userSettings); //save as JSON text, to read use JSON.parse() - not currently working in Chrome, check in Firefox - smth with domain
// or simple as below
document.cookie ="language=en";

// cache
localStorage.setItem("userSettings", JSON.stringify(userSettings));

console.log(JSON.parse(localStorage.getItem("userSettings"))); // read from localstorage - even if you comment let userSetting, this still works because it's saved on hardDrive

console.log(localStorage.getItem("userSettings") !== null
? JSON.parse(localStorage.getItem("userSettings"))
: "not existing");
