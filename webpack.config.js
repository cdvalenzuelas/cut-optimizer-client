// Depencdencies
const { env } = require('./src/config')
const path = require('path')

console.log(env)

// Keys
const plugins = require('./webpack/plugins')
const devServer = require('./webpack/devServer')
const webpackModule = require('./webpack/module')
const optimization = require('./webpack/optimization')

module.exports = {
  mode: env,
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  module: webpackModule,
  plugins,
  devServer,
  optimization
}
