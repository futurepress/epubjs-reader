const path = require('path');
const terser = require('terser');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackConcatPlugin = require('webpack-concat-files-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/main.js'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'reader')
    },
    plugins: [
        new WebpackConcatPlugin({
            bundles: [
                {
                    src: [
                        './src/core.js',
                        './src/reader.js',
                        './src/storage.js',
                        './src/controllers/bookmarks_controller.js',
                        './src/controllers/controls_controller.js',
                        './src/controllers/meta_controller.js',
                        './src/controllers/notes_controller.js',
                        './src/controllers/reader_controller.js',
                        './src/controllers/settings_controller.js',
                        './src/controllers/sidebar_controller.js',
                        './src/controllers/toc_controller.js'
                    ],
                    dest: './reader/js/libs/reader.min.js',
                    transforms: {
                        after: async (code) => {
                            const minifiedCode = await terser.minify(code);
                            return minifiedCode.code;
                        },
                    },
                },
            ],
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'node_modules/jquery/dist/jquery.min.js', 
                    to: 'js/libs/jquery.min.js', 
                    toType: 'file', 
                    force: true
                },
                {
                    from: 'node_modules/jszip/dist/jszip.min.js',
                    to: 'js/libs/jszip.min.js',
                    toType: 'file',
                    force: true
                },                
                {
                    from: 'node_modules/rsvp/dist/rsvp.js',
                    to: 'js/libs/rsvp.min.js',
                    toType: 'file',
                    force: true
                },
                {
                    from: 'node_modules/screenfull/dist/screenfull.js',
                    to: 'js/libs/screenfull.min.js',
                    toType: 'file',
                    force: true
                },
                {
                    from: 'node_modules/epubjs/dist/epub.min.js',
                    to: 'js/libs/epub.min.js',
                    toType: 'file',
                    force: true
                },                
            ],
            options: {
                concurrency: 100,
            },
        }),
    ],
};
