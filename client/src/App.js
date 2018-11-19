import React from 'react';
import { observer } from 'mobx-react'

import { PhotoSwipe } from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';

import 'materialize-css/dist/css/materialize.min.css'
// import M from 'materialize-css'

import Header from './components/Header.js';
import Description from './components/Description.js';
import Album from './components/Album.js';
import Photo from './components/Photo.js';
import AppStore from './AppStore.js';

import './App.css';

@observer
class App extends React.Component {
	constructor(props) {
		super(props);
		this.store = new AppStore();
	}
	componentDidMount() {
		this.store.getData('/albums/');
	}
	render() {
		return (
			<div className="" >
				<Header breadcrumbs={this.store.breadcrumbs} getData={this.store.getData} />
				<div>
					<Description text={this.store.description} />
					<div className="section">
						<div className="container photos">
							<div className="row">
								{
									this.store.albums.map((album) => {
										return <Album key={album.name} name={album.name} thumbnailUrl={album.thumbnailUrl} name={album.name} photoCount={album.photoCount} albumCount={album.albumCount} openAlbum={() => this.store.getData(album.albumUrl)} />
									})
								}
								{
									this.store.photos.map((photo) => {
									return <Photo key={photo.name} thumbnailUrl={photo.thumbnailUrl} photoUrl={photo.photoUrl} openPhoto={this.store.openPhoto} />
									})
								}
							</div>
						</div>
					</div>
				</div>
				<PhotoSwipe isOpen={this.store.isPhotoSwipeOpen} items={this.store.photoSwipeItems} options={this.store.photoSwipeOptions} onClose={this.store.closePhoto} />
			</div>
		);
	}
}


export default App;
