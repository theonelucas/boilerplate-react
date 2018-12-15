import { fork } from 'redux-saga/effects';
import saga from './sagas';

export default function* root() {
  yield fork(saga);
}
