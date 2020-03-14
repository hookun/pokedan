import {createReducer, ActionType} from 'typesafe-actions';
import {updatePlayer} from './action';
import {FrameType} from '../../types';
import {DefaultFrameType} from '../../constants';

type SupportedActions =
| typeof updatePlayer;

export interface Player {
    id: string,
    width: number,
    height: number,
    currentFrame: number,
    paused: boolean,
    scale: number,
    backgroundColor: string,
    frameType: FrameType,
}

export const reducer = createReducer<Player, ActionType<SupportedActions>>({
    id: `Player-${Date.now().toString(34)}`,
    width: 256,
    height: 192,
    currentFrame: 0,
    paused: true,
    scale: 2,
    backgroundColor: 'rgb(0,0,255)',
    frameType: DefaultFrameType,
})
.handleAction(updatePlayer, (state, {payload}) => ({...state, ...payload}));
