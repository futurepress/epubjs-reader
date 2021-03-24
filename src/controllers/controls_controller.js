export class ControlsController {
    
    constructor(reader) {

        const scope = this;

        this.reader = reader;
        this.slider = document.getElementById('slider');
        this.slider.addEventListener('click', function () {
            if (reader.sidebarOpen) {
                reader.SidebarController.hide();
                scope.slider.classList.add('icon-menu');
                scope.slider.classList.remove('icon-right');
            } else {
                reader.SidebarController.show();
                scope.slider.classList.add('icon-right');
                scope.slider.classList.remove('icon-menu');
            }
        });
        this.settings = document.getElementById('settings');
        this.settings.addEventListener('click', function () {
            reader.SettingsController.show();
        });
        this.bookmark = document.getElementById('bookmark');
        this.bookmark.addEventListener('click', function () {
            const cfi = reader.rendition.currentLocation().start.cfi;
            const bookmarked = reader.isBookmarked(cfi);

            if (bookmarked === -1) { //-- Add bookmark
                reader.addBookmark(cfi);
                scope.bookmark.classList.add('icon-bookmark');
                scope.bookmark.classList.remove('icon-bookmark-empty');
            } else { //-- Remove Bookmark
                reader.removeBookmark(cfi);
                scope.bookmark.classList.add('icon-bookmark-empty');
                scope.bookmark.classList.remove('icon-bookmark');                
            }
        });
        reader.rendition.on('relocated', function (location) {
            const cfi = location.start.cfi;
            const cfiFragment = "#" + cfi;
            //-- Check if bookmarked
            const bookmarked = reader.isBookmarked(cfi);
            if (bookmarked === -1) { //-- Not bookmarked
                scope.bookmark.classList.add('icon-bookmark-empty');
                scope.bookmark.classList.remove('icon-bookmark');                
            } else { //-- Bookmarked
                scope.bookmark.classList.add('icon-bookmark');
                scope.bookmark.classList.remove('icon-bookmark-empty');
            }

            reader.currentLocationCfi = cfi;

            // Update the History Location
            if (reader.settings.history &&
                window.location.hash != cfiFragment) {
                // Add CFI fragment to the history
                history.pushState({}, '', cfiFragment);
            }
        });

        this.fullscreen = document.getElementById('fullscreen');

        if (typeof screenfull !== 'undefined') {

            this.fullscreen.addEventListener('click', function () {
                screenfull.toggle($('#container')[0]);
            });

            if (screenfull.raw) {

                document.addEventListener(screenfull.raw.fullscreenchange, function () {
                    if (screenfull.isFullscreen) {
                        scope.fullscreen.classList.add('icon-resize-small');
                        scope.fullscreen.classList.remove('icon-resize-full');
                    } else {
                        scope.fullscreen.classList.add('icon-resize-full');
                        scope.fullscreen.classList.remove('icon-resize-small');
                    }
                });
            }
        }
    }
}
