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
                '@server': path.resolve(__dirname, 'src/server'),
                '@env': path.resolve(__dirname, 'src/env'),
                '@store': path.resolve(__dirname, 'src/client/store')
            }
        },
        devtool: options.mode === 'development' ? 'source-map' : false,
        module: {
            rules: [
                { test: /\.json$/i, loader: 'json-loader' },
                {
                    test: /\.(jpe?g|jpg|png|gif|svg)$/i,
                    use: [
                        'url-loader?limit=10000',
                        'img-loader'
                    ]
                }
            ]
        },
    })

    return [
        merge(sharedConfig(), webpackConfigClient),
        merge(sharedConfig(), webpackConfigServer)
    ]
}