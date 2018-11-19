import React from 'react';
import { observer } from 'mobx-react'

@observer
class Album extends React.Component {
	render() {
		return (
			<div className="col s6 m4 xl3 album" onClick={this.props.openAlbum}>
				<img src={this.props.thumbnailUrl} className="responsive-img" alt=""/>
				<div className="info"><span>{this.props.name}</span></div>
			</div>
		);
	}
}

export default Album;
