const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        libraryTarget: 'umd',
        library:'iFramy',
        libraryExport: 'default'

    },
    plugins: [
        new webpack.DefinePlugin({
            VERISON: JSON.stringify(require("./package.json").version)
        })
    ]
};
