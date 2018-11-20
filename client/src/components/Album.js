import React from 'react';
import { observer } from 'mobx-react'
import { observable } from 'mobx'

@observer
class Album extends React.Component {
	@observable imageLoaded = false;
	
	render() {
		return (
			<div className="col s6 m4 xl3" onClick={this.props.openAlbum}>
				<img src={this.props.thumbnailUrl} className="responsive-img" onLoad={() => { this.imageLoaded = true; }} alt=""/>
				{this.imageLoaded ? <div className="overlay-info"><span>{this.props.name}</span></div> : null}
			</div>
		);
	}
}

export default Album;
