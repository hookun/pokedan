import {createReducer, ActionType} from 'typesafe-actions';
import {setMessageRange, clearMessageRange} from './action';
import {MessageRange} from '../../types';

type SupportedActions =
| typeof setMessageRange
| typeof clearMessageRange;

export type MessageRangeState = MessageRange | null;

export const reducer = createReducer<MessageRangeState, ActionType<SupportedActions>>(null)
.handleAction(setMessageRange, (_, {payload: range}) => range)
.handleAction(clearMessageRange, () => null);
