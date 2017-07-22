const path = require('path')

const config = {
  entry: {
    bundle: './docs/entry.js'
  },
  output: {
    path: path.join(__dirname, '/example'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'cxs': path.join(__dirname, 'src')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: 'docs'
  }
}

module.exports = config
