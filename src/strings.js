export class Strings {

    constructor(reader) {

        this.language = reader.settings.language || 'en';
        this.values = {
            en: {
                'toolbar/opener': 'Sidebar',
                'toolbar/openbook': 'Open book',
                'toolbar/openbook/error': 'Your browser does not support the required features.\nPlease use a modern browser such as Google Chrome, or Mozilla Firefox.',
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
                'sidebar/settings/fontsize': 'Font size (%)',
                'sidabar/settings/reflowtext': ['Reflow text', 'Reflow text when sidebars are open'],
                'sidebar/settings/pagination': ['Pagination', 'Generate pagination']
            },
            fr: {
                'toolbar/opener': 'Barre latérale',
                'toolbar/openbook': 'Ouvrir un livre local',
                'toolbar/openbook/error': 'Votre navigateur ne prend pas en charge les fonctions nécessaires.\nVeuillez utiliser un navigateur moderne tel que Google Chrome ou Mozilla Firefox.',
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
                'sidebar/settings/fontsize': '???',
                'sidabar/settings/reflowtext': ['Réagencer', 'Réagencer les lignes lorsque le panneau latéral est ouvert'],
                'sidebar/settings/pagination': ['Pagination', 'Établir une pagination']
            },
            ja: {
                'toolbar/opener': 'サイドバー',
                'toolbar/openbook': '本を開く',
                'toolbar/openbook/error': 'ご利用のブラウザは必要な機能をサポートしていません。\nGoogle Chrome、Mozilla Firefox、その他のモダンなブラウザでご利用ください。',
                'toolbar/bookmark': 'このページに栞を設定する',
                'toolbar/fullsceen': 'フルスクリーン',

                'sidebar/contents': '目次',
                'sidebar/bookmarks': '栞',
                'sidebar/bookmarks/add': '追加',
                'sidebar/bookmarks/remove': '削除',
                'sidebar/bookmarks/clear': 'クリア',
                'sidebar/annotations': '注釈',
                'sidebar/annotations/add': '追加',
                'sidebar/annotations/clear': 'クリア',
                'sidebar/annotations/anchor': 'アンカー',
                'sidebar/annotations/cancel': 'キャンセル',
                'sidebar/search': '検索',
                'sidebar/search/placeholder': '検索',
                'sidebar/settings': '設定',
                'sidebar/settings/language': '表示言語',
                'sidebar/settings/fontsize': '???',
                'sidabar/settings/reflowtext': ['再配置', 'サイドバーを開いた時に、テキストを再配置します。'],
                'sidebar/settings/pagination': ['ページネーション', 'ページネーションを生成します。']
            },
            ru: {
                'toolbar/opener': 'Боковая панель',
                'toolbar/openbook': 'Открыть книгу',
                'toolbar/openbook/error': 'Ваш браузер не поддерживает необходимые функции.\nПожалуйста, используйте современный браузер, такой как Google Chrome или Mozilla Firefox.',
                'toolbar/bookmark': 'Добавить эту страницу в закладки',
                'toolbar/fullsceen': 'Полноэкранный режим',

                'sidebar/contents': 'Содержание',
                'sidebar/bookmarks': 'Закладки',
                'sidebar/bookmarks/add': 'Добавить',
                'sidebar/bookmarks/remove': 'Удалить',
                'sidebar/bookmarks/clear': 'Очистить',
                'sidebar/annotations': 'Аннотации',
                'sidebar/annotations/add': 'Добавить',
                'sidebar/annotations/clear': 'Очистить',
                'sidebar/annotations/anchor': 'Метка',
                'sidebar/annotations/cancel': 'Отмена',
                'sidebar/search': 'Поиск',
                'sidebar/search/placeholder': 'поиск...',
                'sidebar/settings': 'Настройки',
                'sidebar/settings/language': 'Язык',
                'sidebar/settings/fontsize': 'Размер шрифта',
                'sidabar/settings/reflowtext': ['Перекомпоновать текст', 'Перекомпоновать текст при открытых боковых панелях'],
                'sidebar/settings/pagination': ['Нумерация страниц', 'Генерировать нумерацию страниц']
            }
        };
    }

    get(key) { return this.values[this.language][key] || '???'; }
}
