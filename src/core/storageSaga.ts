import * as idb from 'idb-keyval';
import {put, select, takeEvery, call} from 'redux-saga/effects';
import {getType, ActionType} from 'typesafe-actions';
import {setFile, setStore} from './Player/action';
import {DBName} from '../constants';
import {selectPlayerStore} from './Player/selector';
import {restart} from './action';

const rootStore = new idb.Store(DBName, 'Root');
const storeName = (file: string) => `File-${file}`;

export const loadFileFromIDB = function* () {
    const file: string | undefined = yield call(idb.get, 'file', rootStore);
    if (file) {
        yield put(setFile(file));
    }
};

export const setupStore = function* ({payload: file}: ActionType<typeof setFile>) {
    const store: idb.Store = yield select(selectPlayerStore);
    if (file) {
        const expectedName = storeName(file);
        if (!store || expectedName !== store.storeName) {
            yield put(setStore(new idb.Store(DBName, expectedName)));
        }
    }
};

export const list = () => [
    takeEvery(getType(restart), loadFileFromIDB),
    takeEvery(getType(setFile), setupStore),
    takeEvery('*', function* (action: {type: string}) {
        console.log(action.type);
    }),
];
