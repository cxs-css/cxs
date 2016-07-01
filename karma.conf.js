
var webpack = require('webpack')

var configuration = {
  browsers: [
    'Firefox',
    'Safari',
    'Chrome'
  ],

  singleRun: false,
  autoWatch: true,

  files: [
    'test/karma.js'
  ],

  frameworks: [
    'mocha'
  ],

  plugins: [
    'karma-firefox-launcher',
    'karma-safari-launcher',
    'karma-chrome-launcher',
    'karma-mocha',
    'karma-webpack'
  ],

  preprocessors: {
    'test/karma.js': [ 'webpack' ]
  },

  webpack: {
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  },

  webpackMiddleware: {
    noInfo: true
  }
}

module.exports = function (config) {
  config.set(configuration)
}

