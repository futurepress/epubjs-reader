export class TocController {
    
    constructor(reader, toc) {

        const scope = this;

        this.reader = reader;
        this.reader.rendition.on('renderered', this.chapterChange);        
        this.currentChapter = false;

        const docfrag = document.createDocumentFragment();
        const tocitems = this.generateTocItems(toc);
        docfrag.appendChild(tocitems);

        this.list = $('#tocView').empty();
        this.list.append(docfrag);
        this.list.find('.toc_link').on('click', function (event) {

            const url = this.getAttribute('href');
            event.preventDefault();

            //-- Provide the Book with the url to show
            //   The Url must be found in the books manifest
            reader.rendition.display(url);

            scope.list.find('.currentChapter')
                .addClass('openChapter')
                .removeClass('currentChapter');

            $(this).parent('li').addClass('currentChapter');
        });
        this.list.find('.toc_toggle').on('click', function (event) {
            const el = $(this).parent('li');
            const open = el.hasClass('openChapter');

            event.preventDefault();
            if (open) {
                el.removeClass('openChapter');
            } else {
                el.addClass('openChapter');
            }
        });
    }

    generateTocItems(toc, level) {

        const scope = this;
        const container = document.createElement('ul');

        if (!level) level = 1;

        toc.forEach(function (chapter) {

            const listitem = document.createElement('li');
            const link = document.createElement('a');
            const toggle = document.createElement('a');

            listitem.id = 'toc-' + chapter.id;
            listitem.classList.add('list_item');

            link.textContent = chapter.label;
            link.href = chapter.href;
            link.classList.add('toc_link');

            listitem.appendChild(link);

            if (chapter.subitems && chapter.subitems.length > 0) {
                level++;
                const subitems = scope.generateTocItems(chapter.subitems, level);
                toggle.classList.add('toc_toggle');

                listitem.insertBefore(toggle, link);
                listitem.appendChild(subitems);
            }

            container.appendChild(listitem);
        });

        return container;
    }

    show() { this.list.show(); }

    hide() { this.list.hide(); }

    chapterChange(e) {
        
        const id = e.id;
        const item = this.list.find('#toc-' + id);
        const open = this.list.find('.openChapter');        
        const current = this.list.find('.currentChapter');

        if (item.length) {

            if (item != current && item.has(currentChapter).length > 0) {
                current.removeClass('currentChapter');
            }

            item.addClass('currentChapter');

            // $open.removeClass("openChapter");
            item.parents('li').addClass('openChapter');
        }
    }
}
