import React from 'react';

export class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.playGame = this.playGame.bind(this);
        this.clearCells = this.clearCells.bind(this);
        this.randomize = this.randomize.bind(this);
    }

    playGame() {
        this.props.onClickPlay();
    }

    clearCells() {
        this.props.onClickClear();
    }

    randomize() {
        this.props.onClickRandomize();
    }

    render() {
        if(this.props.mode === "sheet") {
            return(
                <div className = "buttons">
                    <button type = "button" id = "clear" onClick={this.clearCells}>Clear</button>
                    <button type = "button" id = "random" onClick={this.randomize}>Randomize</button>
                    <button type = "button" id = "play" onClick={this.playGame}>Play</button>              
                </div>
            );
        }
        return(
            <div className = "buttons"><button type = "button" id = "sheet" onClick={this.playGame}>Back to sheet</button></div>
        );
    }
}