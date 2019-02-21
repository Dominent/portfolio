const webpack = require('webpack');
const path = require('path');

const env = require('./src/env');
const envKeys = Object.keys(env || {}).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = ({
    entry: path.resolve(__dirname, 'src/client/index.js'),
    output: {
        filename: 'client.bundle.js',
        path: path.resolve(__dirname, 'build/public'),
        publicPath: '/build/public'
    },
    plugins: [
        new webpack.DefinePlugin(envKeys)
    ]
})