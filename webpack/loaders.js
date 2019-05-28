const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const JSLoader = {
  exclude: /node_modules/,
  test: /\.js$/,
  use: 'babel-loader'
};

const GQLoader = {
  exclude: /node_modules/,
  loader: 'graphql-tag/loader',
  test: /\.(graphql|gql)$/
};

const CSSDevLoader = {
  test: /\.css$/,
  use: [
    ExtractCssChunks.loader,
    {
      loader: 'css-loader',
      options: {
        localIdentName: '[name]__[local]--[hash:base64:5]',
        modules: true
      }
    }
  ]
};

const CSSProdLoader = {
  exclude: /node_modules/,
  test: /\.css/,
  use: [
    {
      loader: 'css-loader',
      options: {
        localIdentName: '[name]__[local]--[hash:base64:5]',
        modules: true
      }
    }
  ]
};

const FileLoader = {
  loader: 'file-loader',
  test: /\.(gif|ico|jpg|jpeg|webp|json|png|svg|woff|woff2)$/
};

export {
  JSLoader,
  GQLoader,
  CSSDevLoader,
  CSSProdLoader,
  FileLoader
};
