const styleLoader = require('./styleLoader')

const webpackModule = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [styleLoader, 'css-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.scss$/,
      use: [styleLoader, 'css-loader', 'sass-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.(jpg|png|gif|svg|ico)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      },
      exclude: /node_modules/
    }    
  ]
}

module.exports = webpackModule