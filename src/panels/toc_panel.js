import { UIPanel, UITreeView, UITreeViewItem, UILink } from '../ui.js';

export class TocPanel extends UIPanel {
    
    constructor(reader) {
        
        super();
        super.setId('contents');

        this.reader = reader;
        this.selector = undefined; // save reference to selected tree item

        //-- events --//

        reader.on('navigation', (toc) => {

            this.init(toc);
        });
    }

    init(toc) {

        super.clear();
        super.add(this.generateToc(toc));
    }

    generateToc(toc, parent) {

        const container = new UITreeView();

        toc.forEach((chapter) => {

            const link = new UILink(chapter.href, chapter.label);
            const treeItem = new UITreeViewItem(chapter.id, link, parent);

            link.dom.onclick = () => {

                this.reader.rendition.display(chapter.href);
                if (this.selector && this.selector !== treeItem) {
                    this.selector.unselect();
                }
                treeItem.select();
                this.selector = treeItem;
                this.reader.emit('tocselected', chapter.id);
                return false;
            };

            if (this.reader.settings.sectionId === chapter.id) {
                treeItem.select();
                this.selector = treeItem;
            }

            if (chapter.subitems && chapter.subitems.length > 0) {
                
                treeItem.setItems(this.generateToc(chapter.subitems, treeItem));
            }

            container.add(treeItem);
        });

        return container;
    }
}
