const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
    optimization: {
      minimize: true,
      minimizer: [new UglifyJsPlugin({
        include: /\.min\.js$/
      })]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "js/[name].js",
      library: 'AetherVolt',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    plugins : [
      new CopyPlugin([
        { from: 'src/audio/dist', to: 'audio' },
        { from: 'src/font', to: 'font' },
        { from: 'src/html' },
        { from: 'src/img/dist', to: 'img' },
      ]),
    ],
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
