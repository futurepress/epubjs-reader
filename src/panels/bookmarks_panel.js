import { UIPanel, UIRow, UIInput } from '../ui.js';

export class BookmarksPanel extends UIPanel {

    constructor(reader) {
        
        super();
        super.setId('bookmarks');

        const strings = reader.strings;

        const ctrlRow = new UIRow();
        const ctrlStr = [
            strings.get('sidebar/bookmarks/add'),
            strings.get('sidebar/bookmarks/remove'),
            strings.get('sidebar/bookmarks/clear'),
        ];
        const btn_a = new UIInput('button', ctrlStr[0]).addClass('btn-start');
        const btn_r = new UIInput('button', ctrlStr[1]).addClass('btn-medium');
        const btn_c = new UIInput('button', ctrlStr[2]).addClass('btn-end');

        btn_a.dom.onclick = () => {

            reader.emit('bookmarked', true);
            return false;
        };

        btn_r.dom.onclick = () => {

            reader.emit('bookmarked', false);
            return false;
        };

        btn_c.dom.onclick = () => {

            this.clearBookmarks();
            reader.emit('bookmarked', false);
            return false;
        };

        ctrlRow.add([btn_a, btn_r, btn_c]);

        this.reader = reader;
        this.bookmarks = document.createElement('ul');
        
        super.add(ctrlRow);
        this.dom.appendChild(this.bookmarks);

        const update = () => {

            btn_r.dom.disabled = reader.settings.bookmarks.length === 0;
            btn_c.dom.disabled = reader.settings.bookmarks.length === 0;
        };

        //-- events --//

        reader.on ('bookready', () => {

            reader.settings.bookmarks.forEach((cfi) => {
                
                const bookmark = this.createBookmarkItem(cfi);
                this.bookmarks.appendChild(bookmark);
            });

            update();
        });

        reader.on('relocated', (location) => {

            const cfi = location.start.cfi;
            const val = reader.isBookmarked(cfi) === -1;
            btn_a.dom.disabled = !val;
            btn_r.dom.disabled = val;
        });

        reader.on('bookmarked', (value) => {

            const cfi = reader.rendition.currentLocation().start.cfi;

            if (value) {
                this.addBookmark(cfi);
                btn_a.dom.disabled = true;
            } else {
                this.removeBookmark(cfi);
                btn_a.dom.disabled = false;
            }

            update();
        });
    }

    addBookmark(cfi) {

        if (this.reader.isBookmarked(cfi) > -1)
            return;

        const bookmark = this.createBookmarkItem(cfi);
        this.bookmarks.appendChild(bookmark);
        this.reader.settings.bookmarks.push(cfi);
    }

    removeBookmark(cfi) {

        const index = this.reader.isBookmarked(cfi);
        if (index === -1)
            return;

        this.bookmarks.removeChild(this.bookmarks.childNodes[index]);
        this.reader.settings.bookmarks.splice(index, 1);
    }

    clearBookmarks() {

        this.reader.settings.bookmarks = [];
        while (this.bookmarks.hasChildNodes()) {
            this.bookmarks.removeChild(this.bookmarks.lastChild);
        }
    }

    createBookmarkItem(cfi) {

        const item = document.createElement('li');
        const link = document.createElement('a');

        const book = this.reader.book;
        const spineItem = book.spine.get(cfi);
        
        if (spineItem.index in book.navigation.toc) {
            const tocItem = book.navigation.toc[spineItem.index];
            item.id = tocItem.id;
            link.textContent = tocItem.label;
        } else {
            link.textContent = cfi;
        }

        link.href = "#" + cfi;
        link.onclick = () => {

            this.reader.rendition.display(cfi);
            return false;
        };

        item.appendChild(link);
        return item;
    }
}
