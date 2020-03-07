import {createAction} from 'typesafe-actions';
import {createTypeFilter} from '../../util/createTypeFilter';
import {isFrameType} from '../../is/FrameType';
import {isFrameColor} from '../../is/FrameColor';

export const setFrameType = createAction('setFrameType', createTypeFilter(isFrameType))();

export const setFrameColor = createAction('setFrameColor', createTypeFilter(isFrameColor))();

export const start = createAction('start')();

export const skip = createAction('skip')();

export const stop = createAction('stop')();
