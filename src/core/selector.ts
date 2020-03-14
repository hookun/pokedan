import {createSelector} from 'reselect';
import {
    selectMessageList,
    selectMessageMap,
} from './Message/selector';
import {selectPlayerCurrentFrame} from './Player/selector';

export const selectCurrentMessageIdList = createSelector(
    [selectMessageList, selectMessageMap, selectPlayerCurrentFrame],
    (list, map, currentFrame) => list.filter((id) => {
        const {start, end} = map.get(id);
        return start <= currentFrame && currentFrame < end;
    }),
);
