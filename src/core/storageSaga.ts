import * as idb from 'idb-keyval';
import {put, select, takeEvery, call} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {updatePlayer} from './Player/action';
import {Player} from './Player/reducer';
import {DBName} from '../constants';
import {selectPlayer} from './Player/selector';
import {restart} from './action';

const rootStore = new idb.Store(DBName, 'Root');
const storeName = (file: string) => `File-${file}`;

export const setFile = function* () {
    const file: string | undefined = yield call(idb.get, 'file', rootStore);
    if (file) {
        yield put(updatePlayer({file}));
    }
};

export const setStore = function* () {
    const {file, store}: Player = yield select(selectPlayer);
    if (file) {
        const expectedName = storeName(file);
        if (!store || expectedName !== store.storeName) {
            yield put(updatePlayer({store: new idb.Store(DBName, expectedName)}));
        }
    }
};

export const list = () => [
    takeEvery(getType(restart), setFile),
    takeEvery(getType(updatePlayer), setStore),
];
