const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BabiliWebpackPlugin = require('babili-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProduction ? undefined : 'source-map',
  entry: {
    background: './src/pages/background.js',
    popup: './src/pages/popup.js',
    options: './src/pages/options.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      chunks: ['options'],
    }),
    new CopyWebpackPlugin([
      { from: 'src/manifest.json' },
      { from: '*.png', to: 'images', context: 'src/images' },
    ]),
    isProduction && new BabiliWebpackPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
