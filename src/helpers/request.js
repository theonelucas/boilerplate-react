import axios from 'axios';
import { call } from 'redux-saga/effects';

export default function* request(url, options = {}) {
  const properties = {
    url,
    withCredentials: false,
    xsrfCookieName: '',
    baseURL: `//${window.location.hostname}:3001/`,
    data: options.data ? options.data : {},
    method: options.method ? options.method : 'get',
    headers: { accept: 'application/json', ...options.headers }
  };
  const error = { success: false, request: null };

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
