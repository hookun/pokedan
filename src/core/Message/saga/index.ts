import {takeEvery} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {restart} from '../../action';
import {onRestart} from './onRestart';

export const list = () => [
    takeEvery(getType(restart), onRestart),
];
