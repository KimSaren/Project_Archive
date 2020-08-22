import React from 'react';

export class BingoLines extends React.Component {
    constructor(props) {
        super(props);
        this.strikethroughs = this.strikethroughs.bind(this);
    }

    strikethroughs() {
        // Save the prop in a viariable for readability and initialize an array of empty strings
        let table = this.props.table, arr = Array(12).fill("");
        // Check rows for bingos, mark them as 1
        for(let i = 0; i < 5; ++i) {
            for(let j = 0; j < 5; ++j) {
                if(table[5*i + j] === 0)
                    break;
                else if(j === 4)
                    arr[i] = "strikethrough";
            }
        }
        // Check columns for bingos, mark them as 1
        for(let i = 0; i < 5; ++i) {
            for(let j = 0; j < 5; ++j) {
                if(table[i + 5*j] === 0)
                    break;
                else if(j === 4)
                    arr[5+i] = "strikethrough";
            }
        }
        // Check the diagonals for bingos, mark them as 1
        if(table[0] === 1 && table[6] === 1 && table[12] === 1 && table[18] === 1 && table[24] === 1)
            arr[10] = "strikethrough";
        if(table[4] === 1 && table[8] === 1 && table[12] === 1 && table[16] === 1 && table[20] === 1)
            arr[11] = "strikethrough";
        return arr;
    }

    render() {
        if(this.props.mode === "play") {
            let strikes = this.strikethroughs();
            return(
                <div id = "bingo-lines">
                    <div id = "b1" className = "bingo-items">
                        <p className = {"bingo-options " + strikes[0]}>1-5</p>
                        <p className = {"bingo-options " + strikes[1]}>6-10</p>
                        <p className = {"bingo-options " + strikes[2]}>11-15</p>
                        <p className = {"bingo-options " + strikes[3]}>16-20</p>
                    </div>
                    <div id = "b2" className = "bingo-items">
                        <p className = {"bingo-options " + strikes[4]}>21-25</p>
                        <p className = {"bingo-options " + strikes[5]}>1,6,11,16,21</p>
                        <p className = {"bingo-options " + strikes[6]}>2,7,12,17,22</p>
                        <p className = {"bingo-options " + strikes[7]}>3,8,13,18,23</p>
                    </div>
                    <div id = "b3" className = "bingo-items">
                        <p className = {"bingo-options " + strikes[8]}>4,9,14,19,24</p>
                        <p className = {"bingo-options " + strikes[9]}>5,10,15,20,25</p>
                        <p className = {"bingo-options " + strikes[10]}>1,7,13,19,25</p>
                        <p className = {"bingo-options " + strikes[11]}>5,9,13,17,21</p>
                    </div>
                    <div id = "total-div">
                        <p id = "total">Total: {strikes.map(x => {
                            if(x === "strikethrough")
                                return 1;
                            return 0;
                    }).reduce((a,b) => a+b,0)}</p>
                    </div>
                </div>
            );
        }
        return(
            <div id = "buttons">
                <h2><b><u>Button functionality</u></b></h2>
                <p><b>Play:</b> switches the game to playing mode. The functionalities of the table and the UI of the application will change.</p>
                <p><b>Randomize:</b> randomizes the positions of <i>currently</i> selected titles in the table. Free space remains unchanged.</p>
                <p><b>Clear:</b> clears all current selections. Good for a quick reset.</p>
            </div>
        );
    }
}