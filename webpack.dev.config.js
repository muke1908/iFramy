const webpack = require('webpack');
const path = require('path');
var Visualizer = require('webpack-visualizer-plugin');
// const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        libraryTarget: 'umd',
        library:'iFramy',
        libraryExport: 'default'

    },
    plugins: [
        new Visualizer()
    ]
};
