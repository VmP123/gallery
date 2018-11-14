'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../index.js'); // Our app


describe('Integration tests for RESTful API', function() {
	describe('GET /albums', function() {
	  //this.timeout(5000); // How long to wait for a response (ms)

	  before(function() {

	  });

	  after(function() {

	  });

	  it('should return content of root album', function() {
		return chai.request(app)
		  .get('/albums/')
		  .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.an('object');
			expect(res.body.albums).to.be.an('array');
			expect(res.body.photos).to.be.an('array');
		  });
	  });

	  it('should return content of album called "a"', function() {
		return chai.request(app)
		  .get('/albums/a')
		  .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.an('object');
			expect(res.body.albums).to.be.an('array');
			expect(res.body.albums).to.have.lengthOf(1);
			expect(res.body.photos).to.be.an('array');
			expect(res.body.photos).to.have.lengthOf(2);
		  })
	  });

	  it('should return content of album b inside album a', function() {
		return chai.request(app)
		  .get('/albums/a/b')
		  .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.an('object');
			expect(res.body.albums).to.be.an('array');
			expect(res.body.albums).to.have.lengthOf(1);
			expect(res.body.photos).to.be.an('array');
			expect(res.body.photos).to.have.lengthOf(1);
		  })
	  });
	});

	describe('GET /photos', function() {
	  it('should return jpeg file', function() {
		return chai.request(app)
		  .get('/photos/a/IMG_9991.jpg')
		  .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.have.header('content-type', 'image/jpeg');
		  });
	  });

	  it('should return "Not found" and status 404', function() {
		return chai.request(app)
		  .get('/photos/notfound.jpg')
		  .then(function(res) {
			expect(res).to.have.status(404);
			expect(res).to.be.text;
			expect(res.text).equal('Not found');
		  });
	  });

	  it('should return "Unsupported filetype" and status 404', function() {
		return chai.request(app)
		  .get('/photos/unsupported.xxx')
		  .then(function(res) {
			expect(res).to.have.status(404);
			expect(res).to.be.text;
			expect(res.text).equal('Unsupported filetype');
		  });
	  });
	})

	describe('GET /thumbnails', function() {
	  it('should return jpeg file', function() {
		return chai.request(app)
		  .get('/thumbnails/a/IMG_9991.jpg')
		  .then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.have.header('content-type', 'image/jpeg');
		  });
	  });

	  it('should return "Not found" and status 404', function() {
		return chai.request(app)
		  .get('/thumbnails/notfound.jpg')
		  .then(function(res) {
			expect(res).to.have.status(404);
			expect(res).to.be.text;
			expect(res.text).equal('Not found');
		  });
	  });

	  it('should return "Unsupported filetype" and status 404', function() {
		return chai.request(app)
		  .get('/thumbnails/unsupported.xxx')
		  .then(function(res) {
			expect(res).to.have.status(404);
			expect(res).to.be.text;
			expect(res.text).equal('Unsupported filetype');
		  });
	  });
	})	
})


describe('Unit tests for GalleryServer class', function () {
	var galleryServer; 
		
	before(function() {
		var GalleryServer = new require('../GalleryServer.js');
		galleryServer = new GalleryServer();
	});
	
	describe('backslashToSlash', function () {
		it('should convert backslashes to slashes', () => {
			var converted = galleryServer.backslashToSlash('text\\text\\')
			return expect(converted).equal('text/text/');
		});
	})

	describe('getAlbumDirectory', function () {
		it('should return album directory', () => {
			var converted = galleryServer.getAlbumDirectory('/albums/a%20a/b/')
			return expect(converted).equal('a a/b/');
		});
	})
})
