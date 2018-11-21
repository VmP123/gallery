import React from 'react';
import { observer, inject } from 'mobx-react';

import Description from './Description.js';
import Album from './Album.js';
import Photo from './Photo.js';

@inject('store')
@observer
class Main extends React.Component {
	render() {
		return (
			<div>
				<Description text={this.props.store.description} />
				<div className="section">
					<div className="container photos">
						<div className="row">
							{
								this.props.store.albums.map((album) => {
									return <Album key={album.name} thumbnailUrl={album.thumbnailUrl} name={album.name} albumUrl={album.albumUrl} photoCount={album.photoCount} albumCount={album.albumCount}  />
								})
							}
							{
								this.props.store.photos.map((photo) => {
									return <Photo key={photo.name} thumbnailUrl={photo.thumbnailUrl} photoUrl={photo.photoUrl} openPhoto={this.props.store.openPhoto} />
								})
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Main;
