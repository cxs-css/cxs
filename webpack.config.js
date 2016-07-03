
const config = {
  entry: {
    bundle: './example/entry.js',
    size: './example/empty.js'
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
  node: {
    fs: 'empty'
  },
  devServer: {
    contentBase: 'example'
  }
}

module.exports = config

