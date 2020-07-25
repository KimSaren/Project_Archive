
import React from 'react';
import './index.css';

// The screen for displaying calculator values
export class Screen extends React.Component {
    render() {
      return <div id="screen">{this.props.display}</div>;
    }
}

// Rows of buttons in the calculator
export class ButtonRow extends React.Component {
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

// Individual Buttons on each ButtonRow
export class Button extends React.Component {
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
      // The button is an operator, this needs more extensive logic
      else if((this.props.value === 2) && (this.props.order === 4)) {
        return <button onClick={this.handleClick}>.</button>
      }
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