const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const optimization = {
  splitChunks: {
    chunks: 'all',
    minSize: 0,
    name: 'commons'
  },
  minimizer: [
    new TerserWebpackPlugin(),
    new OptimizeCssAssetsWebpackPlugin()  
  ]
}

module.exports = optimization