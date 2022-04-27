import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import fs from 'fs';
import path from 'path';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StaticRouter } from 'react-router-dom/server';
import { ErrorBoundary } from 'react-error-boundary';
import { App } from '../../App';
import authReducer from '../../store/reducers/auth';
import { ErrorFallbackStub } from '../../pages/ErrorFallback/ErrorFallbackStub';

export default (request: Request, response: Response) => {
  const element = getElement(request);
  const reactHtml = renderToString(element);
  const html = getHtml(reactHtml);
  console.log(`got ${request.originalUrl} request`);
  response.contentType('text/html');
  response.status(200);
  response.send(html);
};

function getStore() {
  return configureStore({
    reducer: {
      authReducer,
    },
    middleware: [thunk],
  });
}

function getElement(request: Request) {
  const store = getStore();
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={request.originalUrl}>
          <Provider store={store}>
            <ErrorBoundary FallbackComponent={ErrorFallbackStub}>
              <App />
            </ErrorBoundary>
          </Provider>
        </StaticRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

function getHtml(reactHtml: string) {
  let indexHTML = fs.readFileSync(path.resolve(__dirname, '../../dist/client/index.html'), {
    encoding: 'utf8',
  });
  indexHTML = indexHTML.replace('<div id="root"></div>', `<div id="root">${reactHtml}</div>`);
  return indexHTML;
}
