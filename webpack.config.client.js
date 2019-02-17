const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const env = require('./src/env');
const envKeys = Object.keys(env || {}).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = ({
    target: 'node',
    entry: path.resolve(__dirname, 'src/client/index.js'),
    output: {
        filename: 'client.bundle.js',
        path: path.resolve(__dirname, 'build/public'),
        publicPath: '/build/public'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules',
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ],
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: [
                    path.resolve(__dirname, './node_modules'),
                ],
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: '/images',
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' },
                    { loader: 'resolve-url-loader' },
                    {
                        loader: 'sass-loader', options: {
                            sourceMap: true,
                            sourceMapContents: false
                        }
                    }
                ]
            },

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new webpack.DefinePlugin(envKeys)
    ]
})