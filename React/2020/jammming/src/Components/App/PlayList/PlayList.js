import React from 'react';
import { TrackList } from '../TrackList/TrackList.js';
import './PlayList.css';

// A component representing the users customised playlist
export class PlayList extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    // Method allowing controlled user inputs for the playlist name
    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    // The title, sumbit button and the playlist element will be rendered
    render() {
        console.log("The playlist: ", this.props.playListTracks);
        return(
        <div className="Playlist">
            <input value={this.props.playListName} onChange={this.handleNameChange} />
            <TrackList tracks={this.props.playListTracks} onRemove={this.props.onRemove} isRemoval={true} />
            <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
        </div>
        );
    }
}