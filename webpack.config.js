
const config = {
  entry: './example/entry.js',
  output: {
    path: __dirname + 'example',
    filename: 'bundle.js'
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

