import { Core } from './core.js';
import { Storage } from './storage.js';
import { ReaderController } from './controllers/reader_controller.js';
import { SettingsController } from './controllers/settings_controller.js';
import { ControlsController } from './controllers/controls_controller.js';
import { SidebarController } from './controllers/sidebar_controller.js';
import { BookmarksController } from './controllers/bookmarks_controller.js';
import { NotesController } from './controllers/notes_controller.js';
import { MetaController } from './controllers/meta_controller.js';
import { TocController } from './controllers/toc_controller.js';

let EPUBJS = {};

EPUBJS.reader = {};
EPUBJS.reader.plugins = {}; //-- Attach extra Controllers as plugins (like search?)
EPUBJS.core = new Core();

export class Reader {
    
    constructor(bookPath, _options) {

        const scope = this;

        this.viewer = document.getElementById("viewer");
        this.search = window.location.search;
        this.offline = false;
        this.sidebarOpen = false;
        
        this.settings = EPUBJS.core.defaults(_options || {}, {
            bookPath: bookPath,
            restore: false,
            reload: false,
            bookmarks: undefined,
            annotations: undefined,
            contained: undefined,
            bookKey: undefined,
            styles: undefined,
            sidebarReflow: false,
            generatePagination: false,
            history: true
        });

        if (this.search) {
            this.parameters = this.search.slice(1).split("&");
            this.parameters.forEach(function (p) {
                const split = p.split("=");
                const name  = split[0];
                const value = split[1] || '';
                this.settings[name] = decodeURIComponent(value);
            });
        }

        //-- This could be username + path or any unique string
        this.setBookKey(this.settings.bookPath);

        if (this.settings.restore && this.isSaved()) {
            this.applySavedSettings();
        }

        this.settings.styles = this.settings.styles || { fontSize: "100%" };

        this.book = new ePub(this.settings.bookPath, this.settings);

        if (!this.settings.bookmarks) {
            this.settings.bookmarks = [];
        }

        if (!this.settings.annotations) {
            this.settings.annotations = [];
        }

        if (this.settings.generatePagination) {
            this.book.generatePagination(
                this.viewer.clientWidth(), 
                this.viewer.clientHeight());
        }

        this.rendition = this.book.renderTo("viewer", {
            ignoreClass: "annotator-hl",
            width: "100%",
            height: "100%"
        });

        const plCfi = this.settings.previousLocationCfi;
        if (plCfi) {
            this.displayed = this.rendition.display(plCfi);
        } else {
            this.displayed = this.rendition.display();
        }

        this.book.ready.then(function () {

            this.ReaderController = new ReaderController(this);
            this.SettingsController = new SettingsController(this);
            this.ControlsController = new ControlsController(this);
            this.SidebarController = new SidebarController(this);
            this.BookmarksController = new BookmarksController(this);
            this.NotesController = new NotesController(this);

            window.addEventListener('hashchange', this.hashChanged.bind(this), false);

            document.addEventListener('keydown', this.adjustFontSize.bind(this), false);

            this.rendition.on('keydown', this.adjustFontSize.bind(this));
            this.rendition.on('keydown', this.ReaderController.arrowKeys.bind(this));
            this.rendition.on('selected', this.selectedRange.bind(this));

        }.bind(this)).then(function () {
            this.ReaderController.hideLoader();
        }.bind(this));

        this.book.loaded.metadata.then(function (meta) {
            scope.MetaController = new MetaController(meta);
        });
        this.book.loaded.navigation.then(function (toc) {
            scope.TocController = new TocController(scope, toc);
        });

        const plugins = EPUBJS.reader.plugins;
        for (let plugin in plugins) {

            if (Object.prototype.hasOwnProperty.call(plugins, plugin)) {
                this[plugin] = plugins[plugin].call(this, this.book);
            }
        }

        window.addEventListener('beforeunload', this.unload.bind(this), false);

        //-- controllers
        this.ReaderController;
        this.SettingsController;
        this.ControlsController;
        this.SidebarController;
        this.BookmarksController;
        this.NotesController;
        this.MetaController;
        this.TocController;
    }

    /* ----------------------------- Bookmarks ------------------------------ */

    addBookmark(cfi) {

        const present = this.isBookmarked(cfi);
        if (present > -1)
            return;

        this.settings.bookmarks.push(cfi);
        $(this).trigger('reader:bookmarked', cfi);
    }

