// Depencdencies
const { env } = require('./config')
const path = require('path')

// Keys
const plugins = require('./webpack/plugins')
const devServer = require('./webpack/devServer')
const webpackModule = require('./webpack/module')
const optimization = require('./webpack/optimization')

module.exports = {
  mode: env,
  entry: {
    app: path.join(__dirname, 'src', 'index.js')
  }   
  ,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/app.[hash].js',    
    publicPath: './'
  },
  module: webpackModule,
  plugins,
  devServer,
  optimization
}
