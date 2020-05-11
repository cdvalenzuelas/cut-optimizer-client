// Depencdencies
const { env, port } = require('./config')
const path = require('path')

// Keys
const plugins = require('./webpack/plugins')
const devServer = require('./webpack/devServer')
const webpackModule = require('./webpack/module')
const optimization = require('./webpack/optimization')

module.exports = {
  mode: env,
  entry: {
    app: path.resolve(__dirname, './src/index.js')
  }   
  ,
  output: {
    path: path.join(__dirname, 'build'),
    filename: env === 'development' ? 'js/[name].js' : 'js/[name].[hash].js',    
    publicPath: env === 'development' ? '/' : './'
  },
  module: webpackModule,  
  optimization,
  plugins,
  devServer  
}
