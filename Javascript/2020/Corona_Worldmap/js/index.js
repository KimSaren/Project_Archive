// Countries that have some anomalities in their names (such as special chars, brackets, or multiple variants) are collected here
const INITIAL_CODES = {
    Brunei: "BRN",
    "Mainland China": "CHN",
    US: "USA",
    Iran: "IRN",
    "South Korea": "KOR",
    "Korea, South": "KOR",
    Korea: "KOR",
    "Taiwan*": "TWN",
    UK: "GBR",
    "United Kingdom": "GBR",
    Czechia: "CZE",
    Russia: "RUS",
    "United Arab Emirates": "UAE",
    Macau: "MAC",
    "North Macedonia": "MKD",
    Venezuela: "VEN",
    Vietnam: "VNM",
    "Cote d'Ivoire": "CIV",
    "West Bank and Gaza": "PSE",
    Kosovo: "KOS",
    "Congo (Kinshasa)": "COD",
    "Congo (Brazzaville)": "COG",
    Tanzania: "TZA",
    Burma: "MMR",
    Syria: "SYR",
    Laos: "LAO",
    Eswatini: "SWZ"
  };
  const DEFAULT_FILL = "#EEEEEE";
  
  /*
   * Setting up the website
   */
  
  // The maps used within this script,containing different information on the countries
  let codeMap, caseMap, nMap;
  
  // An empty datamap to be updated later
  let dmap = new Datamap({
    element: document.getElementById('datamap_container'),
    fills: {
        defaultFill: DEFAULT_FILL
      }
  });
  
  // Public variables used in the time series -animation
  let tsMap = null;
  let date = new Date();
  
  // The interval used for the time series animation
  let interval;
  
  // Flag variable used in the time series
  let flag;
  
  // Fetching the necessary files for the map here
  (async () => {
  
      // Countries
      const countries = await getJSON(`${config.baseURL}countries`);
      codeMap = countryCodeMap(countries, INITIAL_CODES);
      fillDataList(codeMap);
  
      // Cases within countries
      const cases = await getJSON(`${config.baseURL}corona`);
      caseMap = mapCasesWithCountrycodes(cases, codeMap);
  
      // Changing the datamap to represent the current state in the world
      buildDataMap();
  
      // Neighbouring countries
      const rawNeighbours = await getJSON(`${config.baseURL}neighbours`);
      nMap = mapNeighbours(rawNeighbours);
  
      // Time series
      const times = await getJSON(`${config.baseURL}corona/timeseries`);
      tsMap = times;
  })();
  
  // Event listeners for the dynamic functionalities on the website
  document.getElementById('country').addEventListener('input', inputHandler => updateFormMap());
  document.getElementById('country').addEventListener('input', inputHandler);
  document.getElementById('countryform').addEventListener('submit', (e) => e.preventDefault());
  
  // Initializing the timeseries-button
  let submit = document.getElementById('timeseries');
  submit.addEventListener('click', submitHandler);
  
  
  
  
  /*
   * The functions
   */
  
  /**
   * @param {Array<Object>} cases - All corona cases returned from the API
   * @param {Array<Object>} countries - codeMap
   * @returns {Object} - Map of country codes to corona cases in the country
   */
  function mapCasesWithCountrycodes(cases, countries) {
    // New object for the map and variables for the keys
    let map = new Object();
    let keys = Object.keys(cases);
    let keys2 = Object.keys(countries);
    for(let i = 0; i < keys.length; i++) {
      // Empty string to be filled later
      let cname = "";
      // Removing unnecessary characters
      for(let j = 0; j < keys[i].length; j++) {
        if(keys[i].charAt(j) != "_") {
          cname = cname + keys[i].charAt(j);
        }
        else {
          cname = cname + " ";
        }
      }
      // Is the name in the map?
      for(let country of Object.keys(countries)) {
        // Name found
        if(cname == country) {
          let key = countries[country];
          map[key] = new Object();
          map[key]["confirmed"] = cases[keys[i]]["confirmed"];
          map[key]["deaths"] = cases[keys[i]]["deaths"];
          map[key]["recovered"] = cases[keys[i]]["recovered"];
          map[key]["country"] = cname;
        }
      }
    }
    return map;
  }
  
  /**
   * @param {} e - the input event
   */
  function inputHandler(e) {
    // Preventing the default method
    e.preventDefault();
    // Variables for the input and keys
    let input = document.getElementById("country");
    let inp = "";
    // Check that input is not null
    if(input) {
      inp = input.value;
      // Is the input in the country map?
      for(let country of Object.keys(codeMap)) {
        // Found the input
        if(inp == country) {
          // Building the tablerow
          let mystring = constructTableRow(codeMap[country]);
          let tb = document.getElementsByTagName("tbody");
          // Check for null values
          if(tb) {
            // Adding it to the tbody
            mystring = mystring + tb[0].innerHTML;
            tb[0].innerHTML = mystring;
            // Attempting to sort the table
            tb[0] = sortTable();
            // Emptying the search field
            document.getElementById("country").value = "";
          }
        }
      }
    }
  }
  
  /**
   * Modifies the country data so that it is compatible between different end-points.
   *
   * @param {Array<Object>} countries - All countries returned from the API
   * @param {Array<Object>} initialCodes - Countries that need to be changed
   * @returns {Object} - Map of country names to country codes
   */
  function countryCodeMap(countries, initialCodes) {
    // Creating a weak copy
    let cMap = Object.assign(initialCodes);
    // Going through the API interface
    for(let country of Object.keys(countries)) {
      // Getting rid of the extras within parentheses
      let str = countries[country]["name"].split(" (");
      let cname = str[0];
      let ccode = countries[country]["alpha3Code"];
      // Adding a new value to the codemap
      cMap[cname] = ccode;
    }
    // Sorting the map alphabetically by keys
    cMap = alphabeticalSort(cMap);
    // Returning the filled map
    return cMap;
  }
  
  /**
   * Fills datalist with country names
   *
   * @param {Array<Object>} cMap - Country codes and names
   */
  function fillDataList(cMap) {
    // Initializing the variables
    let keys = Object.keys(cMap);
    let select = document.getElementById("searchresults");
    // Check that the searchresults exists
    if(select) {
      // Emptying the existing list of options
      for(let i = select.options.length-1; i >= 0; i--) {
        select.removeChild(select.options[i]);
      }
      // Filling the new list of options
      for(let i = 0; i < keys.length; i++) {
        let opt = document.createElement("option");
        opt.appendChild(document.createTextNode(cMap[keys[i]]));
        opt.value = keys[i];
        select.appendChild(opt);
      }
    }
  }
  
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
  
  /**
   * Sorts a given map in alphabetical order
   * @param {Object} map - a map object containing countries
   * @returns {Object} newMap - a new map sorted in an alphabetical order
   */
  function alphabeticalSort(map) {
    // Variable to the keys and a weak copy of the map
    let keys = Object.keys(map);
    let newMap = new Object;
    // Sorting keys alphabetically
    keys.sort();
    // Creating a new map by the order of the sorted keys
    for(let i = 0; i < keys.length; i++) {
      newMap[keys[i]] = map[keys[i]];
    }
    // Returning the filled map
    return newMap;
  }
  
  /**
   * Sorts the table object
   * @returns {string} tb - the sorted table string
   */
  function sortTable() {
    // Saving tbody as a variable and taking the first country key
    let tb = document.getElementsByTagName("tbody")[0];
    if(tb) {
      let first = tb.rows[0].firstChild.innerText;
      let boolean = false;
      // Removing excess characters
      for(let i = 1; i < tb.rows.length; i++) {
        let comp = tb.rows[i].firstChild.innerText;
        if(first == comp) {
          tb.deleteRow(i);
          i--;
          boolean = true;
        }
      }
      // Sorting if there's a match
      if(boolean == true)
      {
        for(let i = 1; i < tb.rows.length; i++) {
          let counter = 0;
          // Inefficient bubble sort
          for(let j = 1; j < tb.rows.length-1; j++) {
            let comp1 = tb.rows[j].firstChild.innerText;
            let comp2 = tb.rows[j+1].firstChild.innerText;
            // Swap places
            if(comp1.localeCompare(comp2) > 0) {
              let tmp = tb.rows[j].innerHTML;
              tb.rows[j].innerHTML = tb.rows[j+1].innerHTML;
              tb.rows[j+1].innerHTML = tmp;
            }
            // Increasing the counter if there were no swaps
            else {
              counter++;
            }
          }
          // Breaking the loop if the table has been sorted
          if(counter == (tb.rows.length-2)) {
            break;
          }
        }
      }
  
      // Returning the sorted table
      return tb;
    }
    // if tb was null
    else {
      return undefined;
    }
  }
  
  /**
   * Gets a key from a given object
   * @param {Object} object - Object containing keys
   * @param {string} value - the value whose key we want returned
   * @returns {string} key - key of the value in the given object
   */
  function getKey(object, value) {
    // Reference to the key
    for(let ckey of Object.keys(object)) {
      // Returning a reference if the key is found on the list
      if(value == object[ckey]) {
        return ckey;
      }
    }
    // Else return undefined
    return undefined;
  }
  
  /**
   * Constructs a table row
   * @param {Object} object - Object containing keys
   * @returns {string} key - key of the value in the given object
   */
  function constructTableRow(code) {
    // Variables
    let el = caseMap[code];
    let str = "";
    // If the country key is found, use its information
    if(caseMap[code] != undefined) {
      // Update the string
      str = `<tr><td>${el["country"]}</td><td>${el["confirmed"]}</td><td>${el["deaths"]}</td><td>${el["recovered"]}</td></tr>`;
    }
    // Else search for it in the codeMap
    else if(getKey(codeMap,code) != undefined) {
      str = `<tr><td>${getKey(codeMap,code)}</td><td>-</td><td>-</td><td>-</td></tr>`
    }
    // Return either a filled or an empty string
    return str;
  }
  
  /**
   * Updates the country map to represent the current state of the form selection
   */
  function updateFormMap() {
    // The current selected map code
    let input = document.getElementById("country");
    let inp = "";
    // Check that input is not null
    if(input) {
      inp = input.value;
      for(let country of Object.keys(codeMap)) {
        // The code is in the map
        if(inp == country) {
          // Reset the map first
          resetMap();
          // get the country code
          let ccode = codeMap[country];
          // Update the color of the country in question first
          if(caseMap[ccode] != undefined) {
            let color = getColor(caseMap[ccode]["confirmed"],caseMap[ccode]["deaths"]);
            dmap.options.data[ccode] = color;
            dmap.updateChoropleth(dmap.options.data);
            console.log("Updating " + ccode + " " + color);
            console.log("Confirmed: " + caseMap[ccode]["confirmed"] + " Deaths: " + caseMap[ccode]["deaths"]);
          }
          else {
            dmap.options.data[ccode] = DEFAULT_FILL;
            dmap.updateChoropleth(dmap.options.data);
          }
          // Then update the colors of its neighbours via the nMap formed by the Neighbour function
          for(let i = 0; i < nMap[ccode].length; i++) {
            let ncode = nMap[ccode][i];
            if(caseMap[ncode] != undefined) {
              let color = getColor(caseMap[ncode]["confirmed"],caseMap[ncode]["deaths"]);
              dmap.options.data[ncode] = color;
              dmap.updateChoropleth(dmap.options.data);
              console.log("Updating " + nMap[ccode][i] + " " + color);
              console.log("Confirmed: " + caseMap[ncode]["confirmed"] + " Deaths: " + caseMap[ncode]["deaths"]);
            }
            else {
              dmap.options.data[ncode] = DEFAULT_FILL;
              dmap.updateChoropleth(dmap.options.data);
            }
          }
        }
      }
    }
  }
  
  
  /**
   * Builds the default datamap
   */
  function buildDataMap() {
    // Creating a p-element with the identity "date"
    let datamap_container = document.getElementById("datamap_container");
    let text = document.createElement("P");
    let date = new Date();
    text.setAttribute("id", "date");
    datamap_container.prepend(text);
    text.style.textAlign = "center";
    text.style.fontSize = "large";
  
    // Changing date to the preferred format
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear() - 2000;
  
    // The date as a string
    let strDate = month.toString() + "/" + day.toString() + "/" + year.toString();
  
    // Changing the date to the current day
    document.getElementById("date").innerHTML = strDate;
  
    for(let country of Object.keys(codeMap)) {
      // get the country code
      let ccode = codeMap[country];
      // Update the color of the country in question first
      if(caseMap[ccode] != undefined) {
        let color = getColor(caseMap[ccode]["confirmed"],caseMap[ccode]["deaths"]);
        dmap.options.data[ccode] = color;
        dmap.updateChoropleth(dmap.options.data);
        console.log("Initialization " + ccode + " " + color);
        console.log("Confirmed: " + caseMap[ccode]["confirmed"] + " Deaths: " + caseMap[ccode]["deaths"]);
      }
      else {
        dmap.options.data[ccode] = DEFAULT_FILL;
        dmap.updateChoropleth(dmap.options.data);
      }
    }
  }
  
  /**
   * Resets all colors in the datamap to DEFAULT_FILL
   */
  function resetMap() {
    for(let key of Object.keys(dmap.options.data)) {
      dmap.options.data[key] = DEFAULT_FILL;
    }
    dmap.updateChoropleth(dmap.options.data);
  }
  
  /**
   * Writes given text to console.log
   * @param {string} text Text to print out
   */
  const sayHello = (text) => console.log(text);
  
  /**
   * mapNeighbours arrow function returns neighbours of a country
   * as an associative array (i.e., object) where a key is a country codes and
   * the value is an array containing the neighbour country codes.
   * @param {json} rawNeighbours the parsed JSON content fetched from the API endpoint https://tie-lukioplus.rd.tuni.fi/corona/api/neighbours
   * @returns an object where keys are three-char country codes (alpha3codes), and the values are neighbour country codes as an array.
   */
  const mapNeighbours = (rawNeighbours) => {
    let map = new Object;
    for(let i = 0; i < rawNeighbours.length; i++) {
      let key = rawNeighbours[i]["alpha3Code"];
      let arr = new Array;
      for(let j = 0; j < rawNeighbours[i]["borders"].length; j++) {
        let neighbour = rawNeighbours[i]["borders"][j];
        arr.push(neighbour);
      }
      map[key] = arr;
    }
    return map;
  };
  
  /**
   * Helper function to parse an integer from a string
   * @param {string} str numeric string
   * @returns {number} parsed integer
   */
  const int = (str) => Number.parseInt(str);
  
  /**
   * Constructs a HSL color based on the given parameters.
   * The darker the color, the more alarming is the situation-
   * Hue gives the tone: blue indicates confirmed (hue 240), red indicates deaths (hue 360).
   * H: hue ranges between blue and red, i.e., 240..360.
   * S: saturation is constant (100)
   * L: lightness as a percentage between 0..100%, 0 dark .. 100 light
   * @param {confirmed} d The number of confirmed people having coronavirus
   * @param {deaths} d The number of dead people, 20 times more weight than confirmed
   * @return {color} a HSL color constructed based on confirmed and deaths
   */
  const getColor = (confirmed, deaths) => {
    const denominator = confirmed + deaths == 0 ? 1 : confirmed + deaths;
    const nominator = deaths ? deaths : 0;
    const hue = int(240 + 120 * nominator / denominator);
    const saturation = 100; //constant
  
    let weight = int(7 * Math.log(confirmed + 20 * deaths));
    weight = weight ? (weight > 100 ? 95 : weight) : 0;
  
    let lightness = 95 - weight;
    lightness = lightness < 0 ? 0 : lightness;
    return `hsl(${hue}, ${saturation}, ${lightness})`;
  };
  
  
  function liClick(){
    this.classList.toggle("done");
  }
  
  // Self-invoked function to avoid polluting global scope
  (() => {
    const helloIndex = "Hello from index.js!";
    sayHello(helloIndex);
  })();
  
  /**
   * Function getNewDate moves to the next day
   * 
   * @returns {Date} 
   */
  function getNewDate() {
    // Moving one day forward
    date.setDate(date.getDate() + 1);
    // Returning the new date
    return date;
  }
  
  /**
   * This method specify if the interval should stop or not
   * 
   * @param country 
   * @return truth value
   */
  function stopInterval(country) {
    let strDate = getDateString();
  
    let confirmed = tsMap.find(el => el.confirmed);
    let record = confirmed.confirmed.find(element => element["Country/Region"] === country);
  
    if (record[strDate] === undefined) {
      return true;
    } else {
      return false;
    }
  }
  
  /**
   * Function getConfirmed gets the number of confirmed corona cases in a country
   * on current date
   * 
   * @param country
   * @returns confirmed 
   */
  function getConfirmed(country) {
    // Initializing a flag
    let confirmedFlag = false;
    let number = 0;
    let strDate = getDateString();
  
    let confirmed = tsMap.find(el => el.confirmed);
  
    confirmed.confirmed.forEach (record => {
      if (record["Country/Region"].replace(/_/g, " ") === country){
        number = number + parseInt(record[strDate]);
        confirmedFlag = true;
      }
    });
    if (confirmedFlag) {
      return number;
    } else {
      return undefined;
    } 
  }
  
  
  /**
   * Function getCountry gets the number of deaths in a country
   * on current date
   * 
   * @param country
   * @returns deaths 
   */
  function getDeaths(country) {
    // Initializing a flag
    let deathsFlag = false;
    let number = 0;
    let strDate = getDateString();
  
    let deaths = tsMap.find(el => el.deaths);
  
    deaths.deaths.forEach (record => {
      if (record["Country/Region"].replace(/_/g, " ") === country) {
        number = number + parseInt(record[strDate]);
        deathsFlag = true;
      }
    });
    if (deathsFlag) {
      return number;
    } else {
      return undefined;
    }
  }
  
  /**
   * Function getDateString returns the current date as a string
   * 
   * @return strDate
   */
  function getDateString() {
    // Initializing variables for date, month and year
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear() - 2000;
  
    let strDate = month.toString() + "/" + day.toString() + "/" + year.toString();
    return strDate
  }
  
  
  /**
   * Function to update the datamap in the time series animation
   *
   */
  function updateDataMap() {
  console.log(date);
  
    // Getting the datamap container
    let datamap_container = document.getElementById("datamap_container");
  
    
    const distinctCountries = [...new Set(Object.keys(codeMap))];
    // Checking if the interval should be continued
    let key = Object.keys(codeMap)[0];
    if (stopInterval(key)) {
      clearInterval(interval);
    }
  
    // Continuation of the interval
    else {
      // The for loop is responsible of coloring the map approprietly
      for (let country of distinctCountries) {
        try {
          // Fetching data for each country
          let ccode = codeMap[country];
          let confirmed = getConfirmed(country);
          let deaths = getDeaths(country);
        
          // Skipping country names for codes that have been duplicated because 
          // of INITIAL_CODES and don't have values in the tsMap.
          if(confirmed !== undefined || deaths !== undefined) {
            // Updating the color of the country in question
            let color = getColor(confirmed, deaths);
            dmap.options.data[ccode] = color;
            dmap.updateChoropleth(dmap.options.data);
          }
        }
        catch (err) {
          // If there is no data for the country continue the loop
          continue;
        }
      }
    }
  
    // The first iteration does not change the date
    if(flag) {
      flag = false;
    }
  
    // But all subsequent intervals do
    else {
      // Get the new date at the beginnning of the interval
      getNewDate();
      // Changing the date
      document.getElementById("date").innerHTML = getDateString();
    }
  }
  
  
  /**
   * @param e the event
   */
  function submitHandler(e) {
    // Preventing the default action
    e.preventDefault();
  
    // Setting the starting date to 1/22/20
    date = new Date(2020, 0, 22);
    document.getElementById("date").innerHTML = getDateString(); 
  
    // Set the flag
    flag = true;
  
    // Update the default view first
    updateDataMap();
    
    // Setting intervals for updating the time series animation, this is staggered to start after 1000ms or so
    interval = setInterval(updateDataMap, 1000);
  }