import React from 'react';
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

@observer
class Photo extends React.Component {
	render() {
		return (
			<div className="photo" onClick={this.openPhoto}>
				<img src={this.props.thumbnailUrl} alt=""/>
				<div className="info">{this.props.name}</div>
			</div>
		);
	}

	@action openPhoto = () => {
		this.props.openPhoto(this.props.photoUrl);
	}
}

export default Photo;
