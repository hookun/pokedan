import {createReducer, ActionType} from 'typesafe-actions';
import {setMessageRange, clearMessageRange} from './action';
import {MessageRange} from '../../types';

type SupportedActions =
| typeof setMessageRange
| typeof clearMessageRange;

export type MessageRangeState = MessageRange | null;

export const reducer = createReducer<MessageRangeState, ActionType<SupportedActions>>(null)
.handleAction(setMessageRange, (oldState, {payload: newState}) => {
    const {id: oldId, range: oldRange} = oldState || {};
    const {id: newId, range: newRange} = newState || {};
    if (newId === oldId && newRange === oldRange) {
        return oldState;
    }
    return newState;
})
.handleAction(clearMessageRange, () => null);
