import React from 'react';
import { decorate, observable, action, computed } from 'mobx'
import { observer } from 'mobx-react'

import {PhotoSwipe} from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';

import Header from './components/Header.js';
import Album from './components/Album.js';
import Photo from './components/Photo.js';
import './App.css';

class AppStore {
	description = '';
	albums = [];
	photos = [];
	pendingRequests = 0;
	setDescription(description) {
		this.description = description;
	}

	addAlbum(album) {
		this.albums.push(album);
	}

	setAlbums(albums) {
		this.albums.replace(albums);
	}

	addPhoto(photo) {
		this.photos.push(photo);
	}

	setPhotos(photos) {
		this.photos.replace(photos);
	}

	getData(url) {
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

	get photoSwipeItems() {
		return this.photos.map(function (photo) {
			return {
				src: photo.photoUrl,
				w: 600,
				h: 600
			}
		});
	}

	isPhotoSwipeOpen = false;			
	photoSwipeOptions = {
		captionEl: false,
		tapToToggleControls: false,
		mainClass: 'pswp--minimal--dark',
		barsSize: { top: 0, bottom: 0 },
		history: false
	};
}
decorate(AppStore, {
	description: observable,
	albums: observable,
	photos: observable,
	pendingRequests: observable,
	isPhotoSwipeOpen: observable,
	photoSwipeOptions: observable,
	addAlbum: action,
	setAlbums: action,
	addPhoto: action,
	setPhotos: action,
	photoSwipeItems: computed
});

const App = observer(
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
		testClick = () => {
			this.store.getData('http://localhost:3000/data2.json');
		}
		openPhoto = (photoUrl) => {
			this.store.photoSwipeOptions.index = this.store.photoSwipeItems.findIndex((i) => { return i.src === photoUrl; });
			this.store.isPhotoSwipeOpen = true;
		}
		closePhoto = () => {
			this.store.isPhotoSwipeOpen = false;
		}
	}
)

export default App;
