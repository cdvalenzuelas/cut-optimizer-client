const TerserWebpackPlugin = require('terser-webpack-plugin')

const optimization = {
  splitChunks: {
    chunks: 'all',
    minSize: 0,
    name: 'commons'
  },
  minimizer: [
    new TerserWebpackPlugin()   
  ]
}

module.exports = optimization