const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackConfigClient = require('./webpack.config.client.js');
const webpackConfigServer = require('./webpack.config.server.js');
const Dotenv = require('dotenv-webpack');

module.exports = (env, options) => {
    const sharedConfig = () => ({
        resolve: {
            alias: {
                '@client': path.resolve(__dirname, 'src/client'),
                '@server': path.resolve(__dirname, 'src/server'),
                '@env': path.resolve(__dirname, 'src/env'),
                '@store': path.resolve(__dirname, 'src/client/store'),
                '@components': path.resolve(__dirname, 'src/client/components'),
            }
        },
        devtool: options.mode === 'development' ? 'source-map' : false,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [
                        path.resolve(__dirname, './node_modules')
                    ],
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/,
                    exclude: [
                        path.resolve(__dirname, './node_modules'),
                    ],
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                            name: '[name].[ext]',
                            publicPath: './'
                        }
                    }
                },
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sourceMapContents: false
                            }
                        }
                    ]
                },
                {
                    test: /\.json$/i,
                    exclude: [
                        path.resolve(__dirname, './node_modules'),
                    ],
                    loader: 'json-loader'
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new Dotenv()
        ]
    })

    return [
        merge(sharedConfig(), webpackConfigClient),
        merge(sharedConfig(), webpackConfigServer)
    ]
}