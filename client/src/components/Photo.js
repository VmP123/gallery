import React from 'react';
import { action } from 'mobx'
import { observer } from 'mobx-react'

@observer
class Photo extends React.Component {
	render() {
		return (
			<div className="photo col s6 m4 xl3" onClick={this.openPhoto}>
				<img className="responsive-img" src={this.props.thumbnailUrl} alt=""/>
			</div>
		);
	}

	@action openPhoto = () => {
		this.props.openPhoto(this.props.photoUrl);
	}
}

export default Photo;
