const webpack = require('webpack');
const path = require('path');

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
        })
    ]
})