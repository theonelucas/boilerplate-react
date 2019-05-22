import React from 'react';
import ReactDOM from 'react-dom/server';
import uglifycss from 'uglifycss';
import flushChunks from 'webpack-flush-chunks';
import JssProvider from 'react-jss/lib/JssProvider';
import { Provider } from 'react-redux';
import { SheetsRegistry } from 'jss';
import { flushChunkNames } from 'react-universal-component/server';

import red from '@material-ui/core/colors/red';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';

import App from '../src/components/App';
import rootSaga from '../src/sagas/rootSaga';
import configureStore from './configureStore';

export default ({ clientStats }) => async (req, res, next) => {
  const store = await configureStore(req, res);

  // No store means redirect was already served
  if (!store) {
    return false;
  }

  // Create a sheetsRegistry instance
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance
  const sheetsManager = new Map();

  // Create a theme instance
  const theme = createMuiTheme({
    palette: {
      primary: { main: '#fff' },
      accent: red,
      type: 'light'
    },
    typography: {
      useNextVariants: true
    }
  });

  // Create a new class name generator
  const generateClassName = createGenerateClassName();

  const rootComponent = (
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <Provider store={store}>
          <App />
        </Provider>
      </MuiThemeProvider>
    </JssProvider>
  );

  store.runSaga(rootSaga).toPromise().then(() => {
    const appString = ReactDOM.renderToString(rootComponent);
    const state = store.getState();
    const stateJson = JSON.stringify(state);
    const chunkNames = flushChunkNames();
    const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

    // Grab the CSS from sheetsRegistry
    let css = sheetsRegistry.toString();

    // Minify the CSS if we are on production mode
    if (process.env.NODE_ENV === 'production') {
      css = uglifycss.processString();
    }

    // Try to get the page title based on current route
    let pageTitle = state.location.routesMap[state.location.type];
    pageTitle = pageTitle ? pageTitle.title : 'Boilerplate react';

    return res.send(
      `<!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${pageTitle}</title>
            ${styles}
            <style id="jss-server-side">${css}</style>
          </head>
          <body>
            <div id="root">${appString}</div>
          </body>
          <script>window.REDUX_STATE = ${stateJson}</script>
          ${js}
          ${cssHash}
        </html>`
    );
  });

  // Dispatch the route action
  store.initialDispatch();

  // Dispatch a close event so sagas stop listening after they're resolved
  store.close();

  return false;
};
