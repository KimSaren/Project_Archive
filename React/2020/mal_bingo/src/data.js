/**
 * 
 * @param {string} input - the string type name of the title, supposedly
 */
export async function getRawData(input) {
    let url = "https://api.jikan.moe/v3/search/anime?q=" + input;
    const rawData = await getJSON(url);
    return rawData;
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

export function isDuplicate(array, string) {
    for(let i = 0; i < array.length; ++i) {
        if(string === array[i]) {
            return i;
        }
    }
    return -1;
}

export function clearActiveState(array) {
    for(let i = 0; i < array.length; ++i) {
        if(array[i] !== 2) {
            array[i] = 0;
        }
    }
    return array;
}

export function clearCrosses(array) {
    for(let i = 0; i < array.length; ++i) {
        array[i] = 0;
    }
    return array;
}