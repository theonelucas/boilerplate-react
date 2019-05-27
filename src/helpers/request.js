import axios from 'axios';
import { call } from 'redux-saga/effects';

export default function* request(url, options = {}) {
  const properties = {
    baseURL: `//${window.location.hostname}:3001/`,
    data: options.data ? options.data : {},
    headers: { accept: 'application/json', ...options.headers },
    method: options.method ? options.method : 'get',
    url,
    withCredentials: false,
    xsrfCookieName: '',
  };
  const error = { request: null, success: false };

  if (!('Content-Type' in properties.headers && properties.headers['Content-Type'])) {
    properties.headers['Content-Type'] = 'application/json';
  }

  try {
    const response = yield call(axios, properties);

    return response.data;
  } catch (e) {
    error.request = e;

    return error;
  }
}
