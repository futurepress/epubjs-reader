export class SettingsController {

	constructor(reader) {

		const scope = this;
		
		this.reader = reader;
		this.settings = $("#settings-modal");
		this.settings.find('.closer').on('click', function() {
			scope.hide();
		});
		this.sidebarReflowSetting = $('#sidebarReflow');
		this.sidebarReflowSetting.on('click', function() {
			reader.settings.sidebarReflow = !reader.settings.sidebarReflow;
		});
		this.overlay = $(".overlay");
		this.overlay.on('click', function() {
			scope.hide();
		});
	}

	show() { this.settings.addClass('md-show'); }

	hide() { this.settings.removeClass('md-show'); }
}