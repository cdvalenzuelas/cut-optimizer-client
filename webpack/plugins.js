const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { HotModuleReplacementPlugin, DllReferencePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

const path = require('path')
const { env } = require('../config')

let plugins = []

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
      manifest: require('../build/js/libs-manifest.json')
    }),       
    new AddAssetHtmlWebpackPlugin([
      {
        filepath: path.resolve(__dirname, '../build/js/*.dll.js'),
        outputPath: './js',
        publicPath: './js',
        includeRelatedFiles: false,
        attributes: {
          nomodule: false,
        },          
      }
    ]),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/app.*']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html')    
    })        
  ]
}

module.exports = plugins