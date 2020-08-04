import React from 'react';
import { SearchBar } from './SearchBar/SearchBar.js';
import { SearchResults } from './SearchResults/SearchResults.js';
import { PlayList } from './PlayList/PlayList.js';
import './App.css';
import { Spotify } from '../../util/Spotify.js'


// The main component representing the Spotify PlayListSaver application
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [
        {
          name: 'Never Gonna Give You Up',
          artist: 'Rick Astley',
          album: 'Whenever you need somebody',
          id: '4uLU6hMCjMI75M1A2tKUQC'
        }
      ],
      playListName: 'New PlayList',
      playListTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  // A method for adding a song to the playlist
  addTrack(track) {
    // Check whether the track is already included in the list
    let duplicate = this.state.playListTracks.find(savedTrack => savedTrack.id === track.id);

    // If the track is not a duplicate, we add it to the list
    if(!duplicate) {
      let new_array = this.state.playListTracks;
      new_array[new_array.length] = track;
      this.setState({playListTracks: new_array});
    }
  }


  // A method for removing a track from the playlist
  removeTrack(track) {
    // Check whether the track is included in the list and save the index
    let index = this.state.playListTracks.findIndex(savedTrack => (savedTrack.id === track.id));

    // If the track is on the list, it can be removed
    if(index > -1) {
      // Make a copy of the array with the element at the listed index removed
      let new_array = [];
      let new_index = 0;
      for(let i = 0; i < this.state.playListTracks.length; ++i) {
        if(i !== index) {
          new_array[new_index] = this.state.playListTracks[i];
          new_index++;
        }
      }
      this.setState({playListTracks: new_array});
    }
  }


  // A method for updating the name of the playlist
  updatePlayListName(name) {
    this.setState({playListName: name});
  }


  // A method for saving the playlist to Spotify
  savePlayList() {
    // Get the URIs of the tracks in an array
    const trackURIs = this.state.playListTracks.map(track => {
      let uri = 'spotify:track:' + track.id;
      return uri;
    });

    // Take the name in a variable
    let name = this.state.playListName;

    // First reset the state values, then callback the save
    this.setState({
      playListName: 'New PlayList',
      playListTracks: []
    }, () => {
      Spotify.savePlayList(name, trackURIs);
    });
  }


  // Asynchronous function for searching for a term from the Spotify WEB API
  async search(search) {
    try {
      // Search for the results
      let results = await Spotify.search(search)  
      let items = results["tracks"]["items"];
      let new_results = [];
      // Array the results approprietly by track name, artist name, album and id
      for(let i = 0; i < items.length; ++i) {
        let new_object = {
          name: items[i].name,
          artist: items[i].artists[0].name,
          album: items[i].album.name,
          id: items[i].id
        };
        new_results[i] = new_object;
      }

      // Set the state
      this.setState({searchResults: new_results}, () => {
        console.log("Our new search results: ", this.state.searchResults);
      });
    }

    catch(error) {}
  }

  // Title and a multitude of components will be represented: searchbar, searchresults and the playlist. All the components will be controlled by this main component.
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <PlayList playListName={this.state.playListName} playListTracks={this.state.playListTracks} onRemove={this.removeTrack} onNameChange={this.updatePlayListName} onSave={this.savePlayList} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
