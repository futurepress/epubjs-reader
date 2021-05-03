import { UIDiv, UILabel } from '../ui.js';

export class Content {

    constructor(reader) {

        const signals = reader.signals;
        
        this.main = new UIDiv().setId('content');
        this.main.dom.addEventListener('transitionend', (e) => {

            if (reader.settings.sidebarReflow) {
                reader.rendition.resize();
            }
        });
        this.prev = new UIDiv().setId('prev').setClass('arrow');
        this.prev.dom.addEventListener('click', (e) => {
            
            if (reader.book.package.metadata.direction === 'rtl') {
                reader.rendition.next();
            } else {
                reader.rendition.prev();
            }
            e.preventDefault();
        });
        this.prev.add(new UILabel('<'));
        this.next = new UIDiv().setId('next').setClass('arrow');
        this.next.dom.addEventListener('click', (e) => {
            
            if (reader.book.package.metadata.direction === 'rtl') {
                reader.rendition.prev();
            } else {
                reader.rendition.next();
            }
            e.preventDefault();
        });
        this.next.add(new UILabel('>'));
        this.viewer = new UIDiv().setId('viewer');

        this.divider = new UIDiv().setId('divider');
        this.loader = new UIDiv().setId('loader');

        this.main.add([
            this.prev, 
            this.viewer, 
            this.next, 
            this.divider, 
            this.loader
        ]);

        this.reader = reader;
        
        document.body.appendChild(this.main.dom);

        //-- signals --//

        signals.sidebarOpener.add((value) => {
            
            if (value) {
                this.slideOut();
            } else {
                this.slideIn();
            }
        });

        signals.layout.add((props) => {

            if (props.spread === true && props.width > props.spreadWidth) {
                this.showDivider();
            } else {
                this.hideDivider();
            }
        });

        signals.relocated.add((location) => {

            if (location.atStart) {
                this.prev.addClass('disabled');
            } else {
                this.prev.removeClass('disabled');
            }

            if (location.atEnd) {
                this.next.addClass('disabled');
            } else {
                this.next.removeClass('disabled');
            }
        });
    }

    slideIn() {

        //var currentPosition = rendition.currentLocation().start.cfi;
        if (this.reader.settings.sidebarReflow) {
            //this.main.removeClass('single');
        } else {
            //this.main.removeClass('closed');
        }

        this.main.removeClass('single');
        this.main.removeClass('closed');
    }

    slideOut() {
        /*
        var location = rendition.currentLocation();
        if (!location) {
            return;
        }
        var currentPosition = location.start.cfi;
        */
        if (this.reader.settings.sidebarReflow) {
            this.main.addClass('single');
        } else {
            this.main.addClass('closed');
        }
    }

    showLoader() {
        this.loader.dom.style.display = 'block';
        this.hideDivider();
    }

    hideLoader() {
        this.loader.dom.style.display = 'none';

        //-- If the book is using spreads, show the divider
        if(this.reader.book.settings.spreads) {
        	this.showDivider();
        }
    }

    showDivider() {
        this.divider.dom.style.display = 'block';
    }

    hideDivider() {
        this.divider.dom.style.display = 'none';
    }
}