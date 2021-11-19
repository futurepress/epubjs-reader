const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
    mode: 'production',
    entry: {
        epubreader: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'js/[name].min.js'
    },
    optimization: {
        minimize: true
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist/')
        },
        compress: true,
        port: 8080
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

    if (args.mode === 'development') {
        config.output.filename = 'js/[name].js';
        config.optimization.minimize = false;
    }
    
    return config;
};
