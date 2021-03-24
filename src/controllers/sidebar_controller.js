export class SidebarController {
    
    constructor(reader) {

        const scope = this;
        
        this.reader = reader;
        this.panels = $("#panels");
        this.panels.find('.show_view').on('click', function (event) {
            const view = $(this).data('view');

            scope.changePanelTo(view);
            event.preventDefault();
        });
        this.sidebar = $("#sidebar");
        this.activePanel = 'Toc';
    }

    /**
     * Change panel state to active control view.
     * @param {*} name The control view name
     */
    changePanelTo(name) {

        const controllerName = name + "Controller";

        if (this.activePanel == name || typeof this.reader[controllerName] === 'undefined')
            return;
        
        this.reader[this.activePanel + "Controller"].hide();
        this.reader[controllerName].show();
        this.activePanel = name;

        this.panels.find('.active').removeClass('active');
        this.panels.find('#show-' + name).addClass('active');
    }

    /**
     * Get the active panel name.
     * @returns Current active panel name.
     */
    getActivePanel() {

        return this.activePanel;
    }

    show() {
        this.reader.sidebarOpen = true;
        this.reader.ReaderController.slideOut();
        this.sidebar.addClass('open');
    }

    hide() {
        this.reader.sidebarOpen = false;
        this.reader.ReaderController.slideIn();
        this.sidebar.removeClass('open');
    }
}