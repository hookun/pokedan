import {createSelector} from 'reselect';
import {CSSProperties} from 'react';
import {Player} from './reducer';

export const selectPlayer = (state: {Player: Player}): Player => state.Player;
export const selectPlayerId = createSelector([selectPlayer], (player) => player.id);
export const selectPlayerShadowFilterId = createSelector([selectPlayerId], (id) => `${id}-Shadow`);
export const selectPlayerFile = createSelector([selectPlayer], (player) => player.file);
export const selectPlayerFrameType = createSelector([selectPlayer], (player) => player.frameType);
export const selectPlayerWidth = createSelector([selectPlayer], (player) => player.width);
export const selectPlayerHeight = createSelector([selectPlayer], (player) => player.height);
export const selectPlayerScale = createSelector([selectPlayer], (player) => player.scale);
export const selectPlayerBackground = createSelector([selectPlayer], (player) => player.background);
export const selectPlayerFrame = createSelector([selectPlayer], (player) => player.frame);
export const selectPlayerPaused = createSelector([selectPlayer], (player) => player.paused);
export const selectDisplayStyle = createSelector(
    [
        selectPlayerScale,
        selectPlayerBackground,
        selectPlayerWidth,
        // selectPlayerHeight,
    ],
    (scale, rgb, width): CSSProperties => ({
        width: `${(width * scale).toFixed(0)}px`,
        // height: `${(height * scale).toFixed(0)}px`,
        backgroundColor: `rgb(${rgb.map((value) => value.toFixed(0)).join(',')})`,
    }),
);
