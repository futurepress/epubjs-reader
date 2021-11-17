import { Toolbar } from './controllers/toolbar.js';
import { Sidebar } from './controllers/sidebar.js';
import { Content } from './controllers/content.js';
import { Strings } from './strings.js';

export class Reader {

    constructor(bookPath, _options) {

        const Signal = signals.Signal;
        this.signals = {
            //-- reader
            sidebarOpener: new Signal(),
            bookloaded: new Signal(),
            bookmarked: new Signal(),
            fontresize: new Signal(),
            renditionPrev: new Signal(),
            renditionNext: new Signal(),
            viewercleanup: new Signal(),
            //-- epubjs
            bookready: new Signal(),
            renderered: new Signal(),
            metadata: new Signal(),
            navigation: new Signal(),
            //-- rendition
            layout: new Signal(),
            selected: new Signal(),
            unselected: new Signal(),
            relocated: new Signal(),
        };

        this.settings = undefined;
        this.cfgInit(bookPath, _options);

        this.strings = new Strings(this);
        this.toolbar = new Toolbar(this);
        this.sidebar = new Sidebar(this);
        this.content = new Content(this);

        this.book = undefined;
        this.rendition = undefined;
        this.displayed = undefined;

        this.init();

        window.addEventListener('beforeunload', this.unload.bind(this), false);
        window.addEventListener('hashchange', this.hashChanged.bind(this), false);
        window.addEventListener('keydown', this.keyboardHandler.bind(this), false);
    }

    /**
     * Initialize book.
     * @param {*} bookPath 
     * @param {*} _options 
     */
    init(bookPath, _options) {
        
        this.signals.viewercleanup.dispatch();
        
        if (arguments.length > 0) {

            this.cfgInit(bookPath, _options);
        }

        this.book = new ePub(this.settings.bookPath/*, this.settings*/);

        this.rendition = this.book.renderTo('viewer', {
            ignoreClass: 'annotator-hl',
            width: '100%',
            height: '100%'
        });

        const cfi = this.settings.previousLocationCfi;
        if (cfi) {
            this.displayed = this.rendition.display(cfi);
        } else {
            this.displayed = this.rendition.display();
        }

        this.displayed.then((renderer) => {
            this.signals.renderered.dispatch(renderer);
        });

        this.book.ready.then(function () {
            if (this.settings.pagination) {
                this.generatePagination();
            }
            const sz = parseInt(this.settings.styles.fontSize);
            this.signals.bookready.dispatch();
            this.signals.fontresize.dispatch(sz);
        }.bind(this)).then(function () {
            this.signals.bookloaded.dispatch();
        }.bind(this));

        this.book.loaded.metadata.then((meta) => {
            this.signals.metadata.dispatch(meta);
        });

        this.book.loaded.navigation.then((toc) => {
            this.signals.navigation.dispatch(toc);
        });

        this.rendition.on('click', (e) => {
            const selection = e.view.document.getSelection();
            const range = selection.getRangeAt(0);
            if (range.startOffset === range.endOffset) {
                this.signals.unselected.dispatch();
            }
        });

        this.rendition.on('layout', (props) => {
            this.signals.layout.dispatch(props);
        });

        this.rendition.on('selected', (cfiRange, contents) => {
            this.setLocation(cfiRange);
            this.signals.selected.dispatch(cfiRange, contents);
        });

        this.rendition.on('relocated', (location) => {
            this.setLocation(location.start.cfi);
            this.signals.relocated.dispatch(location);
        });

        this.signals.fontresize.add((value) => {
            const fontSize = value + "%";
            this.settings.styles.fontSize = fontSize;
            this.rendition.themes.fontSize(fontSize);
        });

        this.signals.renditionPrev.add(() => {
            if (this.book.package.metadata.direction === 'rtl') {
                this.rendition.next();
            } else {
                this.rendition.prev();
            }
        });

        this.signals.renditionNext.add(() => {
            if (this.book.package.metadata.direction === 'rtl') {
                this.rendition.prev();
            } else {
                this.rendition.next();
            }
        });
    }

    /* ------------------------------- Common ------------------------------- */

