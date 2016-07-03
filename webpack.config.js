
const config = {
  entry: {
    bundle: './example/entry.js'
  },
  output: {
    path: __dirname + '/example',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  },
  devServer: {
    contentBase: 'example'
  }
}

module.exports = config

