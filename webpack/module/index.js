const styleLoader = require('./styleLoader')

const webpackModule = {
  rules: [
    {
      test: /.(js|jsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /.css$/,
      use: [styleLoader, 'css-loader'],
      exclude: /node_modules/
    },
    {
      test: /.scss$/,
      use: [styleLoader, 'sass-loader', 'css-loader'],
      exclude: /node_modules/
    },
    {
      test: /.(jpg|png|gif|svg|ico)$/,
      use: 'url-loader',
      exclude: /node_modules/
    }    
  ]
}

module.exports = webpackModule