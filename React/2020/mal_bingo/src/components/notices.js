import React from 'react';

export class Notices extends React.Component {
    render() {
        return(
            <div className = "notices"><p className = "notifications">{this.props.value}</p></div>
        );
    }
}