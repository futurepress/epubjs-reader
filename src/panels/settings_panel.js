import { UIPanel, UIRow, UISelect, UIInput, UILabel, UIInteger } from '../ui.js';

export class SettingsPanel extends UIPanel {

	constructor(reader) {

		super();
		super.setId('settings');
		
		const strings = reader.strings;

		const languageStr = strings.get('sidebar/settings/language');
		const languageRow = new UIRow();
		const language = new UISelect().setOptions({
			en: 'English', 
			fr: 'French', 
			ja: 'Japanese', 
			ru: 'Russian'
		});
		language.dom.addEventListener('change', (e) => {

			reader.settings.language = e.target.value;
		});

		languageRow.add(new UILabel(languageStr));
		languageRow.add(language);

		const fontSizeStr = strings.get('sidebar/settings/fontsize');
		const fontSizeRow = new UIRow();
		const fontSize = new UIInteger(100, 1);
		fontSize.dom.addEventListener('change', (e) => {

			reader.emit('fontresize', e.target.value);
		});

		fontSizeRow.add(new UILabel(fontSizeStr));
		fontSizeRow.add(fontSize);

		const reflowTextStr = strings.get('sidabar/settings/reflowtext');
		const reflowTextRow = new UIRow();
		const reflowText = new UIInput('checkbox', false, reflowTextStr[1]);
		reflowText.setId('reflowtext');
		reflowText.dom.addEventListener('click', (e) => {

			reader.settings.reflowText = e.target.checked;
			reader.rendition.resize();
		});

		reflowTextRow.add(new UILabel(reflowTextStr[0], 'reflowtext'));
		reflowTextRow.add(reflowText);

		const paginationStr = strings.get('sidebar/settings/pagination');
		const paginationRow = new UIRow();
		const pagination = new UIInput('checkbox', false, paginationStr[1]);
		pagination.setId('pagination');
		pagination.dom.addEventListener('click', (e) => {

			reader.settings.pagination = e.target.checked;
			reader.generatePagination(); // not implemented
		});

		paginationRow.add(new UILabel(paginationStr[0], 'pagination'));
		paginationRow.add(pagination);

		super.add([
			languageRow,
			fontSizeRow,
			//reflowTextRow,
			//paginationRow
		]);

		//-- events --//

		reader.on('bookready', () => {

			language.setValue(reader.settings.language);
		});

		reader.on('fontresize', (value) => {

			if (fontSize.getValue() !== value) {
				fontSize.setValue(value);
			}
		});
	}
}
