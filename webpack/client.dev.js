/* eslint-disable import/no-extraneous-dependencies */

import {
  JSLoader,
  GQLoader,
  CSSDevLoader,
  FileLoader
} from './loaders';

const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin'); // here so you can see what chunks are built
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    'regenerator-runtime/runtime.js',
    path.resolve(__dirname, '../src/index.js')
  ],
  mode: 'development',
  module: {
    rules: [JSLoader, GQLoader, CSSDevLoader, FileLoader]
  },
  name: 'client',
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: path.resolve(__dirname, '../buildClient'),
    publicPath: '/static/'
  },
  plugins: [
    new WriteFilePlugin(),
    new ExtractCssChunks(),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.css', '.styl']
  },
  target: 'web'
};
