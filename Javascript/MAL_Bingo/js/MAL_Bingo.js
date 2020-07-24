/**
 * Initializer function to be called upon the execution of the script: numbers the cells and adds a dynamic functionality to the table cells.
 * To be exact: a cell will be marked as active upon click, but not crossed.
 */
(() => {
    let table = document.getElementById("bingo");
    if(table.classList.contains("initializer")) {
        enableCells();
        numberAllCells();
        table.classList.remove("initializer");
    }
})();

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
document.getElementById('searchbar').addEventListener('input', formHandler);
document.getElementById('anime-search').addEventListener('submit', (e) => e.preventDefault());

// Event listeners for the buttons
document.getElementById("clear").addEventListener('click', clearTable);
document.getElementById("random").addEventListener('click', randomize);
document.getElementById("play").addEventListener('click', playMode);
document.getElementById("sheet").addEventListener('click', sheetFillMode);

// Checking whether a bingo exists
document.getElementById("bingo").addEventListener('click',findBingo);

/**
 * 
 * @param {string} input - the string type name of the title, supposedly
 */
async function getRawData(input) {
    let url = "https://api.jikan.moe/v3/search/anime?q=" + input;
    const rawData = await getJSON(url);
    return rawData;
}

/* THE GETTERS FOR ACCESSING INFORMATION ON THE SERIES */

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
 * @param {Object} results - the Object containing information of the series
 */
async function fillDataList(results) {
    // Check that the datalist exists in the first place
    if(document.getElementById("searchresults")) {
        // Emptying the existing list
        document.getElementById("searchresults").innerHTML = '';
        // Filling the datalist with new options
        for(let key of Object.keys(results)) {
            let option = document.createElement("option");
            option.appendChild(document.createTextNode(getTitleName(results[key])));
            document.getElementById("searchresults").appendChild(option);
        }
    }
}

/**
 * 
 * @param {HTMLElement} cell - a td element containing a table cell
 */
function getCellNumber(cell) {
    let table = document.getElementById("bingo");
    for(let i = 0; i < table.rows.length; ++i) {
        for(let j = 0; j < table.rows[i].cells.length; ++j) {
            if(cell === table.rows[i].cells[j]) {
                return (i*5 + j);
            }
        }
    }
    return undefined;
}

/**
 * 
 * @param {int} int - an integer for the summarized index in the table
 */
function getListItem(int) {
    let items = document.getElementsByTagName("li");
    for(let i = 0; i < items.length; ++i) {
        if(i == int) {
            return items[i];
        }
    }
}

function getCellAtIndex(index) {
    let table = document.getElementById("bingo");
    let i = 0;
    if((index >= 0) && (index < (table.rows.length * table.rows[0].cells.length))) {
        while(index >= table.rows[0].cells.length) {
            ++i;
            index = index - table.rows[0].cells.length;
        }
        return table.rows[i].cells[index];
    }
}



/* THE SETTERS FOR SETTING THE STATE OF THE DOM IN THE HTML */
/**
 * 
 */
function setInactive() {
    let cells = document.getElementsByTagName("td");
    for(let i = 0; i < cells.length; ++i) {
        if(cells[i].id != "reserved")
            cells[i].id = "inactive";
    }
}

/**
 * 
 */
function setInactiveItems() {
    let items = document.getElementsByTagName("li");
    for(let i = 0; i < items.length; ++i) {
        if(items[i].id != "reserved")
            items[i].id = "";
    }
}

/**
 * 
 * @param {HTMLElement} cell - a td node for a table cell
 */
function setActive(cell) {
    setInactive();
    setInactiveItems();
    cell.id = "active";
    let int = getCellNumber(cell);
    let listItem = getListItem(int);
    listItem.id = "active-item";
}

/**
 * 
 * @param {HTMLElement} cell - a td node for a table cell
 */
function activateNext(cell) {
    let table = document.getElementById("bingo");
    let int = getCellNumber(cell) + 1;
    for(let i = 0; i < table.rows.length; ++i) {
        for (let j = 0; j < table.rows[i].cells.length; ++j) {
            if(((i*5)+j) == int) {
                if(table.rows[i].cells[j].id != "reserved") {
                    setActive(table.rows[i].cells[j]);
                }
                else {
                    setActive(table.rows[i].cells[j+1]);
                }
                i = table.rows.length;
                break;
                
            }
            else if((i == table.rows.length-1) && (j == table.rows[i].cells.length-1)) {
                setInactive();
                setInactiveItems();
            }
        }
    }
}

/* MISCELLANEOUS FUNCTIONS - BITS AND BOBS */

/**
 * A function for adding dynamic functionality to the table cells: mark as active upon click, but not crossed
 */
