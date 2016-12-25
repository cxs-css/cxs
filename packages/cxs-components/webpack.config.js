
const path = require('path')
const webpack = require('webpack')
const StaticPlugin = require('static-site-generator-webpack-plugin')

module.exports = {
  entry: {
    index: './docs/entry.js'
  },

  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel'
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new StaticPlugin('index', '/', {
      title: 'ϟ cxs-components'
    })
  ],

  devServer: {
    contentBase: 'docs/'
  }
}

