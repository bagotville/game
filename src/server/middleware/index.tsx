import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { StaticRouterContext } from 'react-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StaticRouter } from 'react-router-dom';
import { App } from '../../App';
import authReducer from '../../store/reducers/auth';

const queryClient = new QueryClient();

export default (req: Request, res: Response) => {
  const context: StaticRouterContext = {};
  const store = getStore();
  const jsx = (
    <StaticRouter context={context}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </StaticRouter>
  );
  const reactHtml = renderToString(jsx);

  res.send(getHtml(reactHtml));
};

function getStore() {
  return configureStore({
    reducer: {
      authReducer,
    },
    middleware: [thunk],
  });
}

function getHtml(reactHtml: string, reduxState = {}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=6.0, minimum-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="game bugoville" />
        <meta name="keywords" content="game, bugoville, play" />
        <meta name="theme-color" content="#191919" />
        <link rel="icon" href="favicon.svg" type="image/svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <title>Game</title>
    </head>

    <body>
        <div id="root">${reactHtml}</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
        </script>
        <script src="../client/main.js"></script>
    </body>
    </html>`;
}