function enableCells() {
    let table = document.getElementById("bingo");
    if (table != null) {
        for (let i = 0; i < table.rows.length; i++) {
            for (let j = 0; j < table.rows[i].cells.length; ++j)
            table.rows[i].cells[j].onclick = function () {
                if((this.id != "active") && (this.id != "reserved")) {
                    setActive(this);
                }
                else {
                    setInactive();
                }
            };
        }
    }
}


/**
 * A function for determining whether a title is unique on the list
 * @param {string} title - title of the series
 * @return {int} - returns an integer index of a reoccurring title or -1 if none was found
 */
function isUnique(title) {
    let selectedItems = document.getElementsByTagName("li");
    for(let i = 0; i < selectedItems.length; ++i) {
        let value = selectedItems[i].innerText;
        if(title == value) {
            return i;
        }
    }
    return -1;
}

/**
 * The function for adding a series to the table and the list
 * @param {string} input - title of the series
 * @param {Object} data - the data of the series
 */
function addSeries(input, data) {
    let series = getSeries(input, data.results);
    if(series != undefined) {
        // Check whether the title is a reoccurring one in the bingo
        let index = isUnique(getTitleName(series));
        let notify = document.getElementsByClassName("notifications");
        // Check whether the title already exists on the list: if it does, we shall remove the older input
        if(index > -1) {
            let cell = getCellAtIndex(index);
            cell.innerHTML = "";
            let listItem = getListItem(index);
            listItem.innerText = "";
            notify[0].innerText = `Title by the name of ${getTitleName(series)} reoccurred and was moved!`
            numberOneCell(cell);
        }
        else {
            notify[0].innerText = "";
        }
        let activeCell = document.getElementById("active");
        if(activeCell == null) {
            activeCell = document.getElementsByTagName("td")[0];
            setActive(activeCell);
        }
        // Get the cell number of the ActiveCell
        let int = getCellNumber(activeCell);
        activeCell.innerHTML = `<img src = ${getImageUrl(series)} class = "image1">`;
        // Number this cell with the corresponding cell number
        numberOneCell(activeCell);
        // Get the corresponding list item
        let item = getListItem(int);
        // Update the information on the list item
        item.innerText = getTitleName(series);
        // Activate the next cell
        activateNext(activeCell);
        // Empty the search field
        document.getElementById("searchbar").value = "";
        // Empty the datalist
        document.getElementById("searchresults").innerHTML = "";
    }
}

function clearNotifications() {
    let notices = document.getElementsByClassName("notifications");
    notices[0].innerText = "";
}

/**
 * Numbers a singular table cell
 * @param {HTMLElement} cell - table cell
 */
function numberOneCell(cell) {
    let int = getCellNumber(cell)+1;
    cell.innerHTML = `<div class = "text-container">` + cell.innerHTML + `<div class = "top-left">${int}.</div></div>`;
}

/**
 * Numbers all table cells
 */
function numberAllCells() {
    let table = document.getElementById("bingo");
    for(let i = 0; i < table.rows.length; ++i) {
        for(let j = 0; j < table.rows[i].cells.length; ++j) {
            if(table.rows[i].cells[j].id != "reserved") {
                let int = getCellNumber(table.rows[i].cells[j]) + 1;
                table.rows[i].cells[j].innerHTML = `<div class = "text-container">` + table.rows[i].cells[j].innerHTML + `<div class = "top-left">${int}.</div></div>`;
            }
        }
    }
}

/**
 * A function for splitting the HTML of an image in the bingo table
 * @param {string} str - outerHTML of a HTML element
 */
function sliceImage(str) {
    let index_one = str.search("<img");
    let index_two = str.search(`<div class="top-left`);
    let new_str = str.slice(index_one,index_two);
    return new_str;
}

/**
 * A function for shuffling table rows or columns
 * @param {ArrayObject} array - an array of table cells
 */
function shuffleArray(array) {
    // Get the list first
    let list = document.getElementsByTagName("li");
    for(let i = array.length-1; i > 0; --i) {
        // Returns a number lower than (i+1) and rounds it down to an integer
        let j = Math.floor(Math.random()*(i+1));
        // Swap anything but the reserved cell
        if((array[i].id != "reserved") && (array[j].id != "reserved")) {
            // Remove the number tags first and swap the cells
            let temp = sliceImage(array[i].outerHTML);
            array[i].innerHTML = sliceImage(array[j].outerHTML);
            array[j].innerHTML = temp;
            // Number the cells after the swap
            numberAllCells();
            // And finally swap the list items as well
            temp = list[i].innerText;
            list[i].innerText = list[j].innerText;
            list[j].innerText = temp;
        }
    }
}

