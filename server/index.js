const GalleryServer = require('./GalleryServer.js')

var galleryServer = new GalleryServer();
galleryServer.start();

module.exports = galleryServer.app;
