import { UIPanel, UIDiv, UIInput } from './ui.js';
import { MetadataPanel } from './panels/metadata_panel.js';

export class Toolbar {
    
    constructor(reader) {

        const strings = reader.strings;

        const container = new UIDiv().setId('toolbar');

        const start = new UIPanel().setId('start');
        const opener = new UIInput('button').setId('btn-s');
        const openerStr = strings.get('toolbar/opener');
        opener.dom.title = openerStr;
        opener.dom.onclick = () => {

            const isOpen = opener.dom.classList.length > 0;

            reader.emit('sidebaropener', !isOpen);

            if (!isOpen) {
                opener.addClass('open');
            } else {
                opener.removeClass('open');
            }
        };

        start.add(opener);

        const center = new MetadataPanel(reader);

        const end = new UIPanel().setId('end');
        const open = new UIInput('file').setId('btn-o');
        const uploadStr = strings.get('toolbar/openbook');
        const storage = window.storage;
        open.dom.title = uploadStr;
        open.dom.accept = 'application/epub+zip';
        open.dom.addEventListener('change', function (e) {

            if (e.target.files.length === 0)
                return;

            if (window.FileReader) {

                const fr = new FileReader();
                fr.onload = function (e) {
                    storage.clear();
                    storage.set(e.target.result, () => {
                        reader.unload();
                        reader.init(e.target.result, { restore: true });
                    });
                };
                fr.readAsArrayBuffer(e.target.files[0]);
                fr.onerror = function (e) {
                    console.error(e);
                };

                if (window.location.href.includes("?bookPath=")) {
                    window.location.href = window.location.origin + window.location.pathname;
                }

            } else {
                alert(strings.get('toolbar/openbook/error'));
            }
        }, false);

        end.add(open);

        const bookmark = new UIInput('button').setId('btn-b');
        const bookmarkStr = strings.get('toolbar/bookmark');
        bookmark.dom.title = bookmarkStr;
        bookmark.dom.addEventListener('click', () => {

            const cfi = reader.rendition.currentLocation().start.cfi;
            reader.emit('bookmarked', reader.isBookmarked(cfi) === -1);
        });

        end.add(bookmark);

        if (document.fullscreenEnabled) {
            
            const fullscreen = new UIInput('button').setId('btn-f');
            const fullscreenStr = strings.get('toolbar/fullsceen');
            fullscreen.dom.title = fullscreenStr;
            fullscreen.dom.addEventListener('click', () => {
                
                this.toggleFullScreen();
            });

            document.addEventListener('keydown', (e) => {
            
                if (e.key === 'F11') {
                    e.preventDefault();
                    this.toggleFullScreen();
                }
            }, false);

            document.addEventListener('fullscreenchange', (e) => {

                const w = window.screen.width === e.path[2].innerWidth;
                const h = window.screen.height === e.path[2].innerHeight;
                
                if (w && h) {
                    fullscreen.addClass('resize-small');
                } else {
                    fullscreen.removeClass('resize-small');
                }
            }, false);

            end.add(fullscreen);
        }

        container.add([start, center, end]);
        document.body.appendChild(container.dom);

        //-- events --//

        reader.on('relocated', (location) => {

            const cfi = location.start.cfi;

            if (reader.isBookmarked(cfi) === -1) {
                bookmark.removeClass('bookmarked');
            } else {
                bookmark.addClass('bookmarked');
            }
        });

        reader.on('bookmarked', (value) => {

            if (value) {
                bookmark.addClass('bookmarked');
            } else {
                bookmark.removeClass('bookmarked');
            }
        });
    }

    toggleFullScreen() {
        
        document.activeElement.blur();
        
        if (document.fullscreenElement === null) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
