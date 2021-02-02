"use strict";

document.onreadystatechange = function () {

    if (document.readyState !== "complete")
        return;

	var reader;
	var storage = new EPUBJS.storage();

	storage.init(function () {

		storage.get(function (data) {

			if (data !== undefined) {

				reader = ePubReader(data, { restore: true });

			} else {

				reader = ePubReader('https://s3.amazonaws.com/moby-dick/', {

					restore: true
				});
			}
		});
	});

    window.reader = reader;
};