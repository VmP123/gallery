import React, { Component } from 'react';

export default class Album extends Component {
	render() {
		return (
			<div className="album">
				<img src={this.props.thumbnailUrl} alt=""/>
				<div className="info">
					<div>{this.props.name}</div>
					<div>
						<span>{this.props.photoCount}</span>
						{ this.props.albumCount > 0 ? <span>{this.props.albumCount}</span> : null}
					</div>
				</div>
			</div>
		);
	}
}
