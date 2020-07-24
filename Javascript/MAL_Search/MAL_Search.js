/**
  * Fetches data from an URL by using window.fetch.
  * @param {string} url - URL from which the data is fetched
  * @returns {Promise} promise - the fetched data
  */
function getJSON(url) {
    // Saving fetch to a variable
    let promise = fetch(url)
      // The response will become a new promise
      .then(function(response) {
        return response.json();
      })
    // Returning a promise
    return promise;
}

// Event listeners for the form
document.getElementById('searchbar').addEventListener('input',inputHandler);
document.getElementById('anime-search').addEventListener('submit', (e) => e.preventDefault());

/**
 * 
 * @param {string} input - the string type name of the title, supposedly
 */
async function getRawData(input) {
    let url = "https://api.jikan.moe/v3/search/anime?q=" + input;
    const rawData = await getJSON(url);
    return rawData;
}

/**
 * 
 * @param {Object} data - Object containing information of a series
 */
function getTitleName(data) {
    return data.title;
}

/**
 * 
 * @param {Object} data - Object containing information of a series
 */
function getImageUrl(data) {
    return data.image_url;
}

/**
 * 
 * @param {Object} data - Object containing information of a series
 */
function getSynopsis(data) {
    return data.synopsis;
}

/**
 * 
 * @param {Object} data - Object containing information of a series
 */
function getLink(data) {
    return data.url;
}

/**
 * 
 * @param {string} input - the string input from the user
 * @param {Object} results - an Object of all the series and the information
 */
function getSeries(input, results) {
    for(let key of Object.keys(results)) {
        if(input == getTitleName(results[key])) {
            return results[key];
        }
    }
    return undefined;
}

/**
 * 
 * @param {Object} series - the Object containing the information on the series
 */
function buildTableRow(series) {
    return `<tr><td class = "title"><a href = "${getLink(series)}"  target = "_blank">${getTitleName(series)}</td></a><td class = "image"><img src = "${getImageUrl(series)}" class = "myImg"></td><td class = "synopsis"><div class = "synopsis">${getSynopsis(series)}</div></td></tr>`
}

/**
 * 
 * @param {dataList} list - the datalist to be emptied
 */
function emptyDataList(list) {
    for(let i = list.options.length-1; i>=0; i--) {
        list.removeChild(list.options[i]);
    }
    return list;
}

/**
 * 
 * @param {Object} results - the Object containing information of the series
 */
async function fillDataList(results) {
    let list = document.getElementById("searchresults");
    // Check that the datalist exists in the first place
    if(list) {
        // Emptying the existing list
        list = emptyDataList(list);
        // Filling the datalist with new options
        for(let key of Object.keys(results)) {
            let option = document.createElement("option");
            option.appendChild(document.createTextNode(getTitleName(results[key])));
            list.appendChild(option);
        }
    }
}

/**
 * 
 * @param {*} e - the input event
 */
async function inputHandler(e) {
    // Preventing the default action
    e.preventDefault();
    // Variables for the input in the search field
    let search = document.getElementById("searchbar");
    let input = search.value;
    // The search box is not null
    if(search) {
        // Fetch the JSON from JIKAN and format tablerows with the information
        let data = await getRawData(input);
        // If there are results, we shall use them to build our table rows
        if(Object.keys(data.results).length > 0) {
            await fillDataList(data.results);
        }
        let series = getSeries(input, data.results);
        if(series != undefined) {
            let rows = buildTableRow(series);
            let tb = document.getElementsByTagName("tbody");
            if(tb) {
                // Add the new row to the table body
                rows = rows + tb[0].innerHTML;
                tb[0].innerHTML = rows;
                // Empty the search field
                document.getElementById("searchbar").value = "";
                // Empty the datalist
                emptyDataList(document.getElementById("searchresults"));
                // Add the modals to the images
                imageHandler();
            }
        }
    }
}

// Eventlistener-like function that adds a modal box functionality to all images present
let images = document.getElementsByClassName("myImg");

function imageHandler() {
    // Get the modal
    let modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    console.log(Object.keys(images));
    for(key of Object.keys(images)) {
        img = images[key];
        let modalImg = document.getElementById("img01");
        let captionText = document.getElementById("caption");
        img.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }
}