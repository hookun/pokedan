import {put} from 'redux-saga/effects';
import {updatePlayer} from '../action';

export const onRestart = function* () {
    yield put(updatePlayer({paused: false}));
};
