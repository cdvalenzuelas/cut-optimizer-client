const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { HotModuleReplacementPlugin, DllReferencePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

const path = require('path')
const { env } = require('../config')

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
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'      
    }),
    new DllReferencePlugin({
      manifest: require('../dist/js/modules-manifest.json')
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/app.*']
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dist/js/*.dll.js'),
      outputPath: 'js',
      publicPath: './js',
      includeRelatedFiles: false,
      attributes: {
        nomodule: false
      }     
    })
  ]
}

module.exports = plugins