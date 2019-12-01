let key = "906f5798";
let baseUrl = `http://www.omdbapi.com/?apikey=${key}&`;

let searchInput = document.getElementById("search");
let searchButton = document.getElementById("search-button");
let resultContainer = document.getElementById("result-container");
let realPagination = document.getElementById("pagination");
let currentPage = document.getElementsByClassName("pageNo");

//window.location.href=""; <-- change URL, more correctly with hash or history-push-states // read up

searchButton.addEventListener("click", function(){executeOnSearch()});
searchInput.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      executeOnSearch();
    }
});




function executeOnSearch() {
    let query = searchInput.value;          //careful !!! if you have elements p or div, you go with .innerText, for input and textarea use value !!

    let initialSearchUrl = baseUrl+ `s=${query}&`;
    console.log("initialSearchUrl  "+initialSearchUrl)
    createSearchResults(initialSearchUrl);
    }

function executeOnPageClick(paginationUrl) {
        event.preventDefault();
        console.log("paginationUrl  "+paginationUrl);
        createSearchResults(paginationUrl);
      
      
    
}

function createSearchResults(url) {
    
    let xhttp = new XMLHttpRequest(); //set new class, instance

    xhttp.onreadystatechange = function () { // callback function
        if(this.readyState === 4) {            // 4 is final state 
            if (this.status === 200) {         // status
                let response = JSON.parse(this.response);
                resultContainer.innerHTML = "";

                let results = response.Search;
                let totalResults = response.totalResults;
                
               // console.log(totalResults);
               // console.log(response);

                realPagination.innerHTML = "";
                let pageCounter = 0;

                //pagination
                for (let i = 9;i<=totalResults;i+=10){
                    pageCounter+=1;
                    let page = document.createElement("a");
                    page.innerText = pageCounter;
                    page.setAttribute("class","pageNo");
                    page.setAttribute("href", `${url}page=${pageCounter}&`); // set JSON path
                    page.setAttribute("onclick",executeOnPageClick());
                    page.innerText+="  ";
                    page.addEventListener("click", function(){executeOnPageClick(page.href)}); // Q: if i set this, I get some results, but function is executed immediatelly, not on click!
                    realPagination.appendChild(page);
                    
                 
                 
                }
                
                //search results
                 results.forEach(element => {
                 
                    let resultItem = document.createElement("div");
                    let resultTitle = document. createElement("span");
                    let resultImage = document.createElement("img");
                    
                    resultTitle.innerText = element.Title;
                    resultTitle.setAttribute("class","title");
                                     
                    resultImage.setAttribute("src",element.Poster);
                    resultImage.setAttribute("width", 200);
                    
                    resultItem.setAttribute("class","item");
                    resultItem.appendChild(resultImage);
                    resultItem.appendChild(resultTitle);
                    
                    
                    resultContainer.appendChild(resultItem);
                                      
                    });
                    
            //error handling
            } else {
                console.log("Error: "
                + "Status code:" + this.status 
                + "Something went wrong!")
            } 
        }
}
    
    
    xhttp.open("Get",url, true); //async code generate get object request
    xhttp.send(); //async send request (has 4 iterations before it's completed)


}















