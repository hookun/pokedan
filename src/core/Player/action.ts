import {createAction} from 'typesafe-actions';
import {FrameType} from '../../types';

export const setFrameType = createAction('setFrameType')<FrameType>();

export const setFrameColor = createAction('setFrameColor')<number>();

export const start = createAction('start')();

export const skip = createAction('skip')();

export const stop = createAction('stop')();
