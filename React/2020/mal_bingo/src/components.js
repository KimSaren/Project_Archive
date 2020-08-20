import React from 'react';
import { getRawData } from './data';
import { isDuplicate } from './data';
import { clearActiveState } from './data';
import { clearCrosses } from './data';

export class Master extends React.Component {
    constructor(props) {
        super(props);
        // The initial state of the tiles. Everything is "inactive", except the center tile which is "reserved".
        let cells = [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0];
        let crossed = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        let titles = [];
        let images = [];
        titles.length = 25;
        images.length = 25;
        this.state = {
            cellState: cells,
            cellCrossed: crossed,
            cellTitles: titles,
            cellImages: images,
            gameMode: "sheet",
            notice: '',
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClickPlay = this.onClickPlay.bind(this);
    }

    handleClick(cellNumber,activeState,crossedState) {
        // Update the active state
        let active = clearActiveState(this.state.cellState);
        active[cellNumber] = activeState;
        // Update the crossed state
        let crossed = this.state.cellCrossed
        crossed[cellNumber] = crossedState;
        // Set the state, rendering done as a callback
        this.setState({
            cellState: active,
            cellCrossed: crossed
        },() => {
            this.render();
        });
    }

    handleSubmit(title, url) {
        // Find the active cell first, default value is 0
        let activeCellIndex = 0;
        for(let i = 0; i < this.state.cellState.length; ++i) {
            // Found an active cell
            if(this.state.cellState[i] === 1) {
                activeCellIndex = i;
            }
        }
        // Shallow copy of the arrays
        let titleArray = this.state.cellTitles;
        let imageArray = this.state.cellImages;
        let message = '';
        // Check for duplicates
        if(isDuplicate(this.state.cellTitles, title) !== -1) {
            let index = isDuplicate(this.state.cellTitles, title);
            titleArray[index] = '';
            imageArray[index] = '';
            message = 'Title by the name of ' + title + ' reoccurred and was moved.'
        }
        titleArray[activeCellIndex] = title;
        imageArray[activeCellIndex] = url;
        // Get a new active cell
        if(activeCellIndex !== 11) {
            activeCellIndex += 1;
        } else {
            activeCellIndex += 2;
        }
        let cells = clearActiveState(this.state.cellState);
        cells[activeCellIndex] = 1;
        // Change the currently selected title and url, then update
        this.setState({
            cellState: cells,
            cellTitles: titleArray,
            cellImages: imageArray,
            notice: message
        }, () => {
            this.render();
        });
    }

    onClickPlay() {
        // The state of the gameMode is swapped
        let new_state = this.state.gameMode === "sheet" ? "play" : "sheet";
        let bingoLines = this.state.bingoLineMode === "hidden" ? "" : "hidden";
        let warning;
        // We are going to display a confirm message first
        if(new_state === "sheet") {
            warning = "You are about to go back to filling the sheet. This will reset your bingo progress. Is this ok?";
        }
        else {
            warning = "Are you ready to play the game?";
        }
        if(window.confirm(warning)) {
            // Clear both crosses and active state upon clicking play
            let activeArray = clearActiveState(this.state.cellState);
            let crossArray = clearCrosses(this.state.cellCrossed);
            this.setState({
                cellState: activeArray,
                cellCrossed: crossArray,
                gameMode: new_state,
                bingoLineMode: bingoLines,
            });               
        }
    }

    render() {
        return(
            <div className="master">
                <Header />
                <div className="content">
                    <div className = "item1">
                        <InformationField mode={this.state.gameMode} />
                        <Buttons onClickPlay={this.onClickPlay} />
                        <BingoLines mode={this.state.gameMode} />
                    </div>
                    <div className = "item2">
                        <BingoNotifications />
                        <Form handleSubmit={this.handleSubmit} />
                        <Table cellState={this.state.cellState} cellCrossed={this.state.cellCrossed} cellTitles={this.state.cellTitles} cellImages={this.state.cellImages} handleClick={this.handleClick} gameMode={this.state.gameMode} />
                        <Notices value={this.state.notice} mode={this.state.noticeMode} />
                    </div>
                    <div className = "item3">
                        <List cellState={this.state.cellState} cellCrossed={this.state.cellCrossed} cellTitles={this.state.cellTitles} />
                    </div>
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return <div className = "header"><img src={require('./images/umr1h.png')} className ="head" alt="" /><h1 className = "header-text"><u>Bing Bong Bingo</u></h1><img src={require('./images/umr2h.png')} className ="head" alt="" /></div>;
    }
}

class InformationField extends React.Component {
    render() {
        let p1, p2, p3, title;
        if(this.props.mode === "sheet") {
            title = "General information"
            p1 = "To fill your bingo sheet, simply choose a cell and start typing on the searchbar. Selecting an option presented in the list will fill the cell with the corresponding selection.";
            p2= "The currently selected tile will be highligted as red. Clicking the tile again will undo your selection. Please note that you cannot change the \"free space\" in the middle.";
            p3 = "Use the buttons below to help you format your table and start the game when you feel ready.";
        }
        else {
            title = "How to play"
            p1 = "To play the game, simply click on a cell to mark it as crossed. Click it again to uncross it. Each consistent horizontal, vertical or diagonal line of crosses will count as a bingo. The free space in the middle can always be crossed.";
            p2 = "You can use the button below to return back to filling the bingo sheet. Note, however, that this will reset your current progress.";
            p3 = "Have fun!";
        }
        return(
            <div className="information-field">
                <h2 id = "information-header"><u><b>{title}</b></u></h2>
                <p className = "information-paragraph">{p1}</p>
                <p className = "information-paragraph">{p2}</p>
                <p className = "information-paragraph">{p3}</p>
            </div>
        );
        
    }
}

class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.playGame = this.playGame.bind(this);
    }

