/* eslint-disable import/no-extraneous-dependencies */

import { JSLoader, GQLoader, CSSProdLoader } from './loaders';

const path = require('path');
const webpack = require('webpack');

const res = p => path.resolve(__dirname, p);
const entry = res('../server/render.js');
const output = res('../buildServer');

module.exports = {
  devtool: 'source-map',
  entry: [entry],
  module: {
    rules: [JSLoader, GQLoader, CSSProdLoader]
  },
  name: 'server',
  output: {
    filename: 'main.js',
    libraryTarget: 'commonjs2',
    path: output
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.css', '.styl']
  },
  target: 'node'
};
