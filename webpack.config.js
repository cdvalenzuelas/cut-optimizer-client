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
    app: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: env === 'development' ? 'js/[name].js' : 'js/[name].[hash].js',
    publicPath: env === 'development' ? '/' : './'
  },
  resolve: {
    alias: {
      '@Components': path.resolve(__dirname, 'src/Components'),
      '@Firebase': path.resolve(__dirname, 'src/Firebase'),
      '@Layouts': path.resolve(__dirname, 'src/Layouts'),
      '@Styles': path.resolve(__dirname, 'src/Styles'),
      '@Utils': path.resolve(__dirname, 'src/Utils'),
      '@Pages': path.resolve(__dirname, 'src/Pages'),
      '@Redux': path.resolve(__dirname, 'src/Redux')
    }
  },
  module: webpackModule,
  optimization,
  plugins,
  devServer
}
