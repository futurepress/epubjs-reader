export class ReaderController {

    constructor(reader) {

        const scope = this;
        
        this.main = $("#main");
        this.divider = $("#divider");
        this.loader = $("#loader");
        this.next = $("#next");
        this.prev = $("#prev");
        
        this.reader = reader;
        this.reader.rendition.on('layout', function(props) {
            if (props.spread === true) {
                scope.showDivider();
            } else {
                scope.hideDivider();
            }
        });
        this.reader.rendition.on('relocated', function (location) {
            if (location.atStart) {
                scope.prev.addClass('disabled');
            }
            if (location.atEnd) {
                scope.next.addClass('disabled');
            }
        });

        document.addEventListener('keydown', this.arrowKeys, false);
        this.keylock = false;

        this.next.on('click', function (e) {

            if (reader.book.package.metadata.direction === 'rtl') {
                reader.rendition.prev();
            } else {
                reader.rendition.next();
            }

            e.preventDefault();
        });
        this.prev.on('click', function (e) {

            if (reader.book.package.metadata.direction === 'rtl') {
                reader.rendition.next();
            } else {
                reader.rendition.prev();
            }

            e.preventDefault();
        });
    }

    slideIn() {

        const scope = this;
        //var currentPosition = rendition.currentLocation().start.cfi;
        if (this.reader.settings.sidebarReflow) {
            this.main.removeClass('single');
            this.main.one('transitionend', function () {
                scope.reader.rendition.resize();
            });
        } else {
            this.main.removeClass('closed');
        }
    }

    slideOut() {

        const scope = this;
        /*
		var location = rendition.currentLocation();
		if (!location) {
			return;
		}
		var currentPosition = location.start.cfi;
		*/
        if (this.reader.settings.sidebarReflow) {
            this.main.addClass('single');
            this.main.one('transitionend', function () {
                scope.reader.rendition.resize();
            });
        } else {
            this.main.addClass('closed');
        }
    }

    showLoader() {
        this.loader.show();
        this.hideDivider();
    }

    hideLoader() {
        this.loader.hide();

        //-- If the book is using spreads, show the divider
        // if(book.settings.spreads) {
        // 	showDivider();
        // }
    }

    showDivider() {

        this.divider.addClass('show');
    }

    hideDivider() {

        this.divider.removeClass('show');
    }

    arrowKeys(e) {

        const scope = this;
        
        if (e.keyCode == 37) {

            if (this.reader.book.package.metadata.direction === 'rtl') {
                this.reader.rendition.next();
            } else {
                this.reader.rendition.prev();
            }

            this.prev.addClass('active');

            this.keylock = true;
            setTimeout(function () {
                scope.keylock = false;
                scope.prev.removeClass('active');
            }, 100);

            e.preventDefault();
        }
        if (e.keyCode == 39) {

            if (this.reader.book.package.metadata.direction === 'rtl') {
                this.reader.rendition.prev();
            } else {
                rendition.next();
            }

            this.next.addClass('active');

            this.keylock = true;
            setTimeout(function () {
                scope.keylock = false;
                scope.next.removeClass('active');
            }, 100);

            e.preventDefault();
        }
    }
}