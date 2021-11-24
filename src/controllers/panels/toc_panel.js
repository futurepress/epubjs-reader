import { UIPanel } from '../../ui.js';

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
        this.panel.dom.appendChild(this.generateToc(toc));
    }

    generateToc(toc, level) {

        const container = document.createElement('ul');

        if (!level) level = 1;

        toc.forEach((chapter) => {
            
            const listItem = document.createElement('li');
            const linkItem = document.createElement('a');
            const expander = document.createElement('div');
            
            expander.id = 'expander';
            listItem.id = chapter.id;
            linkItem.href = chapter.href;
            linkItem.textContent = chapter.label;
            linkItem.onclick = () => {
                
                this.reader.rendition.display(chapter.href);
                return false;
            };

            listItem.appendChild(expander);
            listItem.appendChild(linkItem);

            if (chapter.subitems && chapter.subitems.length > 0) {
                level++;
                const subitems = this.generateToc(chapter.subitems, level);
                const toggle = document.createElement('span');
                
                toggle.className = 'toggle-collapsed';
                toggle.onclick = () => {

                    if (toggle.className === 'toggle-collapsed') {
                        toggle.className = 'toggle-expanded';
                        subitems.style.display = 'block';
                    } else {
                        toggle.className = 'toggle-collapsed';
                        subitems.style.display = 'none';
                    }
                    return false;
                };

                expander.appendChild(toggle);

                listItem.insertBefore(expander, linkItem);
                listItem.appendChild(subitems);
            }

            container.appendChild(listItem);
        });

        return container;
    }
}
