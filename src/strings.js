export class Strings {

    constructor(reader) {

        this.language = reader.settings.language || 'en';
        this.values = {
            en: {
                'toolbar/opener': 'Sidebar',
                'toolbar/upload': 'Upload book',
                'toolbar/upload/error': 'Your browser does not support the required features.\nPlease use a modern browser such as Google Chrome, or Mozilla Firefox.',
                'toolbar/bookmark': 'Add this page to bookmarks',
                'toolbar/fullsceen': 'Fullscreen',

                'sidebar/contents': 'Contents',
                'sidebar/bookmarks': 'Bookmarks',
                'sidebar/bookmarks/add': 'Add',
                'sidebar/bookmarks/remove': 'Remove',
                'sidebar/bookmarks/clear': 'Clear',
                'sidebar/annotations': 'Annotations',
                'sidebar/annotations/add': 'Add',
                'sidebar/annotations/clear': 'Clear',
                'sidebar/annotations/anchor': 'Anchor',
                'sidebar/annotations/cancel': 'Cancel',
                'sidebar/search': 'Search',
                'sidebar/search/placeholder': 'search',
                'sidebar/settings': 'Settings',
                'sidebar/settings/language': 'Language',
                'sidabar/settings/reflowtext': ['Reflow text', 'Reflow text when sidebars are open'],
                'sidebar/settings/pagination': ['Pagination', 'Generate pagination']
            },
            fr: {
                'toolbar/opener': 'Barre latérale',
                'toolbar/upload': 'Ouvrir un livre local',
                'toolbar/upload/error': 'Votre navigateur ne prend pas en charge les fonctions nécessaires.\nVeuillez utiliser un navigateur moderne tel que Google Chrome ou Mozilla Firefox.',
                'toolbar/bookmark': 'Insérer un marque page ici',
                'toolbar/fullsceen': 'Plein écran',

                'sidebar/contents': 'Sommaire',
                'sidebar/bookmarks': 'Marque-pages',
                'sidebar/bookmarks/add': 'Ajouter',
                'sidebar/bookmarks/remove': 'Retirer',
                'sidebar/bookmarks/clear': 'Tout enlever',
                'sidebar/annotations': 'Annotations',
                'sidebar/annotations/add': 'Ajouter',
                'sidebar/annotations/clear': 'Tout enlever',
                'sidebar/annotations/anchor': 'Ancre',
                'sidebar/annotations/cancel': 'Annuler',
                'sidebar/search': 'Rechercher',
                'sidebar/search/placeholder': 'rechercher',
                'sidebar/settings': 'Réglages',
                'sidebar/settings/language': 'Langue',
                'sidabar/settings/reflowtext': ['Réagencer', 'Réagencer les lignes lorsque le panneau latéral est ouvert'],
                'sidebar/settings/pagination': ['Pagination', 'Établir une pagination']
            }
        };
    }

    get(key) { return this.values[this.language][key] || '???'; }
}
