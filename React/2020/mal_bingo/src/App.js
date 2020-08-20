import React from 'react';
import { InformationField } from './components/informationfield';
import { Buttons } from './components/buttons';
import { BingoLines } from './components/bingolines';
import { BingoNotifications } from './components/bingonotifications';
import { Form } from './components/form';
import { Table } from './components/table';
import { Notices } from './components/notices';
import { List } from './components/list';
import { Data } from './data';

export class App extends React.Component {
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
        let active = Data.clearActiveState(this.state.cellState);
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
        if(Data.isDuplicate(this.state.cellTitles, title) !== -1) {
            let index = Data.isDuplicate(this.state.cellTitles, title);
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
        let cells = Data.clearActiveState(this.state.cellState);
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
            let activeArray = Data.clearActiveState(this.state.cellState);
            let crossArray = Data.clearCrosses(this.state.cellCrossed);
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
                <div className = "header"><img src={require('./images/umr1h.png')} className ="head" alt="" /><h1 className = "header-text"><u>Bing Bong Bingo</u></h1><img src={require('./images/umr2h.png')} className ="head" alt="" /></div>
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
                    <div id = "author"><p className = "emphasize">Kim "sinritt" Sarén</p><p className = "emphasize"><a href="mailto:kimi.saren@gmail.com">kimi.saren@gmail.com</a></p></div>
                </footer>
            </div>
        );
    }
}