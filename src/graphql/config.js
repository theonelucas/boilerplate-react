import { createHttpLink } from 'apollo-link-http';

global.fetch = require('node-fetch'); // todo: Substitute this for axios

export default {
  link: createHttpLink({
    uri: 'https://metaphysics-production.artsy.net',
  }),
};
