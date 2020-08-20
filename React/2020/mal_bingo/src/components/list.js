import React from 'react';
import { ListItem } from './listitem';

export class List extends React.Component {
    render() {
        let array = [];
        array.length = 25;
        for(let i = 0; i < 25; ++i) {
            if(i !== 12) {
                array[i] = <ListItem key={i} active={this.props.cellState[i]} title={this.props.cellTitles[i]} />;
            }
            else {
                array[i] = <li key="12" id="reserved" className="rainbow">Free space</li>;
            }
        }
        return(
            <div className = "list-items">
                <div>
                    <h3><b><u>Selected series</u></b></h3>
                </div>
                <ol className = "item-list">
                    {array}
                </ol>
            </div>
        );
    }
}