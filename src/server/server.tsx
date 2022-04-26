/* eslint-disable import/no-extraneous-dependencies */
import express, { RequestHandler } from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import serverRenderMiddleware from './middleware/index';
import clientConfig from '../../config/webpack.client.config';

const app = express();
const PORT = 3000;

function getWebpackMiddlewares(config: webpack.Configuration): RequestHandler[] {
  const compiler = webpack({ ...config, mode: 'development' });

  return [
    // Middleware для Webpack-билда проекта в реальном времени. Низкоуровневый аналог webpack-dev-server
    devMiddleware(compiler, {
      publicPath: config.output!.publicPath!,
    }),
    // Middleware для HMR
    hotMiddleware(compiler, { path: `/__webpack_hmr` }),
  ];
}

app.get('/*', [...getWebpackMiddlewares(clientConfig)], serverRenderMiddleware);

app.listen(PORT, () => {
  console.log(`App on http://localhost:${PORT}`);
});
