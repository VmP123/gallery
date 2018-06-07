import React from 'react';
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react'

import { PhotoSwipe } from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';

import Header from './components/Header.js';
import Album from './components/Album.js';
import Photo from './components/Photo.js';
import './App.css';

class AppStore {
	@observable description = '';
	@observable albums = [];
	@observable photos = [];
	@observable pendingRequests = 0;
	
	@action setDescription(description) {
		this.description = description;
	}

	@action addAlbum(album) {
		this.albums.push(album);
	}

	@action setAlbums(albums) {
		this.albums.replace(albums);
	}

	@action addPhoto(photo) {
		this.photos.push(photo);
	}

	@action setPhotos(photos) {
		this.photos.replace(photos);
	}

	@action getData(url) {
		this.pendingRequests++;

		this.setDescription('');
		this.setPhotos([]);
		this.setAlbums([]);

		setTimeout(() => {
				fetch(url)
				.then((response) => { return response.json(); })
				.then((json) => {
					this.setDescription(json.description);
					this.setPhotos(json.photos);
					this.setAlbums(json.albums);
					this.pendingRequests--;
				})
			},
			1000
		);
	}

	@computed get photoSwipeItems() {
		return this.photos.map(function (photo) {
			return {
				src: photo.photoUrl,
				w: 600,
				h: 600
			}
		});
	}

	@observable isPhotoSwipeOpen = false;			
	@observable photoSwipeOptions = {
		captionEl: false,
		tapToToggleControls: false,
		mainClass: 'pswp--minimal--dark',
		barsSize: { top: 0, bottom: 0 },
		history: false
	};
}

@observer
class App extends React.Component {
	constructor(props) {
		super(props);
		this.store = new AppStore();
	}
	componentDidMount() {
		this.store.getData('http://localhost:3000/data1.json');
	}
	render() {
		return (
			<div className="app">
				<Header />
				<div className="description">{this.store.description}</div>
				<div className="content">
				{
					this.store.albums.map((album) => {
					return <Album key={album.key} thumbnailUrl={album.thumbnailUrl} name={album.name} photoCount={album.photoCount} albumCount={album.albumCount} />
					})
				}
				{
					this.store.photos.map((photo) => {
					return <Photo key={photo.key} thumbnailUrl={photo.thumbnailUrl} photoUrl={photo.photoUrl} name={photo.name} openPhoto={this.openPhoto} />
					})
				}
				</div>
				<button onClick={this.testClick}>Testaa</button>
				{this.store.isPhotoSwipeOpen ? (<PhotoSwipe isOpen={this.store.isPhotoSwipeOpen} items={this.store.photoSwipeItems} options={this.store.photoSwipeOptions} onClose={this.closePhoto} />) : null}
			</div>
		);
	}
	@action testClick = () => {
		this.store.getData('http://localhost:3000/data2.json');
	}
	@action openPhoto = (photoUrl) => {
		this.store.photoSwipeOptions.index = this.store.photoSwipeItems.findIndex((i) => { return i.src === photoUrl; });
		this.store.isPhotoSwipeOpen = true;
	}
	@action closePhoto = () => {
		this.store.isPhotoSwipeOpen = false;
	}
}


export default App;
