export class BookmarksController {
	
	constructor(reader) {

		const scope = this;
		const docfrag = document.createDocumentFragment();

		this.reader = reader;
		this.bookmarks = $('#bookmarksView');
		this.list = this.bookmarks.find('#bookmarks');
		this.counter = 0;

		$(reader).on('reader:bookmarked', function(cfi) {
			const item = scope.createBookmarkItem(cfi);
			scope.list.append(item);
		});
		$(reader).on('reader:unbookmarked', function(index) {
			const item = $('#bookmark-' + index);
			item.remove();
		});

		reader.settings.bookmarks.forEach(function(cfi) {
			const bookmark = scope.createBookmarkItem(cfi);
			docfrag.appendChild(bookmark);
		});

		this.list.append(docfrag);
	}

	show() { this.bookmarks.show(); }

	hide() { this.bookmarks.hide(); }

	createBookmarkItem(cfi) {

		const scope = this;
		const listitem = document.createElement('li');
		const link = document.createElement('a');

		listitem.id = 'bookmark-' + counter;
		listitem.classList.add('list_item');

		const spineItem = book.spine.get(cfi);
		if (spineItem.index in book.navigation.toc) {
			const tocItem = book.navigation.toc[spineItem.index];
			link.textContent = tocItem.label;
		} else {
			link.textContent = cfi;
		}

		link.href = cfi;

		link.classList.add('bookmark_link');

		link.addEventListener('click', function(event) {
			const cfi = this.getAttribute('href');
			scope.reader.rendition.display(cfi);
			event.preventDefault();
		}, false);

		listitem.appendChild(link);

		counter++;

		return listitem;
	}
}
