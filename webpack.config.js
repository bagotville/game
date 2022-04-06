const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [new TerserWebpackPlugin(), new CssMinimizerPlugin()];
  }

  return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

module.exports = {
  context: path.join(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.tsx'],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: filename('js'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 3000,
    hot: isDev,
    historyApiFallback: true,
  },
  devtool: isDev ? 'source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      template: '../static/index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'static/favicon.svg'),
          to: path.join(__dirname, 'dist'),
        },
        {
          from: path.join(__dirname, 'static/sprites'),
          to: path.join(__dirname, 'dist/sprites'),
        },
        {
          from: path.join(__dirname, 'static/icon-144-144.png'),
          to: path.join(__dirname, 'dist'),
        },
        {
          from: path.join(__dirname, 'static/apple-touch-icon.png'),
          to: path.join(__dirname, 'dist'),
        },
        {
          from: path.join(__dirname, 'static/icon-256-256.png'),
          to: path.join(__dirname, 'dist'),
        },
        {
          from: path.join(__dirname, 'static/icon-512-512.png'),
          to: path.join(__dirname, 'dist'),
        },
        {
          from: path.join(__dirname, 'service-worker.js'),
          to: path.join(__dirname, 'dist'),
        },
        {
          from: path.join(__dirname, 'manifest.json'),
          to: path.join(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s?[ca]ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]_[hash:base64:3]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
