import { observable, action, computed } from 'mobx'

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

		fetch(url)
		.then((response) => { return response.json(); })
		.then((json) => {
			this.setDescription(json.description);
			this.setPhotos(json.photos);
			this.setAlbums(json.albums);
			this.pendingRequests--;
		});
	}

	@action openPhoto = (photoUrl) => {
		this.photoSwipeOptions.index = this.photoSwipeItems.findIndex((i) => { return i.src === photoUrl; });
		this.isPhotoSwipeOpen = true;
	}
	@action closePhoto = () => {
		this.isPhotoSwipeOpen = false;
	}

	@computed get photoSwipeItems() {
		return this.photos.map(function (photo) {
			return {
				src: photo.photoUrl,
				w: photo.width,
				h: photo.height
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

export default AppStore;