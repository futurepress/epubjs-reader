var EPUBJS = EPUBJS || {};

EPUBJS.storage = function () {
	
	var indexedDB = window.indexedDB ||
					window.webkitIndexedDB ||
					window.mozIndexedDB ||
					window.OIndexedDB ||
					window.msIndexedDB;

	if (indexedDB === undefined) {

		console.warn('Storage: IndexedDB not available.');
		return {

			init : function () { },
			get  : function () { },
			set  : function () { },
			clear: function () { }
		};
	}

	var name = 'epubjs-reader';
	var version = 1.0;
	var database;

	return {

		init: function (callback) {

			var request = indexedDB.open(name, version);
			request.onupgradeneeded = function (event) {

				var db = event.target.result;
				if (db.objectStoreNames.contains('entries') === false) {

					db.createObjectStore("entries");
				}
			};

			request.onsuccess = function (event) {

				database = event.target.result;
				database.onerror = function (event) {

					console.error('IndexedDB', event);
				};

				callback();
			}

			request.onerror = function (event) {

				console.error('IndexedDB', event);
			};
		},

		get: function (callback) {

			var transaction = database.transaction(['entries'], 'readwrite');
			var objectStore = transaction.objectStore('entries');
			var request = objectStore.get(0);
			request.onsuccess = function (event) {

				callback(event.target.result);
			};
		},

		set: function (data) {

			var transaction = database.transaction(['entries'], 'readwrite');
			var objectStore = transaction.objectStore('entries');
			var request = objectStore.put(data, 0);
			request.onsuccess = function () {

				console.log('storage.set');
			};
		},

		clear: function () {

			if (database === undefined)
				return;

			var transaction = database.transaction(['entries'], 'readwrite');
			var objectStore = transaction.objectStore('entries');
			var request = objectStore.clear();
			request.onsuccess = function () {

				console.log('storage.clear');
			};
		}
	}
};
