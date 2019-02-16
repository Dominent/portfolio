const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const webpackConfigClient = require('./webpack.config.client.js');
const webpackConfigServer = require('./webpack.config.server.js');

module.exports = (env, options) => {
    const sharedConfig = () => ({
        resolve: {
            alias: {
                '@client': path.resolve(__dirname, 'src/client'),
                '@server': path.resolve(__dirname, 'src/server')
            }
        },
        devtool: options.mode === 'development' ? 'source-map' : false,
    })

    return [
        merge(sharedConfig(), webpackConfigClient),
        merge(sharedConfig(), webpackConfigServer)
    ]
}