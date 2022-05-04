const filenameRegexp = /^(?!.*\.inline).*\.(eot|woff2?|ttf)$/;
const path = require('path');

module.exports = {
  client: {
    test: filenameRegexp,
    use: ['file-loader'],
  },

  server: {
    test: filenameRegexp,
    loader: 'file-loader',
    options: {
      name: path.resolve('dist/client') + '/[name].[ext]',
    },
  },
};
