
const path = require('path')

const config = {
  entry: {
    bundle: './example/entry.js'
  },
  output: {
    path: path.join(__dirname, '/example'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.md/, loader: 'html!markdown' }
    ]
  },
  devServer: {
    contentBase: 'example'
  }
}

module.exports = config

