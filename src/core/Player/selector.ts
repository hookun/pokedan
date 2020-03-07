import {createSelector} from 'reselect';
import {CSSProperties} from 'react';
import {Player} from './reducer';
import {DisplayWidth} from '../../constants';

export const selectPlayer = (state: {Player: Player}) => state.Player;
export const selectPlayerId = createSelector(
    [selectPlayer],
    (player) => player.id,
);
export const selectPlayerShadowFilterId = createSelector(
    [selectPlayerId],
    (id) => `${id}-Shadow`,
);
export const selectPlayerFrame = createSelector(
    [selectPlayer],
    (player) => player.frame,
);
export const selectPlayerFrameColor = createSelector(
    [selectPlayerFrame],
    (frame) => frame.color,
);
export const selectPlayerFrameType = createSelector(
    [selectPlayerFrame],
    (frame) => frame.type,
);
export const selectPlayerScale = createSelector(
    [selectPlayer],
    (player) => player.scale,
);
export const selectPlayerPadding = createSelector(
    [selectPlayer],
    (player) => player.padding,
);
export const selectPlayerBackgroundColor = createSelector(
    [selectPlayer],
    (player) => player.backgroundColor,
);
export const selectDisplayAreaStyle = createSelector(
    [selectPlayerPadding, selectPlayerBackgroundColor],
    (padding, rgb): CSSProperties => ({
        padding: `${padding}px 0`,
        backgroundColor: `rgb(${rgb.join(',')})`,
    }),
);
export const selectDisplayStyle = createSelector(
    [selectPlayerScale],
    (scale): CSSProperties => ({
        width: `${(DisplayWidth * scale).toFixed(0)}px`,
    }),
);
export const selectPlayerCurrentTime = createSelector(
    [selectPlayer],
    (player) => player.currentTime,
);
export const selectPlayerPaused = createSelector(
    [selectPlayer],
    (player) => player.paused,
);
