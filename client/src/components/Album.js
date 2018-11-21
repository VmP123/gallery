import React from 'react';
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Link } from "react-router-dom";

@observer
class Album extends React.Component {
	@observable imageLoaded = false;
	
	render() {
		return (
			<Link to={this.props.albumUrl.substring(7)}>
				<div className="col s6 m4 xl3" >
					<img src={this.props.thumbnailUrl} className="responsive-img" onLoad={() => { this.imageLoaded = true; }} alt=""/>
					{this.imageLoaded ? <div className="overlay-info"><span>{this.props.name}</span></div> : null}
				</div>
			</Link>
		);
	}
}

export default Album;
