import {Store} from 'idb-keyval';
import {createReducer, ActionType} from 'typesafe-actions';
import {updatePlayer, setFrame} from './action';
import {FrameType} from '../../types';
import {DefaultFrameType} from '../../constants';

type SupportedActions =
| typeof updatePlayer
| typeof setFrame;

export interface Player {
    id: string,
    file: string,
    store: Store | null,
    width: number,
    height: number,
    frame: number,
    paused: boolean,
    scale: number,
    backgroundColor: string,
    frameType: FrameType,
}

export const reducer = createReducer<Player, ActionType<SupportedActions>>({
    id: `Player-${Date.now().toString(34)}`,
    file: `シーン-${new Date().toLocaleString().replace(/[\s/]+/g, '-')}`,
    store: null,
    width: 256,
    height: 192,
    frame: 0,
    paused: true,
    scale: 2,
    backgroundColor: 'rgb(0,0,255)',
    frameType: DefaultFrameType,
})
.handleAction(updatePlayer, (state, {payload}) => ({...state, ...payload}))
.handleAction(setFrame, (state, {payload: frame}) => ({...state, frame}));
