import React from 'react';
import './SearchResults.css';
import { TrackList } from '../TrackList/TrackList.js';

// Component for holding the search results from the searchbar search
export class SearchResults extends React.Component {
    // The title and a tracklist element will be rendered
    render() {
        return(
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />
            </div>
        );  
    }
}