import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Parser } from './eval/src/parser';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      ans: '',
      reset: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(character) {
    let array = getValues(character, this.state.display, this.state.ans, this.state.reset);
    console.log(array);
    this.setState({
      display: array[0],
      ans: array[1],
      reset: array[2]
    });
    console.log(this.state);
  }

  render() {
      const buttons = [1,2,3,4].map(x => <ButtonRow key={x} order={x} onClick={this.onClick} />);
      return(
        <div id="calculator">
          <Screen display={this.state.display} />
          {buttons}
        </div>
      );
  }
}

class Screen extends React.Component {
  render() {
    return <div id="screen">{this.props.display}</div>;
  }
}

class ButtonRow extends React.Component {
  render() {
    if(this.props.order < 4) {
      return(
        <div id="row">
          <Button order={this.props.order} value={1} onClick={this.props.onClick} />
          <Button order={this.props.order} value={2} onClick={this.props.onClick} />
          <Button order={this.props.order} value={3} onClick={this.props.onClick} />
          <Button order={this.props.order} value={4} onClick={this.props.onClick} />
          <Button order={this.props.order} value={5} onClick={this.props.onClick} />
        </div>
        );
    }
    else {
      return(
        <div id="row">
            <Button order={this.props.order} value={1} onClick={this.props.onClick} />
            <Button order={this.props.order} value={2} onClick={this.props.onClick} />
            <Button order={this.props.order} value={3} onClick={this.props.onClick} />
            <Button order={this.props.order} value={4} onClick={this.props.onClick} />
          </div>
        );
    }
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const character = e.target.innerText;
    this.props.onClick(character);
  }

  render() {
    // The button is a number from 1-9
    if((this.props.value < 4) && (this.props.order < 4)) {
      return <button onClick={this.handleClick}>{this.props.value + (3*(3-this.props.order))}</button>
    }
    // The button is the number 0
    else if((this.props.value === 1) && (this.props.order === 4)) {
      return <button onClick={this.handleClick}>0</button>
    }
    // The button is an operator
    else if((this.props.value === 2) && (this.props.order === 4)) {
      return <button onClick={this.handleClick}>.</button>
    }
    // The button is an operator
    else if((this.props.value === 3) && (this.props.order === 4)) {
      return <button onClick={this.handleClick}>Ans</button>
    }
    else if((this.props.value === 4) && (this.props.order === 4)) {
      return <button id="equals" onClick={this.handleClick}>=</button>
    }
    else {
      if(this.props.order === 1) {
        if(this.props.value === 4) {
          return <button onClick={this.handleClick}>C</button>
        }
        return <button onClick={this.handleClick}>CE</button>
      }
      else if(this.props.order === 2) {
        if(this.props.value === 4) {
          return <button onClick={this.handleClick}>*</button>
        }
        return <button onClick={this.handleClick}>/</button>
      }
      else {
        if(this.props.value === 4) {
          return <button onClick={this.handleClick}>+</button>
        }
        return <button onClick={this.handleClick}>-</button>
      }
    }
  }
}

// Miscellaneous functions
function getValues(character, display, ans, reset) {
  // A try block in case the user tries to make an erroneous input
  try {
    let array = [display,ans,false];
    if(character === "=") {
      array[0] = "" + Parser.evaluate(display);
      array[1] = "" + Parser.evaluate(display);
      array[2] = true;
    }
    else if(character === "CE" && (display === "SYNTAX ERROR")) {
      array[0] = "";
    }
    else if(character === "CE" ) {
      array[0] = display.slice(0,display.length-1);
    }
    else if(character === "C") {
      array[0] = '';
    }
    else if(character === "Ans") {
      if(reset) {
        array[0] = ans;
        array[2] = true;
      }
      else {
        array[0] = display + ans;
      }
    }
    else if(!Number.isInteger(parseInt(character))) {
        array[0] = display + character;
    }
    else {
      if(reset) {
        array[0] = character;
        array[2] = false;
      }
      else {
        array[0] = display + character;
      }
    }
    return array;
  }

  // If the syntax is erroneous
  catch(err) {
    let array = ["SYNTAX ERROR", ans, true];
    return array;
  }
}

function FlashingBackground() {
  let bg = document.body;
  console.log(bg.style.background);
  if(bg.style.background == "cyan") {
    bg.style.background = "white";
  }
  else {
    bg.style.background = "cyan";
  }
}

setInterval(() => {FlashingBackground()},3000)

ReactDOM.render(<h1>MyCalculator</h1>,document.getElementById("top"));
ReactDOM.render(<Calculator />,document.getElementById("content"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
