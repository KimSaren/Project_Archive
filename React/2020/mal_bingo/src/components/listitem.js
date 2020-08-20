import React from 'react';

export class ListItem extends React.Component {
    render() {
        let state = '';
        if(this.props.active === 1) {
            state = 'active-item';
        }
    return <li id={state}>{this.props.title}</li>;
    }
}