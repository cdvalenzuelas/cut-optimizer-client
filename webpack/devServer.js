const { env, port } = require('../config')
const path = require('path')

let devServer

if (env === 'development') {
  devServer = {
    open: false,
    hot: true,
    port,
    contentBase: path.resolve(__dirname, '../dist'),
    compress: true,
    writeToDisk: false,
    historyApiFallback: true
  }
} else {
  devServer = {}
}

module.exports = devServer