    removeBookmark(cfi) {

        const bookmark = this.isBookmarked(cfi);
        if (bookmark === -1)
            return;

        this.settings.bookmarks.splice(bookmark, 1);
        $(this).trigger('reader:unbookmarked', bookmark);
    }

    isBookmarked(cfi) {

        const bookmarks = this.settings.bookmarks;
        return bookmarks.indexOf(cfi);
    }

    clearBookmarks() {

        this.settings.bookmarks = [];
    }

    /* ------------------------------- Notes -------------------------------- */

    addNote(note) {

        this.settings.annotations.push(note);
    }

    removeNote(note) {

        const index = this.settings.annotations.indexOf(note);
        if (index === -1)
            return;

        delete this.settings.annotations[index];
    }

    clearNotes() {

        this.settings.annotations = [];
    }

    /* ------------------------------ Settings ------------------------------ */

    adjustFontSize(e) {

        let fontSize;
        let interval = 2;
        const PLUS = 187;
        const MINUS = 189;
        const ZERO = 48;
        const MOD = (e.ctrlKey || e.metaKey);

        if (!this.settings.styles)
            return;

        if (!this.settings.styles.fontSize) {
            this.settings.styles.fontSize = "100%";
        }

        fontSize = parseInt(this.settings.styles.fontSize.slice(0, -1));

        if (MOD) {

            switch (e.keyCode) {

                case PLUS:
                    e.preventDefault();
                    this.book.setStyle("fontSize", (fontSize + interval) + "%");
                    break;
                case MINUS:
                    e.preventDefault();
                    this.book.setStyle("fontSize", (fontSize - interval) + "%");
                    break;
                case ZERO:
                    e.preventDefault();
                    this.book.setStyle("fontSize", "100%");
                    break;
            }
        }
    }
    
    /**
     * Set book key in settings.
     * @param {*} identifier 
     * @returns Current book key.
     */
    setBookKey(identifier) {

        if (!this.settings.bookKey) {
            this.settings.bookKey = "epubjsreader:" +
                EPUBJS.VERSION + ":" +
                window.location.host + ":" + identifier;
        }
        return this.settings.bookKey;
    }

    /**
     * Checks if the book setting can be retrieved from localStorage.
     * @returns true if the book key exists, or false otherwise.
     */
    isSaved() {

        if (!localStorage)
            return false;

        return (localStorage.getItem(this.settings.bookKey) !== null);
    }

    /**
     * Removing the current book settings from local storage.
     * @returns true if the book settings were deleted successfully, or false 
     * otherwise.
     */
    removeSavedSettings() {

        if (!localStorage)
            return false;

        localStorage.removeItem(this.settings.bookKey);
        return true;
    }

    applySavedSettings() {

        if (!localStorage)
            return false;

        let stored;
        try {
            stored = JSON.parse(localStorage.getItem(this.settings.bookKey));
        } catch (e) { // parsing error of localStorage
            console.exception(e);
            return false;
        }

        if (stored) {
            // Merge styles
            if (stored.styles) {
                this.settings.styles = EPUBJS.core.defaults(
                    this.settings.styles || {}, stored.styles);
            }
            // Merge the rest
            this.settings = EPUBJS.core.defaults(this.settings, stored);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Saving the current book settings in local storage.
     * @returns 
     */
    saveSettings() {

        if (this.book) {
            const curLocation = this.rendition.currentLocation();
            if (curLocation.start) {
                this.settings.previousLocationCfi = curLocation.start.cfi;
            }
        }

        if (!localStorage)
            return false;

        localStorage.setItem(this.settings.bookKey, JSON.stringify(this.settings));
        return true;
    }

    unload() {

        if (this.settings.restore && localStorage) {
            this.saveSettings();
        }
    }

    hashChanged() {

        const hash = window.location.hash.slice(1);
        this.rendition.display(hash);
    }

    selectedRange(cfiRange) {

        const cfiFragment = "#" + cfiRange;

        // Update the History Location
        if (this.settings.history && window.location.hash !== cfiFragment) {
            // Add CFI fragment to the history
            history.pushState({}, '', cfiFragment);
            this.currentLocationCfi = cfiRange;
        }
    }
}

export { Storage };

/*
EPUBJS.Reader.prototype.searchBookmarked = function(cfi) {
    var bookmarks = this.settings.bookmarks,
            len = bookmarks.length,
            i;

    for(i = 0; i < len; i++) {
        if (bookmarks[i]['cfi'] === cfi) return i;
    }
    return -1;
};
*/

//-- Enable binding events to reader

RSVP.EventTarget.mixin(Reader);
