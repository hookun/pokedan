import {createSelector} from 'reselect';
import {selectMessageList, selectStartTimeList} from './MessageList/selector';
import {selectPlayerCurrentTime} from './Player/selector';
import {destructFragments} from '../util/destructFragments';
import {MessageFragment} from '../types';

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
export const selectCurrentMessage = createSelector(
    [selectMessageList, selectCurrentMessageIndex],
    (messageList, index) => messageList[index],
);
export const selectCurrentMessageDuration = createSelector(
    [selectCurrentMessage],
    (message) => message.duration,
);
export const selectCurrentMessageFragments = createSelector(
    [selectCurrentMessage],
    (message) => message.fragments,
);
export const selectCurrentMessageCharacters = createSelector(
    [selectCurrentMessageFragments],
    (fragments) => {
        const characters: Array<MessageFragment> = [];
        const destructor = destructFragments(fragments);
        while (1) {
            const result = destructor.next();
            if (result.done) {
                return characters;
            }
            characters.push(result.value);
        }
    },
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
