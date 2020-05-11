const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { env } = require('../../config')

let styleLoader

if (env === 'development'){
  styleLoader = 'style-loader'
} else {
  styleLoader = MiniCssExtractPlugin.loader
}

module.exports = styleLoader

