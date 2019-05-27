import ApolloClient from 'apollo-client';
import { InMemoryCache } from "apollo-cache-inmemory";

import config from './config';

const server = new ApolloClient({
  ...config,
  cache: new InMemoryCache(),
  ssrMode: true,
});

export default server;