    playGame() {
        this.props.onClickPlay();
    }
    render() {
        return(
            <div className = "buttons">
                <button type = "button" id = "clear">Clear</button>
                <button type = "button" id = "random">Randomize</button>
                <button type = "button" id = "play" onClick={this.playGame}>Play</button>
                <button type = "button" id = "sheet" className = "hidden">Sheet</button>
            </div>
        );
    }
}

class BingoLines extends React.Component {
    render() {
        if(this.props.mode === "play") {
            return(
                <div id = "bingo-lines">
                    <div id = "b1" className = "bingo-items">
                        <p className = "bingo-options">1-5</p>
                        <p className = "bingo-options">6-10</p>
                        <p className = "bingo-options">11-15</p>
                        <p className = "bingo-options">16-20</p>
                    </div>
                    <div id = "b2" className = "bingo-items">
                        <p className = "bingo-options">21-25</p>
                        <p className = "bingo-options">1,6,11,16,21</p>
                        <p className = "bingo-options">2,7,12,17,22</p>
                        <p className = "bingo-options">3,8,13,18,23</p>
                    </div>
                    <div id = "b3" className = "bingo-items">
                        <p className = "bingo-options">4,9,14,19,24</p>
                        <p className = "bingo-options">5,10,15,20,25</p>
                        <p className = "bingo-options">1,7,13,19,25</p>
                        <p className = "bingo-options">5,9,13,17,21</p>
                    </div>
                    <div id = "total-div">
                        <p id = "total">Total: 0</p>
                    </div>
                </div>
            );
        }
        return null;
    }
}

class BingoNotifications extends React.Component {
    render() {
        return(
            <div id = "bingo-notifications" className = "hidden">
                <p id = "bingo-notices"></p>
            </div>
        );
    }
}

class Notices extends React.Component {
    render() {
        console.log("the passed value is: ", this.props.value);
        return(
            <div className = "notices"><p className = "notifications">{this.props.value}</p></div>
        );
    }
}

