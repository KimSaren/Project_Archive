import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Squares are managed as React functions
function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick({value: 'X'})}>
        {props.value}
    </button>
    );
}

// Class for the board containing squares
class Board extends React.Component {
    // Rendering squares
    renderSquare(i) {
      return <Square value = {this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }
  
    // Rendering the board
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

// Class for the game overseeing the board
class Game extends React.Component {
    // Constructor for the game
    constructor(props) {
        super(props);
        this.state = {
            history: [{squares: Array(9).fill(null)}],
            stepNumber: 0,
            xIsNext: true
        };
    }
    
    // Event handler for clicking any of the squares
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([{squares: squares}]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }
    
    // Jumping to a set turn
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    // Rendering the game
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let listItems = document.getElementsByTagName("LI");
        let buttonItems = document.getElementsByTagName("button");
    
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move} id={move} className={'selected'}>
                    <button id={move} className={'selected'} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
    
        let status;
        if (winner) {
            status = "Winner: " + winner;
        } 
        else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        let location;
        if(this.state.stepNumber > 0) {
            location = currentLocation(current.squares, history[this.state.stepNumber-1].squares)
        }

        // Utilizing the helper functions here to bold the currently selected turn
        unboldButtons(buttonItems);
        unboldList(listItems);
        boldListItem(this.state.stepNumber);
    
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={i => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                <div>{status}</div>
                <div><p>Last move: {location}</p></div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

/**
 * Helper function to deduct winning combinations on the board
 * @param {*} squares - the state of the board
 * @returns {character} - 'X', 'O' or null
 */
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

/**
 * A helper function to find the last changed input on the board
 * @param {*} current - current set of squares
 * @param {*} previous - the previous set of squares
 * @return {string} - A string of the form (x,y), where 1 <= x,y <= 3
 */
function currentLocation(current,previous) {
    for(let i = 0; i < current.length; ++i) {
        if(current[i] !== previous[i]) {
            if(i <= 2) {
                return('(' + 1 + ',' + (i+1) + ')');
            }
            else if(i <= 5) {
                return('(' + 2 + ',' + (i-2) + ')');
            }
            else {
                return('(' + 3 + ',' + (i-5) + ')');
            }
        }
    }
}

/**
 * A helper function for bolding active list items
 * @param {*} step - the id of the list item we want bolded
 */
function boldListItem(step) {
    let listItems = document.getElementsByTagName("LI");
    let buttonItems = document.getElementsByTagName("button");
    for(let i = 0; i < listItems.length; ++i) {
        if(step == 0) {
            unboldList(listItems);
            listItems[0].classList.add('selected');
            break;
        }
        else if(listItems[i].id == step) {
            unboldList(listItems);
            listItems[i].classList.add('selected');
            break;
        }
    }
    for(let i = 0; i < buttonItems.length; ++i) {
        if(step == 0) {
            unboldButtons(buttonItems);
            for(let j = 0; j < buttonItems.length; ++j) {
                if(buttonItems[j].innerHTML == 'Go to game start') {
                    buttonItems[j].classList.add('selected');
                }
            }
            break;
        }
        else if(buttonItems[i].id == step) {
            unboldButtons(buttonItems);
            buttonItems[i].classList.add('selected');
            break;
        }
    }
}

/**
 * A helper function for unbolding all list items
 * @param {*} list - the list of items to be unbolded
 */
function unboldList(list) {
    for(let i = 0; i < list.length; ++i) {
        list[i].classList.remove('selected');
    }
}

function unboldButtons(buttons) {
    for(let i = 0; i < buttons.length; ++i) {
        buttons[i].classList.remove('selected');
    }
}
  
  // ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
  