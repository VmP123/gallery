import React, { Component } from 'react';

import Header from './components/Header.js';
import Album from './components/Album.js';
import Photo from './components/Photo.js';
import './App.css';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
			albums: [],
			photos: []
		}

	}
	componentDidMount() {
		this.getData('http://localhost:3000/data1.json');
	}
	render() {
		return (
			<div className="app">
				<Header />
				<div className="description">{this.state.description}</div>
				<div className="content">
				{
					this.state.albums.map((album) => {
					return <Album key={album.key} thumbnailUrl={album.thumbnailUrl} name={album.name} photoCount={album.photoCount} albumCount={album.albumCount} />
					})
				}
				{
					this.state.photos.map((photo) => {
					return <Photo key={photo.key} thumbnailUrl={photo.thumbnailUrl} name={photo.name} />
					})
				}
				</div>
				<button onClick={this.testClick.bind(this)}>Testaa</button>
			</div>
		);
	}
	testClick() {
		this.getData('http://localhost:3000/data2.json');
	}
	getData(url) {
		fetch(url)
			.then((response) => { return response.json(); })
			.then((myJson) => { console.log(myJson); this.setState(myJson); });
	}
}
