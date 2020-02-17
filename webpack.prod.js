const merge = require('webpack-merge')
const common = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      inline: /^runtime/
    }),
    new OptimizeCSSAssetsPlugin()
  ],
  optimization: {
    runtimeChunk: true
  }
})