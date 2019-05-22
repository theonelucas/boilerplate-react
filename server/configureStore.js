import { NOT_FOUND } from 'redux-first-router';
import configureStore from '../src/configureStore';
import axios from 'axios';

export default async (req, res) => {
  const preLoadedState = {};
  const { store } = configureStore(preLoadedState, [req.path]);
  let location = store.getState().location;

  if (doesRedirect(location, res)) {
    return false;
  }

  location = store.getState().location; // State has now changed

  if (doesRedirect(location, res)) {
    return false;
  }

  const status = location.type === NOT_FOUND ? 404 : 200;

  /*
    If the current route being accessed was not found by redux-first-router,
    try to get the corresponding long URL from back-end. If it is found,
    then we redirect otherwise just show a 404 page
  */
  if (location.type === NOT_FOUND) {
    // 'server' is the name of our back-end server in docker network
    await axios.get(`http://server:3001/api${location.pathname}`, { timeout: 5000 })
      .then((response) => doesRedirect({ kind: 'redirect', pathname: response.data.url }, res))
  }

  res.status(status);

  return store;
}

const doesRedirect = ({ kind, pathname }, res) => {
  if (kind === 'redirect') {
    res.redirect(302, pathname);

    return true;
  }
};
