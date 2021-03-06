import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import App from './components/App';
import client from './graphql/client';
import configureStore from './configureStore';
import rootSaga from './sagas/rootSaga';

const { store } = configureStore(window.REDUX_STATE);

store.runSaga(rootSaga);

/*
  Just a wrapper around 'App' component to allow us to remove the server-side injected styled
  Refer to: CSS https://github.com/cssinjs/jss/blob/master/docs/ssr.md
*/
class Main extends React.Component {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App />;
  }
}

const render = (App2) => {
  ReactDOM.hydrate(
    <ApolloProvider client={client}>
      <AppContainer>
        <Provider store={store}>
          <App2 />
        </Provider>
      </AppContainer>
    </ApolloProvider>,
    document.getElementById('root'),
  );
};

render(Main);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./components/App', () => {
    render(require('./components/App').default); // eslint-disable-line global-require
  });
}
