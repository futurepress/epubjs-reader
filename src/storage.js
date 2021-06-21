export class Storage {

	constructor() {
		
		this.name = 'epubjs-reader';
		this.version = 1.0;
		this.database;
		this.indexedDB = window.indexedDB || 
						 window.webkitIndexedDB || 
						 window.mozIndexedDB ||
						 window.OIndexedDB ||
						 window.msIndexedDB;
		
		if (this.indexedDB === undefined) {

			alert('The IndexedDB API not available in your browser.');
		}
	}

	init(callback) {

		if (this.indexedDB === undefined) {
			callback();
			return;
		}
		
		const scope = this;
		const request = indexedDB.open(this.name, this.version);
		request.onupgradeneeded = function (event) {

			const db = event.target.result;
			if (db.objectStoreNames.contains('entries') === false) {

				db.createObjectStore("entries");
			}
		};

		request.onsuccess = function (event) {

			scope.database = event.target.result;
			scope.database.onerror = function (event) {

				console.error('IndexedDB', event);
			};
			callback();
		}

		request.onerror = function (event) {

			console.error('IndexedDB', event);
		};
	}

	get(callback) {

		if (this.database === undefined) {
			callback();
			return;
		}
		
		const transaction = this.database.transaction(['entries'], 'readwrite');
		const objectStore = transaction.objectStore('entries');
		const request = objectStore.get(0);
		request.onsuccess = function (event) {

			callback(event.target.result);
			console.log('storage.get');
		};
	}

	set(data, callback) {
		
		if (this.database === undefined) {
			callback();
			return;
		}
		
		const transaction = this.database.transaction(['entries'], 'readwrite');
		const objectStore = transaction.objectStore('entries');
		const request = objectStore.put(data, 0);
		request.onsuccess = function () {

			callback();
			console.log('storage.set');
		};
	}

	clear() {

		if (this.database === undefined)
			return;

		const transaction = this.database.transaction(['entries'], 'readwrite');
		const objectStore = transaction.objectStore('entries');
		const request = objectStore.clear();
		request.onsuccess = function () {

			console.log('storage.clear');
		};
	}
}
