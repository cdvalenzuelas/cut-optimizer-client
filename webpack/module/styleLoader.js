const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { env } = require('../../src/config')

let styleLoader

if (env === 'development'){
  styleLoader = 'style-loader'
} else {
  styleLoader = new MiniCssExtractPlugin({
    filename: 'css/[name].css'
  })
}

module.exports = styleLoader

console.log(styleLoader)
