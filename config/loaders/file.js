const filenameRegexp = /^(?!.*\.inline).*\.(jpe?g|png|gif|eot|woff2?|ttf|svg)$/;

module.exports = {
  client: {
    test: filenameRegexp,
    use: ['file-loader'],
  },

  server: {
    test: filenameRegexp,
    use: ['file-loader'],
  },
};
