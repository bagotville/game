const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  client: {
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
  server: {
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
};
