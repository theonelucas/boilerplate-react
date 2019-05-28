/* eslint-disable import/no-extraneous-dependencies */

import { JSLoader, GQLoader, CSSDevLoader } from './loaders';

const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [path.resolve(__dirname, '../src/index.js')],
  mode: 'development',
  module: {
    rules: [JSLoader, GQLoader, CSSDevLoader]
  },
  name: 'client',
  output: {
    chunkFilename: '[name].[chunkhash].js',
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../buildClient'),
    publicPath: '/static/'
  },
  plugins: [
    new ExtractCssChunks(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.HashedModuleIdsPlugin() // not needed for strategy to work (just good practice)
  ],
  resolve: {
    extensions: ['.js', '.css', '.styl']
  },
  stats: 'verbose',
  target: 'web'
};
