import { UIPanel, UIText } from '../ui.js';

export class MetadataPanel {
	
	constructor(reader) {
		
		this.panel = new UIPanel().setId('metadata');
		this.title = new UIText().setId('book-title');
		this.creator = new UIText().setId('book-creator');
		this.separator = new UIText().setId('book-title-separator');

		this.panel.add([this.title, this.separator, this.creator]);

		//-- events --//

		reader.on('metadata', (meta) => {

			this.init(meta);
		});
	}

	init(meta) {
		
		document.title = meta.title + " – " + meta.creator;

		this.title.setValue(meta.title);
		this.creator.setValue(meta.creator);
		this.separator.dom.style.display = 'inline-block';
	}
}
