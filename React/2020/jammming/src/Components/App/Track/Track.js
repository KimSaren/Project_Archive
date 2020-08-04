import React from 'react';
import './Track.css'

// A component representing a single track in a tracklist
export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    // Method for determining which kind of a button will be rendered: either one with a "+" or a "-" marker and corresponding onclick methods
    renderAction() {
        let plusMinus = this.props.isRemoval === true ? '-' : '+'
        if(plusMinus === '+') {
            return <button className="Track-action" onClick={this.addTrack}>{plusMinus}</button>;
        }
        else {
            return <button className="Track-action" onClick={this.removeTrack}>{plusMinus}</button>;
        }
    }

    // Method for adding the track in the playlist
    addTrack() {
        this.props.onAdd(this.props.track);
    }

    // Method for removing the track from the playlist
    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    // Track name, attributes and the appropriate button will be rendered
    render() {
        return(
            <div className="Track">
            <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p>
            </div>
            {/*<button className="Track-action"><!-- + or - will go here --></button>*/}
            {this.renderAction()}
            </div>
        );
    }
}