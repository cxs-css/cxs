
const path = require('path')
const webpack = require('webpack')

const config = {
  entry: './demo/entry.js',
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.md/, exclude: /node_modules/, loader: 'html!highlight!markdown' }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      reactCxs: '../src/index.js'
    })
  ],
  devServer: {
    contentBase: 'demo'
  }
}

module.exports = config

