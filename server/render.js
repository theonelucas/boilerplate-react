import JssProvider from 'react-jss/lib/JssProvider';
import React from 'react';
import ReactDOM from 'react-dom/server';
import flushChunks from 'webpack-flush-chunks';
import { Provider } from 'react-redux';
import { SheetsRegistry } from 'jss';
import { flushChunkNames } from 'react-universal-component/server';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import uglifycss from 'uglifycss'; // eslint-disable-line import/no-extraneous-dependencies

import red from '@material-ui/core/colors/red';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';

import App from '../src/components/App';
import configureStore from './configureStore';
import rootSaga from '../src/sagas/rootSaga';
import server from '../src/graphql/server';

export default ({ clientStats }) => async (req, res) => {
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
      accent: red,
      primary: { main: '#fff' },
      type: 'light'
    },
    typography: {
      useNextVariants: true
    }
  });

  // Create a new class name generator
  const generateClassName = createGenerateClassName();

  const rootComponent = (
    <ApolloProvider client={server}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <Provider store={store}>
            <App />
          </Provider>
        </MuiThemeProvider>
      </JssProvider>
    </ApolloProvider>
  );

  Promise.all([
    store.runSaga(rootSaga).toPromise(),
    getDataFromTree(rootComponent)
  ]).then(() => {
    const appString = ReactDOM.renderToString(rootComponent);
    const state = store.getState();
    const chunkNames = flushChunkNames();
    const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

    // States for rehydratation on the client
    const stateJson = JSON.stringify(state); // Redux
    const apolloState = JSON.stringify(server.extract()); // Apollo

    // Grab the CSS from sheetsRegistry
    let css = sheetsRegistry.toString();

    // Minify the CSS if we are on production mode
    if (process.env.NODE_ENV === 'production') {
      css = uglifycss.processString(css);
    }

    // Try to get the page title based on current route
    let pageTitle = state.location.routesMap[state.location.type];
    pageTitle = pageTitle ? pageTitle.title : 'Boilerplate react';

    return res.send(
      `<!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="https://use.typekit.net/kgn0frq.css">
            <title>${pageTitle}</title>
            ${styles}
            <style id="jss-server-side">${css}</style>
          </head>
          <body>
            <div id="root">${appString}</div>
          </body>
          <script>
            window.REDUX_STATE = ${stateJson};
            window.APOLLO_STATE = ${apolloState};
          </script>
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
