// Depencdencies
const { env } = require('./config')
const path = require('path')
const { DllPlugin } = require('webpack')
const optimization = require('./webpack/optimization')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

delete optimization.splitChunks

module.exports = {
  mode: env,
  entry: {
    libs: ['react', 'react-dom', 'redux', 'react-redux']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].[hash].dll.js',
    library: '[name]',
    publicPath: './'
  },  
  optimization,
  plugins: [
    new DllPlugin({
      name: '[name]',
      path: path.join(__dirname, 'build', 'js', '[name]-manifest.json')
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/modules.*']
    })
  ]  
}
