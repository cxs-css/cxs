const path = require('path')
const webpack = require('webpack')

const config = {
  entry: './docs/entry.js',
  output: {
    path: path.join(__dirname, '/docs'),
    filename: 'bundle.js'
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
      },
      {
        test: /\.js$/,
        include: /objss/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  devServer: {
    contentBase: 'docs'
  }
}

module.exports = config
