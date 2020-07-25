import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Screen, ButtonRow } from './components'
import { getValues, FlashingBackground } from './miscellaneous'

// The main calculator class rendering its children from components.js
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

  // Event Handler for clicking the buttons
  onClick(character) {
    // We use an external function to get the logic for what is being displayed
    let array = getValues(character, this.state.display, this.state.ans, this.state.reset);
    console.log(array);
    this.setState({
      display: array[0],
      ans: array[1],
      reset: array[2]
    });
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

// Make the background flash for fun
setInterval(() => {FlashingBackground()},3000)

// We render the header and the calculator here
ReactDOM.render(<h1>MyCalculator</h1>,document.getElementById("top"));
ReactDOM.render(<Calculator />,document.getElementById("content"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
