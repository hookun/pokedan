import {createAction} from 'typesafe-actions';
import {MessageRange} from '../../types';

export const setMessageRange = createAction('setMessageRange')<MessageRange>();
export const clearMessageRange = createAction('clearMessageRange')();
