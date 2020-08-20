import React from 'react';

export class InformationField extends React.Component {
    render() {
        let p1, p2, p3, title;
        if(this.props.mode === "sheet") {
            title = "General information"
            p1 = "To fill your bingo sheet, simply choose a cell and start typing on the searchbar. Selecting an option presented in the list will fill the cell with the corresponding selection.";
            p2= "The currently selected tile will be highligted as red. Clicking the tile again will undo your selection. Please note that you cannot change the \"free space\" in the middle.";
            p3 = "Use the buttons below to help you format your table and start the game when you feel ready.";
        }
        else {
            title = "How to play"
            p1 = "To play the game, simply click on a cell to mark it as crossed. Click it again to uncross it. Each consistent horizontal, vertical or diagonal line of crosses will count as a bingo. The free space in the middle can always be crossed.";
            p2 = "You can use the button below to return back to filling the bingo sheet. Note, however, that this will reset your current progress.";
            p3 = "Have fun!";
        }
        return(
            <div className="information-field">
                <h2 id = "information-header"><u><b>{title}</b></u></h2>
                <p className = "information-paragraph">{p1}</p>
                <p className = "information-paragraph">{p2}</p>
                <p className = "information-paragraph">{p3}</p>
            </div>
        );
        
    }
}