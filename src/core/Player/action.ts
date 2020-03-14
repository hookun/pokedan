import {createAction} from 'typesafe-actions';
import {Player} from './reducer';

export const updatePlayer = createAction('updatePlayer')<Omit<Partial<Player>, 'frame'>>();
export const setFrame = createAction('setFrame')<number>();
export const start = createAction('start')();
export const skip = createAction('skip')();
export const stop = createAction('stop')();
