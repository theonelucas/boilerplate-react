import { connectRoutes } from 'redux-first-router';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware, { END } from 'redux-saga';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';

import routesMap from './routesMap';

import * as reducers from './reducers';
import * as actionCreators from './actions';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const composeEnhancers = (...args) => (typeof window !== 'undefined'
  ? composeWithDevTools({ actionCreators })(...args)
  : compose(...args));

export default (preLoadedState, initialEntries) => {
  const {
    enhancer,
    initialDispatch,
    middleware,
    reducer,
  } = connectRoutes(routesMap, {
    initialDispatch: false,
    initialEntries,
  });

  middlewares.push(middleware);

  const rootReducer = combineReducers({ ...reducers, location: reducer });
  const middlewaresApplied = applyMiddleware(...middlewares);
  const enhancers = composeEnhancers(enhancer, middlewaresApplied);
  const store = createStore(rootReducer, preLoadedState, enhancers);

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('./reducers/index', () => {
      const reducers2 = require('./reducers/index'); // eslint-disable-line global-require
      const rootReducer2 = combineReducers({ ...reducers2, location: reducer });

      store.replaceReducer(rootReducer2);
    });
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  store.initialDispatch = initialDispatch;

  return { store };
};
