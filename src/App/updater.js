import { Updater } from 'redux-elm';
import { take, fork, call } from 'redux-saga/effects';

export const RAWR = 'RAWR';

function* rawr() {
  while (true) {
    yield take(RAWR);
    yield call(() => console.log('RAAAAAAAAAAAWR!'));
  }
}

function* listener() {
  yield [
    fork(rawr)
  ];
}

export default new Updater({}, listener)
  .toReducer();
