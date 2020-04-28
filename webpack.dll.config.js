// Depencdencies
const { env } = require('./src/config')
const path = require('path')
const { DllPlugin } = require('webpack')

console.log(env)

module.exports = {
  mode: env,
  entry: {
    modules: ['react', 'react-dom', 'redux', 'react-redux']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    library: '[name]',
    publicPath: './'
  },  
  plugins: [
    new DllPlugin({
      name: '[name]',
      path: path.join(__dirname, 'dist', 'js', '[name]-manifest.json')
    })
  ]  
}
