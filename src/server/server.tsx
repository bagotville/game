/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import path from 'path';
import middleware from './middleware';

const app = express();
const PORT = 3000;

app.get(/\.(js|css|map|ico|json|png|svg)$/, express.static(path.resolve(__dirname, '../../dist/client')));

app.use('*', middleware);

app.listen(PORT, () => {
  console.log(`App on http://localhost:${PORT}`);
});
