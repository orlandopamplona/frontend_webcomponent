const merge = require('webpack-merge')
const common = require('./webpack.common')
const path = require("path")

module.exports = merge(common, {
    mode: 'production',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
});