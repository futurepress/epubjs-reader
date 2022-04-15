import { UIPanel, UIRow, UIInput } from '../ui.js';

export class SearchPanel extends UIPanel {

    constructor(reader) {

        super();
        super.setId('search');
        
        const strings = reader.strings;

        let searchQuery = undefined;
        const searchBox = new UIInput('search');
        searchBox.dom.placeholder = strings.get('sidebar/search/placeholder');
        searchBox.dom.onsearch = () => {

            const value = searchBox.getValue();
            
            if (value.length === 0) {
                this.clear();
            } else if (searchQuery !== value) {
                this.clear();
                this.doSearch(value).then(results => {

                    results.forEach(item => {
                        this.set(item);
                    });
                });
            }
            searchQuery = value;
        };

        const ctrlRow = new UIRow();
        ctrlRow.add(searchBox);
        super.add(ctrlRow);

        this.items = document.createElement('ul');
        this.dom.appendChild(this.items);
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
        this.items.appendChild(item);
    }

    clear() {

        while (this.items.hasChildNodes()) {
            this.items.removeChild(this.items.lastChild);
        }
    }
}