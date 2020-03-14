import {Store} from 'idb-keyval';
import {createAction} from 'typesafe-actions';

export const setFile = createAction('setFile')<string>();
export const setFrame = createAction('setFrame')<number>();
export const setPause = createAction('setPause')<boolean>();
export const setWidth = createAction('setWidth')<number>();
export const setHeight = createAction('setHeight')<number>();
export const setScale = createAction('setScale')<number>();
export const setStore = createAction('setStore')<Store>();
