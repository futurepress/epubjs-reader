const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/main.js'
    },
    output: {
        filename: 'reader.min.js',
        path: path.resolve(__dirname, 'reader')
    },
    plugins: [
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
