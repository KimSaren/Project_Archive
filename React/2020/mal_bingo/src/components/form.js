import React from 'react';
import { Data } from '../data';

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            data: [],
            title: '',
            url: ''
        };
        this.formHandler = this.formHandler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }

    async formHandler(e) {
        // First we must update the controlled input element
        this.setState({value: e.target.value}, async () => {
            // Take the search in a variable to ease reading this junction of code
            let search = this.state.value;
            // the search must be non-null
            if(search) {
                // Fetch the JSON data from JIKAN
                let data = await Data.getRawData(search);
                // If there are results, we shall build the table rows
                if(Object.keys(data.results).length > 0) {
                    // our new data will be stored in a variable
                    let new_data = [], i = 0;
                    for(let key of Object.keys(data.results)) {
                        let title = data.results[key].title;
                        let img_url = data.results[key].image_url;
                        new_data[i] = {title, img_url};
                        ++i;
                    }
                    // Set the data and then render
                    this.setState({data: new_data});
                }
            }
        });             
    }

    inputHandler(e) {
        e.preventDefault();
        let input = this.state.value;
        let datalist = document.getElementById("searchresults").childNodes;
        document.getElementById("searchbar").innerHTML = '';
        for(let i = 0; i < datalist.length; ++i) {
            if(datalist[i].value === input) {
                let title = datalist[i].value;
                let image = datalist[i].getAttribute('url');
                this.setState({data: [], value: ''});  
                this.props.handleSubmit(title,image);   
            }
        }
    }

    render() {
        return(
            <div>
                <form name = "anime-search" id = "anime-search" onSubmit={this.inputHandler} >
                    <label htmlFor = "searchbar" className = "item">Title search:</label>
                    <input type = "text" id = "searchbar" list = "searchresults" value={this.state.value} onChange={this.formHandler} />
                    <datalist id = "searchresults">{this.state.data.map((item) => <option key={item["title"]} value={item["title"]} url={item["img_url"]} />)}</datalist>
                </form>
            </div>
        );
    }
}