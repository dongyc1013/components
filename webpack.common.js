const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProvidePlugin = require('webpack/lib/ProvidePlugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV === 'development'
const noop = _ => null
module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.jsx'
  },
  output: {
    filename: devMode ? '[name].bundle.js' : '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js',
    path: resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public', 'index.html'),
      minify: devMode ? false : { // 根据环境优化
        removeComments: true,  // 去注释
        collapseWhitespace: true, // 压缩代码
        removeAttributeQuotes: true, // 删除引号
      }
    }),
    new ProvidePlugin({ // 自动加载模块，而不必到处引入
      'React': 'react',
      'ReactDOM': 'react-dom'
    }),
    devMode ? noop : new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css'
    }),
    new HardSourceWebpackPlugin() // 利用缓存加快构建速度
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx'] // 引入文件时默认的扩展名
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: resolve(__dirname, 'src'), // 减少loader处理的文件范围，只处理src中的文件
        use: [
          'babel-loader', // 语法转换，注入新语法等，配置可以新建.babelrc文件
          'eslint-loader' // 语法规则，代码风格检查，配置可以新建.eslintrc文件
        ]
      },
      {
        test: /\.less$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // 生产模式抽离css
          {
            loader: 'css-loader',
            options: {
              modules: true, // 开启css模块化
              importLoaders: 2 // css-loader前有几个loader（loader是从下到上执行）
            }
          },
          'postcss-loader',
          'less-loader'
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: { // 小于8192byte的图片转换为base6编码，减少http请求数量
          limit: 8192
        }
      }
    ]
  }
}