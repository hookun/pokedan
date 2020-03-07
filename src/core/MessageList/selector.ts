import {createSelector} from 'reselect';
import {MessageList} from './reducer';

export const selectMessageList = (state: {MessageList: MessageList}) => state.MessageList;
export const selectMessageListLength = createSelector(
    [selectMessageList],
    (list) => list.length,
);
export const selectMessageListDuration = createSelector(
    [selectMessageList],
    (list) => list.reduce((sum, message) => sum + message.duration, 0),
);
export const selectStartTimeList = createSelector([selectMessageList], (list) => {
    let time = 0;
    return list.map((message) => {
        const start = time;
        time = start + message.duration;
        return start;
    });
});
