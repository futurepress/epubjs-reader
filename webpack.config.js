const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
    mode: 'development',
    entry: {
        epubreader: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        sourceMapFilename: 'js/[name].js.map'
    },
    devtool: 'source-map',
    optimization: {
        minimize: false
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        compress: true,
        port: 8080
    },
    plugins: [
        new CopyPlugin({
            patterns: [
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
    performance: {
        hints: false
    }
};

module.exports = (env, args) => {

    if (args.optimizationMinimize) {
        config.output.filename = 'js/[name].min.js';
    }

    return config;
};
