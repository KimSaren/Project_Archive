import React from 'react';
import { TableCell } from './tablecell';
 
export class Table extends React.Component {
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