import React, { Component } from 'react';

export default class Photo extends Component {
    render() {
        return (
            <div className="photo">
                <img src={this.props.thumbnailUrl} alt=""/>
                <div className="info">{this.props.name}</div>
            </div>
        );
    }
}
