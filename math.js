const RATES = {
"DDV-max" : 1.22,
"DDV-min" : 1.095
}

function calcTax(price){
    return price * getTaxRate("DDV-max");
};

function getTaxRate(rate){
/*
return rate === undefined || rate === "DDV"
? 1.22
:1.095;
*/

if (Object.keys(RATES).indexOf(rate) === -1) {
 console.log(rate);
    rate = "DDV-max";
}
console.log(rate);
    return RATES[rate];

};