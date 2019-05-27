import { fork } from 'redux-saga/effects';
import saga from './cinemas';

export default function* root() {
  yield fork(saga);
}
