/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
require('ignore-styles');
const path = require('path');
const React = require('react');
const fs = require('fs');
const ReactDOMServer = require('react-dom/server');

const app = express();
const { App } = require('../App');
app.get(/\.(js|css|map|ico)$/, express.static(path.resolve(__dirname, './dist')));
const port = process.env.PORT || 3000;

app.use('*', (req, res) => {
  let indexHtml = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), { encoding: 'utf8' });
  const appHtml = ReactDOMServer.renderToString(<App />);

  indexHtml = indexHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  res.contentType('text/html');
  res.status(200);

  return res.send(indexHtml);
});

app.listen(port, '0.0.0.0', () => {
  console.info(`server started on http://localhost:${port}`);
});
