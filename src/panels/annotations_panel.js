import { UIPanel, UIRow, UITextArea, UIInput } from '../ui.js';

export class AnnotationsPanel extends UIPanel {

	constructor(reader) {
		
		super();
		super.setId('annotations');

		const strings = reader.strings;
		const ctrlStr = [
			strings.get('sidebar/annotations/add'),
			strings.get('sidebar/annotations/clear')
		];

		this.reader = reader;
		this.notes = document.createElement('ul');

		const textBox = new UITextArea();
		textBox.dom.addEventListener('input', (e) => {

			if (isSelected() && e.target.value.length > 0) {
				btn_a.dom.disabled = false;
			} else {
				btn_a.dom.disabled = true;
			}
		});

		const selector = {
			range: undefined,
			cfiRange: undefined
		};

		const textRow = new UIRow();
		const ctrlRow = new UIRow();

		const btn_a = new UIInput('button', ctrlStr[0]).addClass('btn-start');
		btn_a.dom.disabled = true;
		btn_a.dom.onclick = () => {

			const note = {
				date: new Date(),
				text: textBox.getValue(),
				href: selector.cfiRange,
				uuid: reader.uuid()
			};

			reader.settings.annotations.push(note);

			this.add(note);

			textBox.setValue('');
			btn_a.dom.disabled = true;
			return false;
		};

		const btn_c = new UIInput('button', ctrlStr[1]).addClass('btn-end');
		btn_c.dom.disabled = true;
		btn_c.dom.onclick = () => {

			this.clearNotes();
			return false;
		};

		textRow.add(textBox);
		ctrlRow.add([btn_a, btn_c]);

		super.add([textRow, ctrlRow]);
		this.dom.appendChild(this.notes);

		this.update = () => {

			btn_c.dom.disabled = reader.settings.annotations.length === 0;
		};

		const isSelected = () => {

			return selector.range && selector.range.startOffset !== selector.range.endOffset;
		};

		//-- events --//

		reader.on('bookready', () => {

			reader.settings.annotations.forEach((note) => {

				this.add(note);
			});
		});

		reader.on('selected', (cfiRange, contents) => {

			selector.range = contents.range(cfiRange);
			selector.cfiRange = cfiRange;

			if (isSelected() && textBox.getValue().length > 0) {
				btn_a.dom.disabled = false;
			} else {
				btn_a.dom.disabled = true;
			}
		});

		reader.on('unselected', () => {

			btn_a.dom.disabled = true;
		});
	}

	add(note) {

		const item = document.createElement('li');
		const link = document.createElement('a');
		const btnr = document.createElement('span');
		const call = () => {};
		
		link.href = "#" + note.href;
		link.textContent = note.text;
		link.onclick = () => {

			this.reader.rendition.display(note.href);
			return false;
		};

		item.id = 'note-' + note.uuid;
		item.appendChild(link);

		btnr.className = 'btn-remove';
		btnr.onclick = () => {
			
			this.remove(note);
			return false;
		};
		
		item.appendChild(btnr);

		this.notes.appendChild(item);
		this.reader.rendition.annotations.add(
			"highlight", note.href, {}, call, "note-highlight", {});
		this.update();
	}

	remove(note) {

		const index = this.reader.settings.annotations.indexOf(note);
		if (index === -1)
			return;

		this.notes.removeChild(this.notes.childNodes[index]);
		this.reader.settings.annotations.splice(index, 1);
		this.reader.rendition.annotations.remove(note.href, "highlight");
		this.update();
	}

	clearNotes() {

		const len = this.reader.settings.annotations.length;
		for(let i = 0; i < len; i++) {

			this.remove(this.reader.settings.annotations[i]);
		}
	}
}
