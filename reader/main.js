import { Reader } from './reader.min.js';

"use strict";

window.addEventListener('load', function() {
	
	
	
	//const storage = new EPUBJS.Storage();
	
	//const storage = ERI.storage;
	const upload = document.getElementById('upload');

	upload.addEventListener('change', function (e) {
		
		if (e.target.files.length === 0)
			return;

		if (window.FileReader) {

			var fr = new FileReader();
			fr.onload = function (e) {

				window.storage.clear();
				window.storage.set(e.target.result, function() {

					window.reader = new Reader(e.target.result, { restore: true });
				});
			};
			fr.readAsArrayBuffer(e.target.files[0]);
			fr.onerror = function(e) {
				console.error(e);
			};

		} else {

			alert("Your browser does not support the required features.\n" +
				"Please use a modern browser such as Google Chrome, or Mozilla Firefox.");
		}

	}, false);
	
	// storage.init(function () {

	// 	storage.get(function (data) {

	// 		if (data !== undefined) {

	// 			window.reader = new EPUBJS.Reader(data, { restore: true });

	// 		} else {

	// 			window.reader = new EPUBJS.Reader('https://s3.amazonaws.com/moby-dick/', {

	// 				restore: true
	// 			});
	// 		}
	// 	});
	// });
});