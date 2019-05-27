import {
  all,
  select,
  takeLatest,
  put,
} from 'redux-saga/effects';

import request from '../helpers/request';
import {
  SHORTEN_URL,
  URL_SHORTENED,
  SHORTEN_URL_ERROR,
} from '../actions/shortener';

// Request the api to shorten a given URL
function* shortenUrl() {
  const url = yield select(state => state.shortener.url.value);
  const response = yield request('/api/shorten', { data: { url }, method: 'post' });

  if (response.success) {
    yield put({
      payload: response.data,
      type: URL_SHORTENED,
    });
  } else {
    yield put({
      payload: response.request.response.data.error,
      type: SHORTEN_URL_ERROR,
    });
  }
}

export default function* saga() {
  yield all([
    takeLatest(SHORTEN_URL, shortenUrl),
  ]);
}
