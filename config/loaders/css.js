const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  client: {
    test: /\.css$/,
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
    ],
  },
  server: {
    test: /\.css$/,
    exclude: /node_modules/,
    use: ['style-loader', 'css-loader'],
    include: __dirname,
  },
};
