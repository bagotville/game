const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const fileLoader = require('./loaders/file.js');
const tsLoader = require('./loaders/typescript.js');
const cssLoader = require('./loaders/css');
const sassLoader = require('./loaders/sass');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const assets = require('./loaders/assets.js');

module.exports = {
  context: path.join(__dirname, '../src'),
  mode: 'development',
  entry: {
    server: ['@babel/polyfill', './server/server.tsx'],
  },
  target: 'node',
  output: {
    path: path.join(__dirname, '../dist/server'),
    filename: '[name].js',
    publicPath: '/',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  devtool: 'inline-source-map',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  plugins: [
    new NodePolyfillPlugin(),
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../static/favicon.svg'),
          to: path.join(__dirname, '../dist/server'),
        },
        {
          from: path.join(__dirname, '../static/sprites'),
          to: path.join(__dirname, '../dist/server/sprites'),
        },
        {
          from: path.join(__dirname, '../static/icon-144-144.png'),
          to: path.join(__dirname, '../dist/server'),
        },
        {
          from: path.join(__dirname, '../static/apple-touch-icon.png'),
          to: path.join(__dirname, '../dist/server'),
        },
        {
          from: path.join(__dirname, '../static/icon-256-256.png'),
          to: path.join(__dirname, '../dist/server'),
        },
        {
          from: path.join(__dirname, '../static/icon-512-512.png'),
          to: path.join(__dirname, '../dist/server'),
        },
        {
          from: path.join(__dirname, '../service-worker.js'),
          to: path.join(__dirname, '../dist/server'),
        },
        {
          from: path.join(__dirname, '../manifest.json'),
          to: path.join(__dirname, '../dist/server'),
        },
      ],
    }),
  ],
  module: {
    rules: [fileLoader.server, tsLoader.server, sassLoader.server, cssLoader.server, assets.server],
  },
};
