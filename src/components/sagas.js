import { all, put, takeLatest } from 'redux-saga/effects';
import {
  ADMIN_FETCHED,
  TRIGGER_CLIENT_ACTION,
  CLIENT_ACTION_TRIGGERED
} from './actions';

function* fetchAdmin() {
  yield put({ type: ADMIN_FETCHED });
}

function* clientAction() {
  yield put({ type: CLIENT_ACTION_TRIGGERED });
}

export default function* saga() {
  yield all([
    takeLatest('router/ADMIN', fetchAdmin),
    takeLatest(TRIGGER_CLIENT_ACTION, clientAction)
  ]);
}
