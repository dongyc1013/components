const { resolve } = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
module.exports = merge(common, {
  mode: 'development',
  plugins: [ new SpeedMeasurePlugin() ],
  devtool: 'source-map',
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    port: 3000,
    hot: true,
    open: true
  }
})