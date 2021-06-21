import { UITabbedPanel } from '../ui.js';
import { TocPanel } from './panels/toc_panel.js';
import { BookmarksPanel } from './panels/bookmarks_panel.js';
import { AnnotationsPanel } from './panels/annotations_panel.js';
import { SearchPanel } from './panels/search_panel.js';
import { SettingsPanel } from './panels/settings_panel.js';

export class Sidebar {
    
    constructor(reader) {
        
        const tabs = [
            'Contents',
            'Bookmarks',
            'Annotations',
            'Search',
            'Settings'
        ];

        this.toc = new TocPanel(reader);
        this.bookmarks = new BookmarksPanel(reader);
        this.annotations = new AnnotationsPanel(reader);
        this.search = new SearchPanel(reader);
        this.settings = new SettingsPanel(reader);

        this.container = new UITabbedPanel('vertical').setId('sidebar');

        this.container.addTab('tab-t', tabs[0], this.toc.panel);
        this.container.addTab('tab-b', tabs[1], this.bookmarks.panel);
        this.container.addTab('tab-n', tabs[2], this.annotations.panel);
        this.container.addTab('tab-s', tabs[3], this.search.panel);
        this.container.addTab('tab-c', tabs[4], this.settings.panel);

        this.container.select('tab-t');

        document.body.appendChild(this.container.dom);
    }
}