function enableCrosses() {
    let table = document.getElementById("bingo");
    // Inactivate the table and the list options
    setInactive();
    setInactiveItems();
    // This section of code adds onclick functions for setting crossed table cells
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; ++j)
        table.rows[i].cells[j].onclick = function() {
            let number = getCellNumber(this);
            let options = document.getElementsByTagName("li");
            // If the cell is "crossed", it will be uncrossed
            if(this.classList.contains("crossed")) {
                this.classList.remove("crossed");
                let new_HTML = removeX(this.outerHTML);
                this.innerHTML = new_HTML;
                options[number].classList.remove("strikethrough");
            }
            // Otherwise, mark it "crossed"
            else {
                this.classList.add("crossed");
                let temp = sliceImage(this.outerHTML);
                this.innerHTML = `<div class = "text-container">${temp}<img src = "images/x_3.png" class = "image2"><div class = "top-left">${number+1}.</div></div>`;
                options[number].classList.add("strikethrough");
            }
        };
    }
}

/**
 * A function for removing the x from the HTML
 * @param {string} str - outerHTML of a HTML element
 */
function removeX(str) {
    let index_two = str.search(`<img src="images/x`);
    if(index_two > -1) {
        let part1 = str.slice(0,index_two);
        let index_one = str.search(`<div class="top-left`);
        index_two = str.length;
        let part2 = str.slice(index_one,index_two);
        let new_str = part1 + part2;
        return new_str;
    }
    // Return the parameter string in-case nothing was changed
    return str;
}

function removeAllX() {
    let table = document.getElementById("bingo");
    let options = document.getElementsByTagName("li");
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; ++j) {
            let new_HTML = removeX(table.rows[i].cells[j].outerHTML);
            table.rows[i].cells[j].innerHTML = new_HTML;
            table.rows[i].cells[j].classList.remove("crossed");
            let number = getCellNumber(table.rows[i].cells[j]);
            options[number].classList.remove("strikethrough");
        }
    }
}


function markBingo(index) {
    let options = document.getElementsByClassName("bingo-options");
    if(!options[index].classList.contains("strikethrough")) {
        options[index].classList.add("strikethrough");
        document.getElementById("bingo-notices").innerText = "Bingo!";
    }
}

function unMark(index) {
    let options = document.getElementsByClassName("bingo-options");
    options[index].classList.remove("strikethrough");
}

function unMarkAll() {
    let options = document.getElementsByClassName("bingo-options");
    for(let i = 0; i < options.length; ++i) {
        unMark(i);
    }
}

function bingoTotal() {
    let options = document.getElementsByClassName("bingo-options");
    let total = 0;
    for(let i = 0; i < options.length; ++i) {
        if(options[i].classList.contains("strikethrough")) {
            ++total;
        }
    }
    return total;
}

function updateTotal(number) {
    let total = document.getElementById("total").innerText = "Total: " + number;
}

function checkIntegrity() {
    let table = document.getElementById("bingo");
    let options = document.getElementsByClassName("bingo-options");
    for(let i = 0; i < options.length; ++i) {
        if(options[i].classList.contains("strikethrough")) {
            if(i < 5) {
                for(let j = 0; j < table.rows[0].cells.length; ++j) {
                    if(!table.rows[i].cells[j].classList.contains("strikethrough")) {
                        unMark(i);
                    }
                }
            }
            else if(i < 10) {
                for(let j = 0; j < table.rows.length; ++j) {
                    if(!table.rows[j].cells[i-5].classList.contains("strikethrough")) {
                        unMark(i);
                    }
                }
            }
            else if(i == 11) {
                for(let j = 0; j < 5; ++j) {
                    if(!table.rows[j].cells[j].classList.contains("strikethrough")) {
                        unMark(i);
                    }
                }
            }
            else {
                for(let j = 0; j < 5; ++j) {
                    if(!table.rows[j].cells[4-j].classList.contains("strikethrough")) {
                        unMark(i);
                    }
                }
            }
        }
    }
}

function findBingo() {
    checkIntegrity();
    document.getElementById("bingo-notices").innerText = "";
    let table = document.getElementById("bingo");
    // Check the verticals
    for(let i = 0; i < table.rows.length; ++i) {
        for(let j = 0; j < table.rows[i].cells.length; ++j) {
            if(!table.rows[i].cells[j].classList.contains("crossed")) {
                break;
            }
            else if(j == table.rows[i].cells.length-1) {
                markBingo(i);
            }
        }
    }
    // Check the horizontals
    for(let i = 0; i < table.rows[0].cells.length; ++i) {
        for(let j = 0; j < table.rows.length; ++j) {
            if(!table.rows[j].cells[i].classList.contains("crossed")) {
                break;
            }
            else if(j == table.rows.length-1) {
                markBingo(i+5);
            }
        }
    }
    // And lastly check the diagonals
    for(let i = 0; i < table.rows.length; ++i) {
        if(!table.rows[i].cells[i].classList.contains("crossed")) {
            break;
        }
        else if(i == table.rows.length-1) {
            markBingo(10);
        }
    }
    for(let i = 0; i < table.rows.length; ++i) {
        if(!table.rows[i].cells[4-i].classList.contains("crossed")) {
            break;
        }
        else if(i == table.rows.length-1) {
            markBingo(11);
        }
    }

    // Update the total
    updateTotal(bingoTotal());
}


