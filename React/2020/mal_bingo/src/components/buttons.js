import React from 'react';

export class Buttons extends React.Component {
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