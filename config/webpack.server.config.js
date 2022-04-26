const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const fileLoader = require('./loaders/file.js');
const tsLoader = require('./loaders/typescript.js');
const cssLoader = require('./loaders/css');
const sassLoader = require('./loaders/sass');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
  devtool: 'source-map',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    fallback: {
      url: require.resolve('url'),
      fs: false,
      assert: require.resolve('assert'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      buffer: require.resolve('buffer'),
      stream: require.resolve('stream-browserify'),
    },
  },
  plugins: [new CleanWebpackPlugin(), new NodePolyfillPlugin(), new MiniCssExtractPlugin()],
  module: {
    rules: [fileLoader.server, tsLoader.server, sassLoader.server, cssLoader.server],
  },
};
