import React from 'react';
import { decorate, observable, action } from 'mobx'
import { observer } from 'mobx-react'

const Photo = observer(
	class Photo extends React.Component {
		render() {
			return (
				<div className="photo" onClick={this.openPhoto}>
					<img src={this.props.thumbnailUrl} alt=""/>
					<div className="info">{this.props.name}</div>
				</div>
			);
		}

		openPhoto = () => {
			this.props.openPhoto(this.props.photoUrl);
		}
	}
)
decorate(Photo, {
	isOpen: observable,
	items: observable,
	openPhoto: action
});

export default Photo;
