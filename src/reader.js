import EventEmitter from "event-emitter";

import { Toolbar } from './toolbar.js';
import { Sidebar } from './sidebar.js';
import { Content } from './content.js';
import { Strings } from './strings.js';

export class Reader {

    constructor(bookPath, _options) {

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
        window.addEventListener('wheel', (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    /**
     * Initialize book.
     * @param {*} bookPath 
     * @param {*} _options 
     */
    init(bookPath, _options) {

        this.emit('viewercleanup');
        
        if (arguments.length > 0) {

            this.cfgInit(bookPath, _options);
        }

        this.book = ePub(this.settings.bookPath);
        this.rendition = this.book.renderTo('viewer', {
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
            this.emit('renderered', renderer);
        });

        this.book.ready.then(function () {
            if (this.settings.pagination) {
                this.generatePagination();
            }
            this.emit('bookready');
            this.emit('fontresize', parseInt(this.settings.styles.fontSize));
        }.bind(this)).then(function () {
            this.emit('bookloaded');
        }.bind(this));

        this.book.loaded.metadata.then((meta) => {
            this.emit('metadata', meta);
        });

        this.book.loaded.navigation.then((toc) => {
            this.emit('navigation', toc);
        });

        this.rendition.on('click', (e) => {
            const selection = e.view.document.getSelection();
            const range = selection.getRangeAt(0);
            if (range.startOffset === range.endOffset) {
                this.emit('unselected');
            }
        });

        this.rendition.on('layout', (props) => {
            this.emit('layout', props);
        });

        this.rendition.on('selected', (cfiRange, contents) => {
            this.setLocation(cfiRange);
            this.emit('selected', cfiRange, contents);
        });

        this.rendition.on('relocated', (location) => {
            this.setLocation(location.start.cfi);
            this.emit('relocated', location);
        });

        this.on('fontresize', (value) => {
            const fontSize = value + "%";
            this.settings.styles.fontSize = fontSize;
            this.rendition.themes.fontSize(fontSize);
        });

        this.on('prev', () => {
            if (this.book.package.metadata.direction === 'rtl') {
                this.rendition.next();
            } else {
                this.rendition.prev();
            }
        });

        this.on('next', () => {
            if (this.book.package.metadata.direction === 'rtl') {
                this.rendition.prev();
            } else {
                this.rendition.next();
            }
        });

        this.on('tocselected', (sectionId) => {
            this.settings.sectionId = sectionId;
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
            sectionId: undefined,
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

            if (this.rendition.location) {
                const curLocation = this.rendition.currentLocation();
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

        const baseUrl = this.book.archived ? undefined : this.book.url;
        const url = new URL(window.location, baseUrl);
        url.hash = "#" + cfi;

        // Update the History Location
        if (this.settings.history && window.location.hash !== url.hash) {
            // Add CFI fragment to the history
            window.history.pushState({}, "", url);
            this.currentLocationCfi = cfi;
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
                    this.emit('fontresize', value);
                    break;
                case '-':
                    e.preventDefault();
                    value -= step;
                    this.emit('fontresize', value);
                    break;
                case '0':
                    e.preventDefault();
                    value = 100;
                    this.emit('fontresize', value);
                    break;
            }
        } else {

            switch (e.key) {
                case 'ArrowLeft':
                    this.emit('prev');
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    this.emit('next');
                    e.preventDefault();
                    break;
            }
        }
    }
}

EventEmitter(Reader.prototype);
