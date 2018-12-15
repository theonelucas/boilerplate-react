import '@babel/polyfill';
import express from 'express';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import nofavicon from 'express-no-favicons';
import clientConfig from '../webpack/client.dev';
import serverConfig from '../webpack/server.dev';

const DEV = process.env.NODE_ENV === 'development';
const { publicPath } = clientConfig.output;
const outputPath = clientConfig.output.path;
const app = express();

// JWTOKEN COOKIE - in a real app obviously you set this after signup/login:

app.use(cookieParser());
app.use(nofavicon());

app.use((req, res, next) => {
  const cookie = req.cookies.jwToken;
  const jwToken = 'fake'; // TRY: set to 'real' to authenticate ADMIN route

  if (cookie !== jwToken) {
    res.cookie('jwToken', jwToken, { maxAge: 900000 });
    req.cookies.jwToken = jwToken;
  }

  next();
});

// UNIVERSAL HMR + STATS HANDLING GOODNESS:

if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];

  app.use(
    webpackDevMiddleware(multiCompiler, { publicPath, stats: { colors: true } })
  );
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(
    // keeps serverRender updated with arg: { clientStats, outputPath }
    webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: { outputPath }
    })
  );
} else {
  const clientStats = require('../buildClient/stats.json'); // eslint-disable-line global-require, import/no-unresolved
  const serverRender = require('../buildServer/main.js').default; // eslint-disable-line global-require, import/no-unresolved

  app.use(publicPath, express.static(outputPath));
  app.use(serverRender({ clientStats, outputPath }));
}

app.listen(3000, () => {
  console.log('Listening @ http://localhost:3000'); // eslint-disable-line no-console
});
