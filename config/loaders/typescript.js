const keysTransformer = require('ts-transformer-keys/transformer');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components');

module.exports = {
  client: {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      true && {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: (program) => ({
            before: [createStyledComponentsTransformer(), keysTransformer(program)],
          }),
        },
      },
    ].filter(Boolean),
  },

  server: {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
    },
  },
};
