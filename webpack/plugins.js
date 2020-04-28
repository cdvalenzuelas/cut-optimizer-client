const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { HotModuleReplacementPlugin, DllReferencePlugin } = require('webpack')
const path = require('path')
const { env } = require('../src/config')

let plugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '..', 'src', 'index.html')
  })
]

if (env === 'development'){
  plugins = [
    ...plugins,
    new HotModuleReplacementPlugin()
  ]
} else {
  plugins = [
    ...plugins,
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new DllReferencePlugin({
      manifest: require('../dist/js/modules-manifest.json')
    })
  ]
}

module.exports = plugins