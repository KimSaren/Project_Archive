import React from 'react';
import './SearchBar.css';

// Component representing the searchbar
export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {term: ''};
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    // onclick method for searching the term in the searchbar
    search() {
        console.log("Trying to search for the term: ", this.state.term);
        this.props.onSearch(this.state.term);
    }

    // Method to allow controlled user inputs in the searchbar
    handleTermChange(event) {
        this.setState({term: event.target.value});
        
    }

    // A searchbar with an appropriate submit button will be rendered
    render() {
        return(
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        );
    }
}