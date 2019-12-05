
// Matej
// meal input

//variables add getElementByClass
let var_date_time = document.getElementById("date_time");
let var_food_intake = document.getElementById("food_intake");
let var_kcal = document.getElementById("kcal");
let food_input = []; //storage for all foods - replace with local storage

//eventListeners
let btn_save = document.getElementById("btn_save");
btn_save.addEventListener("click", function(){meal_input();});



function meal_input() {
    let readLocalStorage = JSON.parse(localStorage.getItem("meal"));
    // define meal
    let meal = {date_time:var_date_time.value, food_intake: var_food_intake.value, kcal: var_kcal.value};
    
    // if there is no entry in local storage, create array with first entry
    if (localStorage.getItem("meal") == undefined) {
        food_input.push(meal);
        localStorage.setItem("meal", JSON.stringify(food_input));
        return console.log("1st Meal in DB!");
    } else { // if entry in local storage exists, add current meal to array
        food_input=readLocalStorage;
        food_input.push(meal);
        localStorage.removeItem("meal");
        localStorage.setItem("meal", JSON.stringify(food_input));
        return console.log("another Meal in DB!");
    }
};

// Ziga
// Show food results

//declaration
let food_results = document.getElementById("food_results")
let btn_show = document.getElementById("btn_show")
let date_input = document.getElementById("date_input")
food_input = JSON.parse(localStorage.getItem("meal"));

//button and function that lists all meals from local storage
btn_show.addEventListener("click", function () {
    food_results.innerHTML = "";
    food_input.forEach(function(item) {
    
//list meals with selected date
    if (item.date_time === date_input.value) {
        let food_item= document.createElement("p")
        food_item.innerText=(item.food_intake + "  =  " + item.kcal + "kalorij")
        food_results.appendChild(food_item);
    }  
})

// after listing check food_results div and if no results, show No results text
let food_no_results = document.getElementById("food_results");

if (food_no_results.value == undefined) {
    let food_item= document.createElement("p")
    food_item.innerText=("No food inputs this day.")
    food_results.appendChild(food_item);
}
})


// Beni
// store ITM to local storage

//declaration + button + function
let btn_value=document.getElementById("btn_itm");
btn_value.addEventListener("click",function itm_calc(){
let weight_user=document.getElementById("weight_user");
let height_user=document.getElementById("height_user");
let date_itm = document.getElementById("date_itm");

let height_2= height_user.value*height_user.value;
let itm_input = [];

//calculation of ITM
let itm_user=Math.floor((weight_user.value/height_2)*10000);
let itm_measurement = {date_itm:date_itm.value, itm_user:itm_user.value};
     
// store to local storage
let readLocalStorage = JSON.parse(localStorage.getItem("itm"));

// if there is no entry in local storage, create array with first entry
if (localStorage.getItem("itm") == undefined) {
    itm_input.push(itm_measurement);
    localStorage.setItem("itm", JSON.stringify(itm_input));
    return console.log("1st ITM in DB!");
} else { // if entry in local storage exists, add current itm measurement to array
    itm_input=readLocalStorage;
    itm_input.push(itm_measurement);
    localStorage.removeItem("itm");
    localStorage.setItem("itm", JSON.stringify(itm_input));
    return console.log("another ITM in DB!");
}
});

// Lili
// Show graph of ITMs in time
//whole different beast, need to npm chart.js, then import, figure out how to do all bundling, require etc 
//after that, create similar read from local storage, forEach loop and plot one dot on the graph

// to-do
// after that, figure out how to build js file and chart.js through NPM
// migrate to another, fresh project without all bloatware and create a build process
// bullet proofing
// add time for input meal for better tracking throughout the day
// styling of p output 