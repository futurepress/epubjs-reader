import { UIPanel, UIRow, UITextArea, UIInput } from '../../ui.js';

export class AnnotationsPanel {

	constructor(reader) {

		const signals = reader.signals;
		const strings = reader.strings;

		this.panel = new UIPanel().setId('annotations');
		this.notes = document.createElement('ul');

		const textBox = new UITextArea();
		textBox.dom.addEventListener('input', (e) => {

			if (isSelected() && e.target.value.length > 0) {
				btn_a.dom.disabled = false;
			} else {
				btn_a.dom.disabled = true;
			}
		});

		this.reader = reader;
		this.range;
		this.cfiRange;

		const ctrlStr = [
			strings.get('sidebar/annotations/add'),
			strings.get('sidebar/annotations/clear')
		];

		const textRow = new UIRow();
		const ctrlRow = new UIRow();

		const btn_a = new UIInput('button', ctrlStr[0]).addClass('btn-start');
		btn_a.dom.disabled = true;
		btn_a.dom.onclick = () => {

			const note = {
				date: new Date(),
				text: textBox.getValue(),
				href: this.cfiRange,
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

		this.panel.add([textRow, ctrlRow]);
		this.panel.dom.appendChild(this.notes);

		this.update = () => {

			btn_c.dom.disabled = reader.settings.annotations.length === 0;
		};

		const isSelected = () => {

			return this.range && this.range.startOffset !== this.range.endOffset;
		};

		//-- signals --//

		signals.bookready.add(() => {

			reader.settings.annotations.forEach((note) => {

				this.add(note);
			});
		});

		signals.selected.add((cfiRange, contents) => {

			this.range = contents.range(cfiRange);
			this.cfiRange = cfiRange;

			if (isSelected() && textBox.getValue().length > 0) {
				btn_a.dom.disabled = false;
			} else {
				btn_a.dom.disabled = true;
			}
		});

		signals.unselected.add(() => {

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
