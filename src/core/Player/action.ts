import {createAction} from 'typesafe-actions';
import {Player} from './reducer';

export const updatePlayer = createAction('updatePlayer')<Partial<Player>>();

export const start = createAction('start')();

export const skip = createAction('skip')();

export const stop = createAction('stop')();
