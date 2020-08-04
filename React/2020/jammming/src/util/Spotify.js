// Global variables used within the module
let accessToken;
const client_id = "9be9fe90c93e4f03ad67c1175dd6a9bc";
const redirect_uri = "http://mySpotifyPlayListDomain.surge.sh";


// The spotify module to be imported later; contains three relevant methods for searchign and
//  passing information between our application and Spotify
let Spotify = {
    // This method is for getting the implicit access token for the API
    getAccessToken() {
        // If the token has a "truthy" value
        if(accessToken) {
            return accessToken;
        }
        // Second conditional: the access token and expiration time can be found in the url
        else if(window.location.href.match(/access_token=([^&]*)/) && (window.location.href.match(/expires_in=([^&]*)/))) {
            // Get the access token from the url
            let match = window.location.href.match(/access_token=([^&]*)/);
            accessToken = match[1];
            let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

            // Clear the accessToken after expiration time
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            
            return accessToken;
        }
        // If the access token is empty and the link does not contain it
        else {
            let url = "https://accounts.spotify.com/authorize?client_id=" + client_id + "&response_type=token&scope=playlist-modify-public&redirect_uri=" + redirect_uri;
            window.location=url;
            return accessToken;
        }
    },

    // This method is called upon searching for a term: returns json information
    async search(term) {
        // Try to fetch the search data from Spotify API using the access token provided as a header
        let promise = await fetch("https://api.spotify.com/v1/search?type=track&q=" + term,
        {
            headers: {'Authorization': 'Bearer ' + accessToken}
        })
        // Then JSONify the information received
        .then(function(response) {
            return response.json();
        })
        return promise;
    },

    // This method is called to save a Playlist to Spotify
    async savePlayList(playlist,uri_array) {
        console.log("Attempting to save the playlist: ", playlist, uri_array);
        if((playlist) && (uri_array)) {
            // The variables
            let token = accessToken;
            let headers = {'Authorization': 'Bearer ' + token};
            let user_id;

            // First fetch: get the the user id
            let promise = await fetch("https://api.spotify.com/v1/me", {
                headers: headers,
                method: 'GET'
            })
            .then(function(response) {
                return response.json();
            })
            user_id = promise.id;

            // Second fetch: create the playlist to the corresponsinf user
            let post_promise = await fetch("https://api.spotify.com/v1/users/" + user_id + "/playlists", {
                headers: headers,
                contentType: 'application/json',
                method: 'POST',
                body: JSON.stringify({
                    'name': playlist
                })
            })
            .then(function(response) {
                return response.json();
            })
            let playlistID = post_promise.id;

            // Third fetch: link the list of songs to the playlist
            post_promise = await fetch("https://api.spotify.com/v1/users/" + user_id + "/playlists/" + playlistID + "/tracks", {
                headers: headers,
                contentType: 'application/json',
                method: 'POST',
                body: JSON.stringify({
                    'uris': uri_array
                })
            })
            .then(function(response) {
                return response.json();
            })
            playlistID = post_promise.id;
        }
        return;
    }
};

// Run this once by default to get the global access token upon execution of this application
Spotify.getAccessToken();

// Export this module
export { Spotify };