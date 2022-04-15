import { UITabbedPanel } from './ui.js';
import { TocPanel } from './panels/toc_panel.js';
import { BookmarksPanel } from './panels/bookmarks_panel.js';
import { AnnotationsPanel } from './panels/annotations_panel.js';
import { SearchPanel } from './panels/search_panel.js';
import { SettingsPanel } from './panels/settings_panel.js';

export class Sidebar {
    
    constructor(reader) {
        
        const strings = reader.strings;
        const tabs = [
            strings.get('sidebar/contents'),
            strings.get('sidebar/bookmarks'),
            strings.get('sidebar/annotations'),
            strings.get('sidebar/search'),
            strings.get('sidebar/settings')
        ];

        this.toc = new TocPanel(reader);
        this.bookmarks = new BookmarksPanel(reader);
        this.annotations = new AnnotationsPanel(reader);
        this.search = new SearchPanel(reader);
        this.settings = new SettingsPanel(reader);

        this.container = new UITabbedPanel('vertical').setId('sidebar');

        this.container.addTab('tab-t', tabs[0], this.toc);
        this.container.addTab('tab-b', tabs[1], this.bookmarks);
        this.container.addTab('tab-n', tabs[2], this.annotations);
        this.container.addTab('tab-s', tabs[3], this.search);
        this.container.addTab('tab-c', tabs[4], this.settings);

        this.container.select('tab-t');

        document.body.appendChild(this.container.dom);
    }
}