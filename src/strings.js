export class Strings {

    constructor(reader) {

        const signals = reader.signals;
        
        this.language = 'en';
        this.values = {
            en: {
                'toolbar/opener': 'Sidebar',
                'toolbar/upload': 'Upload book',
                'toolbar/upload/error': 'Your browser does not support the required features.\nPlease use a modern browser such as Google Chrome, or Mozilla Firefox.',
                'toolbar/bookmark': 'Add this page to bookmarks',
                'toolbar/fullsceen': 'Fullscreen',

                'sidebar/contents': 'Contents',
                'sidebar/bookmarks': 'Bookmarks',
                'sidebar/bookmarks/add': 'Add',
                'sidebar/bookmarks/remove': 'Remove',
                'sidebar/bookmarks/clear': 'Clear',
                'sidebar/annotations': 'Annotations',
                'sidebar/annotations/add': 'Add',
                'sidebar/annotations/clear': 'Clear',
                'sidebar/annotations/anchor': 'Anchor',
                'sidebar/annotations/cancel': 'Cancel',
                'sidebar/search': 'Search',
                'sidebar/settings': 'Settings',
                'sidebar/settings/language': 'Language',
                'sidabar/settings/reflowtext': ['Reflow text', 'Reflow text when sidebars are open'],
                'sidebar/settings/pagination': ['Pagination', 'Generate pagination']
            }
        };

        //-- signals --//

        signals.bookready.add(() => {
            
            this.language = reader.settings.language;
        });
    }

    get(key) { return this.values[this.language][key] || '???'; }
}