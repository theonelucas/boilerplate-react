import { fork } from 'redux-saga/effects';
import saga from './shortener';

export default function* root() {
  yield fork(saga);
}
