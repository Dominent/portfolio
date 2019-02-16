const webpack = require('webpack');

const webpackClient = require('webpack.client.js');
const webpackServer = require('webpack.server.js');

module.exports = (env) => {
    return [webpackClient, webpackServer];
}