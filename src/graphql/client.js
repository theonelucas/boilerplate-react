import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import config from './config';

const client = new ApolloClient({
  ...config,
  cache: new InMemoryCache().restore(window.APOLLO_STATE)
});

export default client;
