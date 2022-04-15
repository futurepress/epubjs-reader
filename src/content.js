import { UIDiv, UILabel } from './ui.js';

export class Content {

    constructor(reader) {
        
        this.main = new UIDiv().setId('content');
        this.main.dom.addEventListener('transitionend', (e) => {

            if (reader.settings.sidebarReflow) {
                reader.rendition.resize();
            }
        });

        const prev = new UIDiv().setId('prev').setClass('arrow');
        prev.dom.onclick = (e) => {

            reader.emit('prev');
            e.preventDefault();
        };
        prev.add(new UILabel('<'));

        const next = new UIDiv().setId('next').setClass('arrow');
        next.dom.onclick = (e) => {
            
            reader.emit('next');
            e.preventDefault();
        };
        next.add(new UILabel('>'));

        const viewer  = new UIDiv().setId('viewer');
        const divider = new UIDiv().setId('divider');
        const loader  = new UIDiv().setId('loader');

        const showDivider = () => {
            divider.dom.style.display = 'block';
        };

        const hideDivider = () => {
            divider.dom.style.display = 'none';
        };

        const showLoader = () => {
            loader.dom.style.display = 'block';
            hideDivider();
        };

        const hideLoader = () => {
            loader.dom.style.display = 'none';

            //-- If the book is using spreads, show the divider
            if(reader.book.settings.spreads) {
                showDivider();
            }
        };

        this.main.add([prev, viewer, next, divider, loader]);

        this.reader = reader;
        
        document.body.appendChild(this.main.dom);

        //-- events --//

        reader.on('bookloaded', () => {

            hideLoader();
        });

        reader.on('sidebaropener', (value) => {
            
            if (value) {
                this.slideOut();
            } else {
                this.slideIn();
            }
        });

        reader.on('layout', (props) => {

            if (props.spread === true && props.width > props.spreadWidth) {
                showDivider();
            } else {
                hideDivider();
            }
        });

        reader.on('relocated', (location) => {

            if (location.atStart) {
                prev.addClass('disabled');
            } else {
                prev.removeClass('disabled');
            }

            if (location.atEnd) {
                next.addClass('disabled');
            } else {
                next.removeClass('disabled');
            }
        });

        reader.on('prev', () => {

            prev.addClass('active');
            setTimeout(() => { prev.removeClass('active'); }, 100);
        });

        reader.on('next', () => {

            next.addClass('active');
            setTimeout(() => { next.removeClass('active'); }, 100);
        });

        reader.on('viewercleanup', () => {

            viewer.clear();
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
}