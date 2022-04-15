import { UIPanel, UIRow, UIInput } from '../ui.js';

export class SearchPanel {

    constructor(reader) {

        const strings = reader.strings;
        
        this.panel = new UIPanel().setId('search');
        this.query = undefined;
        this.pages = [];
        this.searchBox = new UIInput('search');
        this.searchBox.dom.placeholder = strings.get('sidebar/search/placeholder');
        this.searchBox.dom.addEventListener('search', () => {

            const value = this.searchBox.getValue();
            
            if (value.length === 0) {
                this.clear();
                this.query = value;
            } else if (this.query !== value) {
                this.clear();
                this.query = value;
                this.doSearch(value).then(results => {

                    results.forEach(item => {
                        this.set(item);
                    });
                });
            }
        });
        this.searchResult = document.createElement('ul');

        const ctrlRow = new UIRow();
        ctrlRow.add(this.searchBox);

        this.panel.add(ctrlRow);
        this.panel.dom.appendChild(this.searchResult);
        this.reader = reader;
        //
        // improvement of the highlighting of keywords is required...
        //
    }

    /**
     * Searching the entire book
     * @param {*} q Query keyword
     * @returns The search result array.
     */
    async doSearch(q) {

        const book = this.reader.book;
        const results = await Promise.all(
            book.spine.spineItems.map(item => item.load(book.load.bind(book))
            .then(item.find.bind(item, q)).finally(item.unload.bind(item))));
        return await Promise.resolve([].concat.apply([], results));
    }

    set(data) {

        const item = document.createElement('li');
        const link = document.createElement('a');

        link.href = "#" + data.cfi;
        link.textContent = data.excerpt;
        link.onclick = () => {

            this.reader.rendition.display(data.cfi);
            return false;
        };

        item.appendChild(link);
        this.searchResult.appendChild(item);
    }

    clear() {

        while (this.searchResult.hasChildNodes()) {
            this.searchResult.removeChild(this.searchResult.lastChild);
        }
    }
}