import '@babel/polyfill';
import express from 'express';
import webpack from 'webpack';
import nofavicon from 'express-no-favicons';
import cookieParser from 'cookie-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import clientConfig from '../webpack/client.dev';
import serverConfig from '../webpack/server.dev';

const DEV = process.env.NODE_ENV === 'development';
const { publicPath } = clientConfig.output;
const outputPath = clientConfig.output.path;
const app = express();
const port = 3001;

app.use(cookieParser());
app.use(nofavicon());

if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];

  app.use(webpackDevMiddleware(multiCompiler, { publicPath, stats: { colors: true } }));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(multiCompiler, {
    serverRendererOptions: { outputPath }
  }));
} else {
  const clientStats = require('../buildClient/stats.json'); // eslint-disable-line global-require, import/no-unresolved
  const serverRender = require('../buildServer/main.js').default; // eslint-disable-line global-require, import/no-unresolved

  app.use(publicPath, express.static(outputPath));
  app.use(serverRender({ clientStats, outputPath }));
}

app.listen(port, () => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console
