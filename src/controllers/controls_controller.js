EPUBJS.reader.ControlsController = function (book) {
    var reader = this;
    var rendition = this.rendition;

    var $store = $("#store"),
        $fullscreen = $("#fullscreen"),
        $fullscreenicon = $("#fullscreenicon"),
        $cancelfullscreenicon = $("#cancelfullscreenicon"),
        $slider = $("#slider"),
        $main = $("#main"),
        $sidebar = $("#sidebar"),
        $settings = $("#settings"),
        $bookmark = $("#bookmark");
	/*
	var goOnline = function() {
		reader.offline = false;
		// $store.attr("src", $icon.data("save"));
	};

	var goOffline = function() {
		reader.offline = true;
		// $store.attr("src", $icon.data("saved"));
	};

	var fullscreen = false;

	book.on("book:online", goOnline);
	book.on("book:offline", goOffline);
	*/
    $slider.on("click", function () {
        if (reader.sidebarOpen) {
            reader.SidebarController.hide();
            $slider.addClass("icon-menu");
            $slider.removeClass("icon-right");
        } else {
            reader.SidebarController.show();
            $slider.addClass("icon-right");
            $slider.removeClass("icon-menu");
        }
    });

    if (typeof screenfull !== 'undefined') {
        $fullscreen.on("click", function () {
            screenfull.toggle($('#container')[0]);
        });
        if (screenfull.raw) {
            document.addEventListener(screenfull.raw.fullscreenchange, function () {
                fullscreen = screenfull.isFullscreen;
                if (fullscreen) {
                    $fullscreen
                        .addClass("icon-resize-small")
                        .removeClass("icon-resize-full");
                } else {
                    $fullscreen
                        .addClass("icon-resize-full")
                        .removeClass("icon-resize-small");
                }
            });
        }
    }

    $settings.on("click", function () {
        reader.SettingsController.show();
    });

    $bookmark.on("click", function () {
        var cfi = reader.rendition.currentLocation().start.cfi;
        var bookmarked = reader.isBookmarked(cfi);

        if (bookmarked === -1) { //-- Add bookmark
            reader.addBookmark(cfi);
            $bookmark
                .addClass("icon-bookmark")
                .removeClass("icon-bookmark-empty");
        } else { //-- Remove Bookmark
            reader.removeBookmark(cfi);
            $bookmark
                .removeClass("icon-bookmark")
                .addClass("icon-bookmark-empty");
        }
    });

    rendition.on('relocated', function (location) {
        var cfi = location.start.cfi;
        var cfiFragment = "#" + cfi;
        //-- Check if bookmarked
        var bookmarked = reader.isBookmarked(cfi);
        if (bookmarked === -1) { //-- Not bookmarked
            $bookmark
                .removeClass("icon-bookmark")
                .addClass("icon-bookmark-empty");
        } else { //-- Bookmarked
            $bookmark
                .addClass("icon-bookmark")
                .removeClass("icon-bookmark-empty");
        }

        reader.currentLocationCfi = cfi;

        // Update the History Location
        if (reader.settings.history &&
            window.location.hash != cfiFragment) {
            // Add CFI fragment to the history
            history.pushState({}, '', cfiFragment);
        }
    });

    return {

    };
};
