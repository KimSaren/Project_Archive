import React from 'react';

export class BingoLines extends React.Component {
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