const { env, port } = require('../src/config')
const path = require('path')

let devServer

if (env === 'development') {
  devServer = {
    open: true,
    hot : true,
    port,
    contentBase: path.join(__dirname, '..', 'dist'),
    compress: true,
  }
} else {
  devServer = {}
}

module.exports = devServer