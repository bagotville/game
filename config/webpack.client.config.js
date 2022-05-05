const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const csp = {
  'default-src': "'self' 'unsafe-eval'",
  'font-src': "'self' https://fonts.gstatic.com",
  'img-src': "'self' https://ya-praktikum.tech data: https:",
  'connect-src': "'self' https://ya-praktikum.tech wss://ya-praktikum.tech",
  'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
};

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

module.exports = {
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', '/src/index.tsx'],
  },
  output: {
    path: path.join(__dirname, '../dist/client'),
    filename: '[name].js',
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
      template: './static/index.html',
      minify: {
        collapseWhitespace: isProd,
      },
      meta: {
        'Content-Security-Policy': {
          'http-equiv': 'Content-Security-Policy',
          content: Object.entries(csp)
            .map((e) => e.join(' '))
            .join(';'),
        },
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../static/favicon.svg'),
          to: path.join(__dirname, '../dist/client'),
        },
        {
          from: path.join(__dirname, '../static/sprites'),
          to: path.join(__dirname, '../dist/client/sprites'),
        },
        {
          from: path.join(__dirname, '../static/icon-144-144.png'),
          to: path.join(__dirname, '../dist/client'),
        },
        {
          from: path.join(__dirname, '../static/apple-touch-icon.png'),
          to: path.join(__dirname, '../dist/client'),
        },
        {
          from: path.join(__dirname, '../static/icon-256-256.png'),
          to: path.join(__dirname, '../dist/client'),
        },
        {
          from: path.join(__dirname, '../static/icon-512-512.png'),
          to: path.join(__dirname, '../dist/client'),
        },
        {
          from: path.join(__dirname, '../service-worker.js'),
          to: path.join(__dirname, '../dist/client'),
        },
        {
          from: path.join(__dirname, '../manifest.json'),
          to: path.join(__dirname, '../dist/client'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
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
