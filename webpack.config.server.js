const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = ({
    target: 'node',
    entry: path.resolve(__dirname, 'src/server/index.js'),
    output: {
        filename: 'server.bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build'
    },
    externals: [webpackNodeExternals()]
})