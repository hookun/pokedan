import {takeEvery} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {restart} from '../../action';
import {onRestart} from './onRestart';
import {controlFrame} from './controlFrame';

export const list = () => [
    controlFrame(),
    takeEvery(getType(restart), onRestart),
];
