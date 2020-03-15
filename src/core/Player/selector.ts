import {createSelector} from 'reselect';
import {CSSProperties} from 'react';
import {Player} from './reducer';

export const selectPlayer = (state: {Player: Player}) => state.Player;
export const selectPlayerId = createSelector([selectPlayer], (player) => player.id);
export const selectPlayerShadowFilterId = createSelector([selectPlayerId], (id) => `${id}-Shadow`);
export const selectPlayerFile = createSelector([selectPlayer], (player) => player.file);
export const selectPlayerFrameType = createSelector([selectPlayer], (player) => player.frameType);
export const selectPlayerWidth = createSelector([selectPlayer], (player) => player.width);
export const selectPlayerHeight = createSelector([selectPlayer], (player) => player.height);
export const selectPlayerScale = createSelector([selectPlayer], (player) => player.scale);
export const selectPlayerBackgroundColor = createSelector([selectPlayer], (player) => player.backgroundColor);
export const selectPlayerFrame = createSelector([selectPlayer], (player) => player.frame);
export const selectPlayerPaused = createSelector([selectPlayer], (player) => player.paused);
export const selectDisplayStyle = createSelector(
    [
        selectPlayerScale,
        selectPlayerBackgroundColor,
        selectPlayerWidth,
        // selectPlayerHeight,
    ],
    (scale, backgroundColor, width): CSSProperties => ({
        width: `${(width * scale).toFixed(0)}px`,
        // height: `${(height * scale).toFixed(0)}px`,
        backgroundColor,
    }),
);
