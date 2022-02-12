import { UIPanel, UITreeView, UITreeViewItem, UILink } from '../../ui.js';

export class TocPanel {
    
    constructor(reader) {
        
        this.panel = new UIPanel().setId('contents');
        this.reader = reader;

        //-- events --//

        reader.on('navigation', (toc) => {
            
            this.init(toc);
        });
    }

    init(toc) {

        this.panel.clear();
        this.panel.add(this.generateToc(toc));
    }

    generateToc(toc) {

        const container = new UITreeView();

        toc.forEach((chapter) => {

            const link = new UILink(chapter.href, chapter.label);
            link.dom.onclick = () => {
                
                this.reader.rendition.display(chapter.href);
                return false;
            };
            
            const treeItem = new UITreeViewItem(chapter.id, link);

            if (chapter.subitems && chapter.subitems.length > 0) {

                const subItems = this.generateToc(chapter.subitems);

                treeItem.setToggle(subItems);
                treeItem.add(subItems);
            }
            container.add(treeItem);
        });

        return container;
    }
}
