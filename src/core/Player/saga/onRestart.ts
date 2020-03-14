import {put} from 'redux-saga/effects';
import {setPause} from '../action';

export const onRestart = function* () {
    yield put(setPause(false));
};
