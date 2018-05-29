import React from 'react';
import { observer } from 'mobx-react'

const Photo = observer(
	class Photo extends React.Component {
		render() {
			return (
				<div className="photo">
					<img src={this.props.thumbnailUrl} alt=""/>
					<div className="info">{this.props.name}</div>
				</div>
			);
		}
	}
)

export default Photo;
