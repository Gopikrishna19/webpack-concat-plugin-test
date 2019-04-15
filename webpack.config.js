const globby = require('globby');
const path = require('path');

const WebpackPluginConcat = require('webpack-concat-plugin');
const WebpackPluginHtml = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devtool: false,
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    plugins: [
        new WebpackPluginConcat({
            fileName: '[name].js',
            filesToConcat: globby.sync([path.resolve(__dirname, 'src', 'externals.js')]),
            name: 'externals',
            injectType: 'append'
        }),
        new WebpackPluginConcat({
            fileName: '[name].js',
            filesToConcat: globby.sync([path.resolve(__dirname, 'src', 'vendor.js')]),
            name: 'vendor',
            injectType: 'append'
        }),
        new WebpackPluginHtml({
            template: 'src/index.html'
        })
    ]
};
