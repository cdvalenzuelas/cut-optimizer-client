const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { HotModuleReplacementPlugin } = require('webpack')
const path = require('path')
const { env } = require('../src/config')

const plugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '..', '..', 'src', 'index.html')
  })
]