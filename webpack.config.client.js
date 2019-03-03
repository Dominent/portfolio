const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = ({
    entry: path.resolve(__dirname, 'src/client/index.js'),
    output: {
        filename: 'client.bundle.js',
        path: path.resolve(__dirname, 'build/public'),
        publicPath: '/build/public'
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: "true"
        }),
        new CopyPlugin([{
            from: 'src/client/img/',
            to: 'img/'
        }])
    ]
})