    defaults(obj) {

        for (let i = 1, length = arguments.length; i < length; i++) {
            const source = arguments[i];
            for (let prop in source) {
                if (obj[prop] === void 0)
                    obj[prop] = source[prop];
            }
        }
        return obj;
    }

    uuid() {

        let d = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    }

    /* ------------------------------ Bookmarks ----------------------------- */

    /**
     * Verifying the current page in bookmarks.
     * @param {*} cfi 
     * @returns The index of the bookmark if it exists, or -1 otherwise.
     */
    isBookmarked(cfi) {

        return this.settings.bookmarks.indexOf(cfi);
    }

    /* ----------------------------- Annotations ---------------------------- */

    isAnnotated(note) {

        return this.settings.annotations.indexOf(note);
    }

    /* ------------------------------ Settings ------------------------------ */

    /**
     * Initialize book settings.
     * @param {*} bookPath
     * @param {*} _options
     */
    cfgInit(bookPath, _options) {

        this.settings = this.defaults(_options || {}, {
            bookKey: this.getBookKey(bookPath),
            bookPath: bookPath,
            restore: false,
            history: true,
            reload: false, // ??
            bookmarks: undefined,
            annotations: undefined,
            contained: undefined,
            styles: undefined,
            reflowText: false, // ??
            pagination: false, // ??
            language: undefined
        });

        if (this.settings.restore && this.isSaved()) {
            this.applySavedSettings();
        }

        if (this.settings.bookmarks === undefined) {
            this.settings.bookmarks = [];
        }

        if (this.settings.annotations === undefined) {
            this.settings.annotations = [];
        }

        if (this.settings.styles === undefined) {
            this.settings.styles = { fontSize: '100%' };
        }

        if (this.settings.language === undefined) {
            this.settings.language = 'en';
        }
    }
    
    /**
     * Get book key.
     * @param {*} identifier (url | blob)
     * @returns Book key (MD5).
     */
    getBookKey(identifier) {

        return 'epubjs-reader:' + md5(identifier);
    }
    
    /**
     * Set book key in settings.
     * @param {*} identifier (url | blob)
     * @returns Current book key.
     */
    setBookKey(identifier) {

        if (this.settings.bookKey === undefined) {
            this.settings.bookKey = this.getBookKey(identifier);
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
        
        return localStorage.getItem(this.settings.bookKey) !== null;
    }

    /**
     * Removing the current book settings from local storage.
     * @returns true if the book settings were deleted successfully, or false 
     * otherwise.
     */
    removeSavedSettings() {

        if (!this.isSaved())
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
        }

        if (stored) {
            // Merge styles
            if (stored.styles) {
                this.settings.styles = this.defaults(this.settings.styles || {},
                    stored.styles);
            }
            // Merge the rest
            this.settings = this.defaults(this.settings, stored);
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

    setLocation(cfi) {

        const cfiFragment = "#" + cfi;
        this.currentLocationCfi = cfi;

        // Update the History Location
        if (this.settings.history && window.location.hash !== cfiFragment) {
            // Add CFI fragment to the history
            window.history.pushState({}, '', cfiFragment);
        }
    }

    generatePagination() {
        //
        // no implemented
        //
        //const rect = this.content.viewer.getRect();
        //this.book.generatePagination(rect.width, rect.height);
    }

    keyboardHandler(e) {

        const MOD = (e.ctrlKey || e.metaKey);

        if (MOD) {

            const step = 2;
            let value = parseInt(this.settings.styles.fontSize);

            switch (e.key) {

                case '=':
                    e.preventDefault();
                    value += step;
                    this.signals.fontresize.dispatch(value);
                    break;
                case '-':
                    e.preventDefault();
                    value -= step;
                    this.signals.fontresize.dispatch(value);
                    break;
                case '0':
                    e.preventDefault();
                    value = 100;
                    this.signals.fontresize.dispatch(value);
                    break;
            }
        } else {

            switch (e.key) {
                case 'ArrowLeft':
                    this.signals.renditionPrev.dispatch();
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    this.signals.renditionNext.dispatch();
                    e.preventDefault();
                    break;
            }
        }
    }
}
