//inputs
let key = "906f5798";
let baseUrl = `http://www.omdbapi.com/?apikey=${key}&`;

let searchInput = document.getElementById("search");                // searchInputBar
let searchButton = document.getElementById("search-button");        // searchButton
let resultContainer = document.getElementById("result-container");  // htmlResultsContainer
let realPagination = document.getElementById("pagination");         // pagination-buttons
let realPagination_a = document.getElementById("pagination-a");     // pagination-span

// URL creation - TODO
// window.location.href=""; <-- change URL, more correctly with hash or history-push-states // read up

//EventListers
searchButton.addEventListener("click", function(){executeOnSearch()}); // execute Search OMDB on searchButton
searchInput.addEventListener("keypress", function (e) {                // execute Search OMDB on enter key in searchInputBar
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      executeOnSearch();
    }
});


// I created DUAL paginations, each containing multiple elements (buttons AND spans) with the same class (one for buttons and another for spans). 
// This code is needed for checking which element was selected AND extracting appropriate URL from the element
// This was c/p from stackOverflow - read what it actually does
if (document.addEventListener) {
    document.addEventListener("click", handleClick, false); // I have no idea what this part does either.
}
else if (document.attachEvent) {
    document.attachEvent("onclick", handleClick); // I have no idea what this part does either.
}

function handleClick(event) {
    
    event = event || window.event;
    event.target = event.target || event.srcElement;

    var element = event.target;
    // Checks document tree and checks which element was selected
    while (element) {
        if (element.nodeName === "BUTTON" && /button/.test(element.className)) { // This part checks buttons and retrieves href part
            let wwwUrl=element.getAttribute("href");
            executeOnSearch(wwwUrl);
            break;
        } else if (/pageNo/.test(element.className)) {
            let wwwUrl=element.getAttribute("url");   // This part checks spans and extracts url part and ... 
            executeOnSearch(wwwUrl); // ... I couldn't use href because it returned JSON object and I couldn't use event.preventDefault(); with this implementation
            break;
        }

        element = element.parentNode; // I have no idea what this part does either.
    }  
}

// This function creates correct JSON url for two different scenarios; 1) for initial search and 2) from search from pagination (both buttons and spans use same function)
function executeOnSearch(selectedPage) {           
    let query = searchInput.value;          // careful !!! if you have elements p or div, you go with .innerText, for input and textarea use value !!
    let SearchUrl = "";
    
    if (selectedPage === undefined) {       // selected page returns undefined with every new search ...
        SearchUrl = baseUrl+ `s=${query}&`;
      } else {
        SearchUrl = baseUrl+`s=${query}&`+selectedPage; // ...and page url extension from every pagination request

    }
    createSearchResults(SearchUrl); // run search OMDB function
}

// This function runs search and creates HTML schema for both paginations and search results
// Needs to be revisited to extract search (GET) part from write HTML (POST?) part. Not today.
function createSearchResults(url) {
    
    let xhttp = new XMLHttpRequest(); //set new class, instance

    xhttp.onreadystatechange = function () { // callback function
        if(this.readyState === 4) {            // 4 is final state 
            if (this.status === 200) {         // status 200, OK
                let response = JSON.parse(this.response);
                resultContainer.innerHTML = "";             // clear search results and pagination areas before new content is loaded on the page
                realPagination.innerHTML = "";
                realPagination_a.innerHTML="";

                let results = response.Search;              // results = array of 10 objects; response is bigger object with multiple parameters. Search part contains array of results.
                let totalResults = response.totalResults;   // another parameter from response that tells us all results
                let pageCounter = 0;                        // pagination counter reset switch

                // Show simple error if there are no results for a specific search.
                if (results === undefined) {
                    let resultItem = document.createElement("div");
                    resultItem.setAttribute("class","item");
                    resultItem.innerText="Could not find movies!";
                    resultContainer.appendChild(resultItem);
                    return false;
                }
                
                // Here real heavy lifting begins

                // Pagination HTML generation
                for (let i = 9;i<=totalResults;i+=10){ //my version covers 0-9 due to API response, could be reworked into i=0... // also could not use forEach since API doesn't return an array
                    pageCounter+=1; // since initial state of the switch is 0, counter is applied before all busines logic to provide correct pagination and stop for loop accordingly
                   
                    // SPAN Pagination 
                    let pageA = document.createElement("span"); // CSS .pageNo{cursor: pointer;} is implemented to make this SPAN clickable. I tried <a> for 3h without success. This seems to work.
                    pageA.innerText = pageCounter;
                    pageA.setAttribute("class","pageNo");
                    pageA.setAttribute("url", `page=${pageCounter}&`);  // set JSON path
                    pageA.innerText+="  ";                              // this is just space for nicer layout
                   // Q: NOT NEEDED IN ORDER THIS FUNCTION TO WORK BUT... if i set this, I get some results, but function is executed immediatelly, not on click! WHY?
                    // pageA.addEventListener("click", function(){executeOnPageClick(page.href)}); 
                    realPagination_a.appendChild(pageA); 
                    
                    // BUTTON Pagination
                    let page = document.createElement("button");
                    page.innerText=pageCounter;
                    page.setAttribute("class","button");
                    page.setAttribute("href", `page=${pageCounter}&`);
                    realPagination.appendChild(page);
                                     
                }

                // Search results HTML generation 
                 results.forEach(element => {
                 
                    // HTML layout setup: Up to 10 Items go into Container (1 page). Each Item has Title and Poster Image
                    let resultItem = document.createElement("div");
                    resultItem.setAttribute("class","item");
                    let resultTitle = document. createElement("span");
                    let resultImage = document.createElement("img");
                    
                    resultTitle.innerText = element.Title;
                    resultTitle.setAttribute("class","title");
                    
                    if (element.Poster==="N/A") {                   // simple check if Poster Image is missing. Error is still triggered in the console, don't know how to handle that!                            
                        resultImage.setAttribute("height",300);
                        resultImage.setAttribute("width", 200);
                    } else {
                        resultImage.setAttribute("src",element.Poster);
                        resultImage.setAttribute("width",200);
                    }
                    
                    // Append part
                    resultItem.appendChild(resultImage);
                    resultItem.appendChild(resultTitle);                 
                    resultContainer.appendChild(resultItem);
                                      
                    });
                    
            // Error handling
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