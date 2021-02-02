EPUBJS.reader.UploadController = function () {

	var reader = this;
	var upload = document.getElementById('upload');
	var storage = new EPUBJS.storage();

	upload.addEventListener('change', function (e) {

		if (e.target.files.length === 0)
			return;

		if (window.FileReader) {

			var fr = new FileReader();
			fr.onload = function (e) {

				reader = new EPUBJS.Reader(e.target.result, { restore: true });

				storage.init(function () {

					storage.clear();
					storage.set(e.target.result);
				});

			};
			fr.readAsArrayBuffer(e.target.files[0]);

		} else {

			alert("Your browser does not support the required features.\n" +
				"Please use a modern browser such as Google Chrome, or Mozilla Firefox.");
		}

	}, false);
};