// FUNCTIONS SPECIFIC FOR INPUTHANDLING

/**
 * 
 * @param {*} e - the input event
 */
async function formHandler(e) {
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

        search.addEventListener("input", function(e){
            // Check whether the call was an "event" or an "inputEvent"
            let isInputEvent = (Object.prototype.toString.call(e).indexOf("InputEvent") > -1);
            // If an object was selected from the list
            if(!isInputEvent)
                addSeries(e.target.value, data);
        }, false);
    }
}

/**
 * A function for clearing all table cells and list items
 */
function clearTable() {
    let table = document.getElementById("bingo");
    let items = document.getElementsByTagName("li");
    // Start by setting everything inactive and clearing the notification log
    setInactive();
    setInactiveItems();
    clearNotifications();
    // Then let's clear the table
    for(let i = 0; i < table.rows.length; ++i) {
        for(let j = 0; j < table.rows[i].cells.length; ++j) {
            if(table.rows[i].cells[j].id != "reserved") {
                table.rows[i].cells[j].innerHTML = "";
            }
        }
    }
    // Number all the cells afterwards
    numberAllCells();
    // Finally clear the list items and be done with it
    for(let i = 0; i < items.length; ++i) {
        if(items[i].id != "reserved") {
            items[i].innerHTML = "";
        }
    }
}

/**
 * Function for randomizing the table of cells
 */
function randomize() {
    // Set everything inactive first
    setInactive();
    setInactiveItems();
    // Then randomize the cells and items
    let cells = document.getElementsByTagName("td");
    shuffleArray(cells);
}

/**
 * An event handler for the play button
 */
function playMode() {
    // Delete the form
    document.getElementById("anime-search").classList.add("hidden");
    // Hide the excess buttons
    let buttons = document.getElementsByTagName("button");
    buttons[0].classList.add("hidden");
    buttons[1].classList.add("hidden");
    buttons[2].classList.add("hidden");
    buttons[3].classList.remove("hidden");
    // Show the bingo list
    document.getElementById("bingo-lines").classList.remove("hidden");
    // Show the bingo notifications
    document.getElementById("bingo-notifications").classList.remove("hidden");
    // Update the right-most information panel by hiding old paragraphs and showing the relevant ones
    document.getElementById("information-header").innerHTML = `<u>Game information</u>`;
    let paragraphs = document.getElementsByClassName("information-paragraph");
    paragraphs[0].classList.add("hidden");
    paragraphs[1].classList.add("hidden");
    paragraphs[2].classList.add("hidden");
    paragraphs[3].classList.remove("hidden");
    paragraphs[4].classList.remove("hidden");
    paragraphs[5].classList.remove("hidden");
    // Hide the duplicate notice
    document.getElementsByClassName("notifications")[0].innerText = "";
    // Margin to the table
    document.getElementById("bingo").classList.add("playing");
    // Put the table in the state of "playing"
    document.getElementById("bingo").classList.add("playing");
    // Switch to the "crosses" mode
    enableCrosses();
}

/**
 * A function for returning to the sheet fill mode
 */
function sheetFillMode() {
    // Put the table off from the "play mode"
    document.getElementById("bingo").classList.remove("playing");
    // Update the right-most information panel by hiding old paragraphs and showing the relevant ones
    document.getElementById("information-header").innerHTML = `<u>General information</u>`;
    let paragraphs = document.getElementsByClassName("information-paragraph");
    paragraphs[0].classList.remove("hidden");
    paragraphs[1].classList.remove("hidden");
    paragraphs[2].classList.remove("hidden");
    paragraphs[3].classList.add("hidden");
    paragraphs[4].classList.add("hidden");
    paragraphs[5].classList.add("hidden");
    // Hide the bingo notifications and reset its content
    document.getElementById("bingo-notices").innerText = "";
    document.getElementById("bingo-notifications").classList.add("hidden");
    // Hide the bingo list
    document.getElementById("bingo-lines").classList.add("hidden");
    // Show the form again
    document.getElementById("anime-search").classList.remove("hidden");
    // Show the corresponding buttons again
    let buttons = document.getElementsByTagName("button");
    buttons[0].classList.remove("hidden");
    buttons[1].classList.remove("hidden");
    buttons[2].classList.remove("hidden");
    buttons[3].classList.add("hidden");
    // Empty the bingo sheet
    unMarkAll();
    // Resetting bingo total
    updateTotal(bingoTotal());
    // Enable the cell activation, remove the Xs
    enableCells();
    removeAllX();
}