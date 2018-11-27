const express = require('express')
const fs = require('fs');
const path = require('path');
const util = require('util');
const sharp = require('sharp');
const config = require('./config.json');
const sizeOf = require('image-size');

class GalleryServer {
	constructor() {
		this.app = express();
		this.port = config.port;
		this.galleryRootDirectory = path.join(__dirname, config.galleryDirectory);

		this.mime = {
			gif: 'image/gif',
			jpg: 'image/jpeg',
			png: 'image/png',
			json: 'application/json'
		};
		this.albumInfoFile = 'album.json';
		
		this.thumbnailMaxWidth = config.thumbnailMaxWidth;
		this.thumbnailMaxHeight = config.thumbnailMaxHeight;
	}
	
	start() {
		this.app.get('/albums/:path*', (req, res) => this.getAlbum(req, res));
		this.app.get('/albums/', (req, res) => this.getAlbum(req, res));
		this.app.get('/photos/:path*', (req, res) => this.getImage(req, res));
		this.app.get('/thumbnails/:path*', (req, res) => this.getThumbnail(req, res));

		this.app.listen(this.port, () => 
			console.log(`App listening on port ${this.port}!`)
		)
	}

	getAlbum(req, res) {
		var albumDirectory = this.getAlbumDirectory(req.path);
		
		this.getAlbumInner(albumDirectory, res).then(retVal => {
			this.fillResult(retVal, res);
		});
	}
	
	getAlbumInner(albumDirectory, res) {
		return new Promise((resolve, reject) => {
			fs.lstat(path.join(this.galleryRootDirectory, albumDirectory), (err, stats) => {
				if (stats && stats.isDirectory()) {
					this.readDirectory(albumDirectory).then((value) => {
						var album = {
							description: null,
							directory: albumDirectory,
							albums: [],
							photos: []
						}
						var promises = [];
						
						// Description
						promises.push(new Promise((resolve, reject) => {
							var albumInfoFileFullPath = path.join(this.galleryRootDirectory, albumDirectory, this.albumInfoFile);
							fs.readFile(albumInfoFileFullPath, (err, data) => {
								if (data) {
									var albumInfo = JSON.parse(data);
									album.description = albumInfo.description;
								}
								resolve();
							});
						}));
						
						// Photos
						var albumInfoFileExt = path.extname(this.albumInfoFile).slice(1);
						value.files.filter(file => {
							var ext = path.extname(file).slice(1);
							return this.mime[ext] && ext !== albumInfoFileExt;
						}).forEach(file => {
							var fullPath = this.backslashToSlash(path.join(value.rootDirectory, file))
							promises.push(new Promise(async (resolve, reject) => {
								const sizeOfPromisified = util.promisify(sizeOf);
								const dimensions = await sizeOfPromisified(path.join(this.galleryRootDirectory, fullPath));
								
								album.photos.push({
									name: file,
									width: dimensions.width,
									height: dimensions.height,
									photoUrl: '/photos/' + fullPath,
									thumbnailUrl: '/thumbnails/' + fullPath
								});
								resolve();

							}));
						});

						// Albums
						value.directories.forEach(directory => {
							var fullPath = this.backslashToSlash(path.join(value.rootDirectory, directory))
							promises.push(new Promise((resolve, reject) => {
								this.getAlbumThumbnail(fullPath).then((thumbnail) => {
									if (thumbnail) {
										album.albums.push({
											name: directory,
											albumUrl: '/albums/' + fullPath,
											thumbnailUrl: '/thumbnails/' + thumbnail
										});
									}

									resolve();
								})
							}));
						});

						Promise.all(promises).then(() => {
							// Sorting
							album.photos.sort((a, b) => a.name.localeCompare(b.name));
							album.albums.sort((a, b) => a.name.localeCompare(b.name));
							
							resolve({
								contentType: 'application/json',
								status: 200,
								body: JSON.stringify(album)
							});
						})
					})
				} else {
					resolve({
						contentType: 'text/plain',
						status: 404,
						body: 'Not found'
					});
				}
			});
		})
	}
		
	fillResult(data, res) {
		res.set('Content-Type', data.contentType);
		res.status(data.status);
		res.end(data.body)
	}
	
