import {createSelector} from 'reselect';
import {MessageState} from './reducer';

export const selectMessageState = (state: {Message: MessageState}): MessageState => state.Message;
export const selectMessageMap = createSelector([selectMessageState], (state) => state.map);
export const selectMessageList = createSelector([selectMessageState], (state) => state.list);
export const selectMessageListLength = createSelector([selectMessageList], (list) => list.length);
export const selectMessageListDuration = createSelector(
    [selectMessageMap, selectMessageList],
    (map, list) => list.reduce((max, id) => Math.max(max, map.get(id).end), 0),
);
