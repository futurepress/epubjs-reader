import { UIPanel, UIRow, UIInput } from '../../ui.js';

export class SearchPanel {

    constructor(reader) {

        this.panel = new UIPanel().setId('search');
        const ctrl = new UIRow();
        this.searchBox = new UIInput('search');
        this.searchBox.dom.placeholder = 'search';
        this.searchResult = document.createElement('ul');

        ctrl.add(this.searchBox);

        this.panel.add(ctrl);
        this.panel.dom.appendChild(this.searchResult)
        //
        // no implemented
        //
    }
}