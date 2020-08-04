import React from 'react';
import { Track } from '../Track/Track.js';
import './TrackList.css';


// A component representing a list of tricks. In this project this means either search results or the customised playlist.
export class TrackList extends React.Component {
    // Return an array representing elements in the tracks property
    render() {
        let array;
        if(this.props.tracks) {
            array = this.props.tracks.map(x => <Track key={x.id} track={x} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />);
        }
        return(
            <div className="TrackList">
                {array}
            </div>
        );
    }
}