import React from 'react';

export class ListItem extends React.Component {
    render() {
        let state = '', strike = '';
        if(this.props.active === 1) {
            state = 'active-item';
        }
        else if(this.props.crossed === 1) {
            strike = 'strikethrough';
        }
    return <li id={state} className={strike}>{this.props.title}</li>;
    }
}