	async getAlbumThumbnail (directory) {
		const getAlbumThumbnailInner = (directory) => {
			return new Promise(async (resolve, reject) => {
				const readFile =  util.promisify(fs.readFile);
				try {
					const data = await readFile(path.join(this.galleryRootDirectory, directory, this.albumInfoFile));
					if (data) {
						var albumInfo = JSON.parse(data);
						if (albumInfo.thumbnailImage) {
							resolve(this.backslashToSlash(path.join(directory, albumInfo.thumbnailImage)));
							return;
						}
					}
				} catch (err) {
					// It's ok If file does not exists
				}
				
				const albumInfoFileExt = path.extname(this.albumInfoFile).slice(1);
				const value = await this.readDirectory(directory);

				var thumbnailImage = value.files.find(file => {
					var ext = path.extname(file).slice(1);
					return this.mime[ext] && ext !== albumInfoFileExt;
				});
					
				if (thumbnailImage) // Image found in this directory
					resolve(this.backslashToSlash(path.join(directory, thumbnailImage)))
				else if (value.directories) { // Let's find an image from subdirectories
					for(var subdirectory of value.directories) {
						var fullSubdirectory = this.backslashToSlash(path.join(directory, subdirectory));
						var thumbnail = await this.getAlbumThumbnail(fullSubdirectory);
	
						if(thumbnail) {
							resolve (thumbnail); // Image found in subdirectory
							return;
						}
					}
					
					resolve(null); // Directories in this directory does not contain (thumbnail) images
				}
				else { // No images or directories in this directory
					resolve(null); 
				}
			})
		}

		return await getAlbumThumbnailInner(directory)
	}
	
	getImage(req, res) {
		var file = path.join(this.galleryRootDirectory, this.getAlbumDirectory(req.path));
		var validateResult = this.validateFile(file);
		
		if (validateResult) {
			this.fillResult(validateResult, res);
		} else {
			var s = fs.createReadStream(file);
			s.on('open', () => {
				var type = this.mime[path.extname(file).slice(1)];
				res.set('Content-Type', type);
				s.pipe(res);
			});
			s.on('error', () => {
				res.set('Content-Type', 'text/plain');
				res.status(404);
				res.end('Not found');
			});
		}
	}
	
	getThumbnail(req, res) {
		var file = path.join(this.galleryRootDirectory, this.getAlbumDirectory(req.path));
		var validateResult = this.validateFile(file);
		
		if (validateResult) {
			this.fillResult(validateResult, res);
		} else {
			var resizer = sharp().resize(
				this.thumbnailMaxWidth,
				this.thumbnailMaxHeight,
				{
					fit: sharp.fit.cover, 
					withoutEnlargement: true
				}).jpeg();
			
			var s = fs.createReadStream(file);
			s.on('open', () => {
				var type = this.mime[path.extname(file).slice(1)];
				res.set('Content-Type', type);
				s.pipe(resizer).pipe(res);
			});
			s.on('error', () => {
				res.set('Content-Type', 'text/plain');
				res.status(404).end('Not found');
			});
		}
	}
	
	readDirectory(dir) {
		return new Promise((resolve, reject) => {
			var retVal = {
				rootDirectory: dir,
				directories: [],
				files: []
			}
			fs.readdir(path.join(this.galleryRootDirectory, dir) , { withFileTypes: true }, (err, files) => {
				files.forEach(file => {
					var fileName = this.backslashToSlash(file.name);

					if (file.isDirectory())
						retVal.directories.push(fileName);
					else if (file.isFile())
						retVal.files.push(fileName);
				});
				resolve(retVal)
			});
		});
	}
	
	getAlbumDirectory(url) {
		var index = url.indexOf('/', 1);
		return index != -1 ? decodeURIComponent(url.substring(index + 1)) : '';
	}
	
	backslashToSlash(input) {
		return input.replace(/\\/g, '/');
	}
	
	validateFile(file) {
		if (file.indexOf(this.galleryRootDirectory + path.sep) !== 0) {
			return {
				contentType: 'text/plain',
				status: 403,
				body: 'Forbidden'
			}
		}
		
		var type = this.mime[path.extname(file).slice(1)];
		if (!type) {
			return {
				contentType: 'text/plain',
				status: 404,
				body: 'Unsupported filetype'
			}
		}
		
		return null;
	}
}

module.exports = GalleryServer;
