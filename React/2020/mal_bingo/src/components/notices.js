import React from 'react';

export class Notices extends React.Component {
    render() {
        console.log("the passed value is: ", this.props.value);
        return(
            <div className = "notices"><p className = "notifications">{this.props.value}</p></div>
        );
    }
}