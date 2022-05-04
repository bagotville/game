import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import fs from 'fs';
import path from 'path';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StaticRouter } from 'react-router-dom/server';
import { ErrorBoundary } from 'react-error-boundary';
import serialize from 'serialize-javascript';
import App from '../../App';
import authReducer, { setIsAuth } from '../../store/reducers/auth';
import schemeReducer from '../../store/reducers/scheme';
import { ErrorFallbackStub } from '../../pages/ErrorFallback/ErrorFallbackStub';
import { RootState } from '../../store/store';

export default (request: Request, response: Response) => {
  console.log(`got ${request.originalUrl} request`);
  const isAuth = true;
  if (!isAuth && request.originalUrl !== '/login' && request.originalUrl !== '/register') {
    response.redirect('/login');
    return;
  }
  const store = getStore(isAuth);

  const element = getElement(request.originalUrl, store);

  const reactHtml = renderToString(element);
  const html = getHtml(reactHtml, store.getState());

  response.contentType('text/html');
  response.status(200);
  response.send(html);
};

function getStore(isAuth: boolean) {
  const store = configureStore({
    reducer: {
      authReducer,
      schemeReducer,
    },
    middleware: [thunk],
  });

  store.dispatch(setIsAuth(isAuth));

  return store;
}

function getElement(location: string, store: Store<any, AnyAction>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StaticRouter location="/">
        <Provider store={store}>
          <ErrorBoundary FallbackComponent={ErrorFallbackStub}>
            <App />
          </ErrorBoundary>
        </Provider>
      </StaticRouter>
    </QueryClientProvider>
  );
}

function getHtml(reactHtml: string, state: RootState) {
  let indexHTML = fs.readFileSync(path.resolve(__dirname, '../client/index.html'), {
    encoding: 'utf8',
  });
  const inlineCss = fs.readFileSync(path.resolve(__dirname, '../server/styles.css'), {
    encoding: 'utf-8',
  });
  indexHTML = indexHTML
    .replace(
      '<div id="root"></div>',
      `<div id="root">${reactHtml}</div>
  <style>${inlineCss}</style>`,
    )
    .replace('<section id="scripts-section"></section>', getStateHtml(state));

  return indexHTML;
}

function getStateHtml(state: RootState) {
  return renderToStaticMarkup(
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__PRELOADED_STATE__ = ${renderObject(state)}`,
      }}
    />,
  );
}

const renderObject = (data: unknown) => serialize(data).replace(/</g, '\\\u003c');
