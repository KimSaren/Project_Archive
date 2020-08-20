import React from 'react';

export class TableCell extends React.Component {
    constructor(props) {
        super(props);
        this.clickEvent = this.clickEvent.bind(this);
    }

    clickEvent() {
        // Filling the bingo sheet with titles
        if(this.props.gameMode === "sheet") {
            if(this.props.cellState !== 2) {
                let new_active = (this.props.cellState === 0 ? 1 : 0);
                // Swap the active state of this table cell upon click
                this.props.handleClick(this.props.number-1,new_active, this.props.cellCrossed);
            }
        }
        // Playing the actual bingo
        else {
            let new_crossed = this.props.cellCrossed === 0 ? 1 : 0;
            // Swap the crossed state of this table cell upon click, setState is asynchronous so it needs to be done upon callback
            this.props.handleClick(this.props.number-1,this.props.cellState, new_crossed);
        }
        
    }

    render() {
        let state;
        // cellState: 0 = inactive, 1 = active, 2 = reserved
        // cellCrossed: 0 = not crossed, 1 = crossed
        if(this.props.cellState === 0) {
            state = '';
        } else if(this.props.cellState === 1) {
            state = 'active';
        } else {
            if(this.props.cellCrossed === 1) {
                return <td id="reserved" onClick={this.clickEvent}><div className="text-container"><img src={require('../images/umr.jpg')} className="image1" alt="preset" /><img src={require('../images/x_3.png')} className="image2" alt="marked" /><div className="top-left">{this.props.number}.</div></div></td>;
            }
            return <td id="reserved" onClick={this.clickEvent}><div className="text-container"><img src={require('../images/umr.jpg')} className="image1" alt="preset" /><div className="top-left">{this.props.number}.</div></div></td>;
        }
        
        if(this.props.cellCrossed === 1) {
            return <td id={state} onClick={this.clickEvent}><div className="text-container"><img src={this.props.cellImage} className="image1" alt="" /><img src={require('../images/x_3.png')} className="image2" alt="marked" /><div className="top-left">{this.props.number}.</div></div></td>;
        }
        return <td id={state} onClick={this.clickEvent}><div className="text-container"><img src={this.props.cellImage} className="image1" alt="" /><div className="top-left">{this.props.number}.</div></div></td>;
    }
}