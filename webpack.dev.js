const { resolve } = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
module.exports = merge(common, {
  /**
   * development模式webpack默认会增加以下配置
   * devtool: 'eval',
   * plugins: [
   *   new NamedModulesPlugin(), 开启HMR时显示模块路径而不是id
   *   new NamedChunksPlugin(), 使用模块名称作为chunkId而不是原本的递增id
   *   new DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}) 定义一个值为development的全局变量
   * ]
   */
  mode: 'development',
  plugins: [ new SpeedMeasurePlugin() ],
  devtool: 'source-map',
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    port: 3000,
    hot: true, // 开启热模块替换
    open: true
  }
})