import {createSelector} from 'reselect';
import {
    selectMessageList,
    selectStartTimeList,
    selectMessageMap,
} from './Message/selector';
import {selectPlayerCurrentTime} from './Player/selector';
import {generateId} from '../util/generateId';
import {MessageId} from '../types';

export const selectCurrentMessageIndex = createSelector(
    [selectStartTimeList, selectPlayerCurrentTime],
    (startTimeList, currentTime) => {
        for (let index = startTimeList.length; index--;) {
            if (startTimeList[index] <= currentTime) {
                return index;
            }
        }
        return 0;
    },
);
export const selectCurrentMessageId = createSelector(
    [selectMessageList, selectCurrentMessageIndex],
    (list, index) => list[index],
);
export const selectCurrentMessage = createSelector(
    [selectCurrentMessageId, selectMessageMap],
    (id, map) => map.get(id) || {
        id: generateId<MessageId>(),
        duration: 0,
        fragments: [],
    },
);
export const selectCurrentMessageDuration = createSelector(
    [selectCurrentMessage],
    (message) => message.duration,
);
export const selectCurrentMessageFragments = createSelector(
    [selectCurrentMessage],
    (message) => message.fragments,
);
export const selectCurrentMessageStartTime = createSelector(
    [selectStartTimeList, selectCurrentMessageIndex],
    (startTimeList, index) => startTimeList[index],
);
export const selectCurrentMessageElapsedTime = createSelector(
    [selectPlayerCurrentTime, selectCurrentMessageStartTime],
    (currentTime, startTime) => currentTime - startTime,
);
export const selectCurrentMessageProgress = createSelector(
    [selectCurrentMessageElapsedTime, selectCurrentMessageDuration],
    (elapsedTime, duration) => elapsedTime / duration,
);
