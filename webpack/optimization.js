const optimization = {
  splitChunks: {
    chunks: 'all',
    minSize: 0,
    name: 'commons'
  }
}

module.exports = optimization