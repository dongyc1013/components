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
      minify: devMode ? false : {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      }
    }),
    new ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom'
    }),
    devMode ? noop : new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css'
    }),
    new HardSourceWebpackPlugin()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: resolve(__dirname, 'src'),
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // 生产模式抽离css
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2
            }
          },
          'postcss-loader',
          'less-loader'
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    ]
  }
}