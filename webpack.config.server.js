const path = require('path');
const webpack = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = ({
    target: 'node',
    entry: path.resolve(__dirname, 'src/server/index.js'),
    output: {
        filename: 'server.bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build'
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: "false"
        }),
        new CleanWebpackPlugin([
            'build/*.*'
        ]),
        new CopyPlugin([{
            from: 'package.json',
            to: 'package.json'
        }])
    ],
    externals: [webpackNodeExternals()]
})