import { UIPanel, UIRow, UISelect, UIInput, UILabel } from '../../ui.js';

export class SettingsPanel {

	constructor(reader) {

		const signals = reader.signals;
		const strings = reader.strings;
		
		this.panel = new UIPanel().setId('settings');

		const languageStr = strings.get('sidebar/settings/language');
		const languageRow = new UIRow();
		const language = new UISelect().setOptions({ en: 'English', fr: 'French', ja: 'Japanese' });
		language.dom.addEventListener('change', (e) => {

			reader.settings.language = e.target.value;
		});

		languageRow.add(new UILabel(languageStr));
		languageRow.add(language);
		
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

		this.panel.add([
			languageRow,
			//reflowTextRow,
			//paginationRow
		]);

		//-- signals --//

		signals.bookready.add(() => {

			language.setValue(reader.settings.language);
		});
	}
}
