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
                    from: 'node_modules/signals/dist/signals.min.js',
                    to: 'js/libs/signals.min.js',
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
                    from: 'node_modules/js-md5/build/md5.min.js',
                    to: 'js/libs/md5.min.js',
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
