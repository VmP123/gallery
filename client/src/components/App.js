import React from 'react';
import { observer, inject } from 'mobx-react';

import { PhotoSwipe } from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';
import 'materialize-css/dist/css/materialize.min.css'

import Header from './Header.js';
import Main from './Main.js';
import '../App.css';

@inject('store')
@observer
class App extends React.Component {
	componentDidMount() {
		const album = this.props.match.params.album;
		this.props.store.getData('/albums/' + (album ? album : ''));
	}
	
	componentDidUpdate(prevProps, prevState) {
		const oldAlbum = prevProps.match.params.album;
		const newAlbum = this.props.match.params.album;
		if (oldAlbum !== newAlbum) {
			this.props.store.getData('/albums/' + (newAlbum ? newAlbum : ''));			
		}
	}

	render() {
		return (
			<div>
				<Header />
				<Main />
				<PhotoSwipe isOpen={this.props.store.isPhotoSwipeOpen} items={this.props.store.photoSwipeItems} options={this.props.store.photoSwipeOptions} onClose={this.props.store.closePhoto} />
			</div>
		);
	}
}

export default App;
