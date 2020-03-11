import {createSelector} from 'reselect';
import {MessageState} from './reducer';

export const selectMessageState = (state: {Message: MessageState}) => state.Message;
export const selectMessageMap = createSelector(
    [selectMessageState],
    (state) => state.map,
);
export const selectMessageList = createSelector(
    [selectMessageState],
    (state) => state.list,
);
export const selectMessageListLength = createSelector(
    [selectMessageList],
    (list) => list.length,
);
export const selectMessageListDuration = createSelector(
    [selectMessageMap, selectMessageList],
    (map, list) => list.reduce((sum, id) => sum + map.get(id).duration, 0),
);
export const selectStartTimeList = createSelector(
    [selectMessageMap, selectMessageList],
    (map, list) => {
        let time = 0;
        return list.map((id) => {
            const start = time;
            time = start + map.get(id).duration;
            return start;
        });
    },
);
