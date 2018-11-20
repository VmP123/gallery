import React from 'react';
import { observer, inject } from 'mobx-react'
import { PhotoSwipe } from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';
import 'materialize-css/dist/css/materialize.min.css'

import Header from './components/Header.js';
import Main from './components/Main.js';
import './App.css';

@inject('store')
@observer
class App extends React.Component {
	componentDidMount() {
		this.props.store.getData();
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
