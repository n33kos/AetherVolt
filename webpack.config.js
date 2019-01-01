const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = [
  {
    entry: {
      "AetherVolt": "./src/loader.js",
      "AetherVolt.min": "./src/loader.js",
    },
    mode: 'production',
    module: {
      rules : [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        },
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist/js'),
      filename: "[name].js",
      library: 'AetherVolt',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    optimization: {
      minimize: true,
      minimizer: [new UglifyJsPlugin({
        include: /\.min\.js$/
      })]
    },
    resolve: {
      modules: [
        path.resolve('./src'),
        path.resolve('./node_modules')
      ]
    },
    stats: {
      colors: true
    },
    target: 'web',
  },
];
