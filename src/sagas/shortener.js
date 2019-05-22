import { all, takeLatest, select, put } from 'redux-saga/effects';

import request from '../helpers/request';
import {
  SHORTEN_URL,
  URL_SHORTENED,
  SHORTEN_URL_ERROR
} from '../actions/shortener';

// Request the api to shorten a given URL
function* shortenUrl() {
  const url = yield select((state) => state.shortener.url.value);
  const response = yield request('/api/shorten', { method: 'post', data: { url } });

  if (response.success) {
    yield put({ type: URL_SHORTENED, payload: response.data });
  } else {
    yield put({ type: SHORTEN_URL_ERROR, payload: response.request.response.data.error });
  }
}

export default function* saga() {
  yield all([
    takeLatest(SHORTEN_URL, shortenUrl)
  ]);
}