class Form extends React.Component {
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
                let data = await getRawData(search);
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


class Table extends React.Component {
    render() {
        let rowOne = [1,2,3,4,5].map(x => <TableCell key={x} number={x} cellState={this.props.cellState[x-1]} cellCrossed={this.props.cellCrossed[x-1]} cellTitle={this.props.cellTitles[x-1]} cellImage={this.props.cellImages[x-1]} handleClick={this.props.handleClick} gameMode={this.props.gameMode} />);
        let rowTwo = [6,7,8,9,10].map(x => <TableCell key={x} number={x} cellState={this.props.cellState[x-1]} cellCrossed={this.props.cellCrossed[x-1]} cellTitle={this.props.cellTitles[x-1]} cellImage={this.props.cellImages[x-1]} handleClick={this.props.handleClick} gameMode={this.props.gameMode} />);
        let rowThree = [11,12,13,14,15].map(x => <TableCell key={x} number={x} cellState={this.props.cellState[x-1]} cellCrossed={this.props.cellCrossed[x-1]} cellTitle={this.props.cellTitles[x-1]} cellImage={this.props.cellImages[x-1]} handleClick={this.props.handleClick} gameMode={this.props.gameMode} />);
        let rowFour = [16,17,18,19,20].map(x => <TableCell key={x} number={x} cellState={this.props.cellState[x-1]} cellCrossed={this.props.cellCrossed[x-1]} cellTitle={this.props.cellTitles[x-1]} cellImage={this.props.cellImages[x-1]} handleClick={this.props.handleClick} gameMode={this.props.gameMode} />);
        let rowFive = [21,22,23,24,25].map(x => <TableCell key={x} number={x} cellState={this.props.cellState[x-1]} cellCrossed={this.props.cellCrossed[x-1]} cellTitle={this.props.cellTitles[x-1]} cellImage={this.props.cellImages[x-1]} handleClick={this.props.handleClick} gameMode={this.props.gameMode} />);
        return(
        <table id="bingo" className = "initializer">
            <tbody>
                <tr>{rowOne}</tr>
                <tr>{rowTwo}</tr>
                <tr>{rowThree}</tr>
                <tr>{rowFour}</tr>
                <tr>{rowFive}</tr>
            </tbody>
        </table>
        );
    }
}

class TableCell extends React.Component {
    constructor(props) {
        super(props);
        this.clickEvent = this.clickEvent.bind(this);
    }

    clickEvent() {
        // Filling the bingo sheet with titles
        if(this.props.gameMode === "sheet") {
            if(this.props.cellState !== 2) {
                let new_active = (this.props.cellState === 0 ? 1 : 0);
                // Swap the active state of this table cell upon click
                this.props.handleClick(this.props.number-1,new_active, this.props.cellCrossed);
            }
        }
        // Playing the actual bingo
        else {
            let new_crossed = this.props.cellCrossed === 0 ? 1 : 0;
            // Swap the crossed state of this table cell upon click, setState is asynchronous so it needs to be done upon callback
            this.props.handleClick(this.props.number-1,this.props.cellState, new_crossed);
        }
        
    }

    render() {
        let state;
        // cellState: 0 = inactive, 1 = active, 2 = reserved
        // cellCrossed: 0 = not crossed, 1 = crossed
        if(this.props.cellState === 0) {
            state = '';
        } else if(this.props.cellState === 1) {
            state = 'active';
        } else {
            if(this.props.cellCrossed === 1) {
                return <td id="reserved" onClick={this.clickEvent}><div className="text-container"><img src={require('./images/umr.jpg')} className="image1" alt="preset" /><img src={require('./images/x_3.png')} className="image2" alt="marked" /><div className="top-left">{this.props.number}.</div></div></td>;
            }
            return <td id="reserved" onClick={this.clickEvent}><div className="text-container"><img src={require('./images/umr.jpg')} className="image1" alt="preset" /><div className="top-left">{this.props.number}.</div></div></td>;
        }
        
        if(this.props.cellCrossed === 1) {
            return <td id={state} onClick={this.clickEvent}><div className="text-container"><img src={this.props.cellImage} className="image1" alt="" /><img src={require('./images/x_3.png')} className="image2" alt="marked" /><div className="top-left">{this.props.number}.</div></div></td>;
        }
        return <td id={state} onClick={this.clickEvent}><div className="text-container"><img src={this.props.cellImage} className="image1" alt="" /><div className="top-left">{this.props.number}.</div></div></td>;
    }
}

class List extends React.Component {
    render() {
        let array = [];
        array.length = 25;
        for(let i = 0; i < 25; ++i) {
            if(i !== 12) {
                array[i] = <ListItem key={i} active={this.props.cellState[i]} title={this.props.cellTitles[i]} />;
            }
            else {
                array[i] = <li key="12" id="reserved" className="rainbow">Free space</li>;
            }
        }
        return(
            <div className = "list-items">
                <div>
                    <h3><b><u>Selected series</u></b></h3>
                </div>
                <ol className = "item-list">
                    {array}
                </ol>
            </div>
        );
    }
}

class ListItem extends React.Component {
    render() {
        let state = '';
        if(this.props.active === 1) {
            state = 'active-item';
        }
    return <li id={state}>{this.props.title}</li>;
    }
}

class Footer extends React.Component {
    render() {
        return <div id = "author"><p className = "emphasize">Kim "sinritt" Sarén</p><p className = "emphasize"><a href="mailto:kimi.saren@gmail.com">kimi.saren@gmail.com</a></p></div>;
    }
}