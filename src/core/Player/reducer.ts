import {createReducer, ActionType} from 'typesafe-actions';
import {setFrameColor, setFrameType} from './action';
import {FrameType} from '../../types';
import {DefaultFrameType} from '../../constants';

type SupportedActions =
| typeof setFrameColor
| typeof setFrameType;

export interface Player {
    id: string,
    currentTime: number,
    paused: boolean,
    scale: number,
    padding: number,
    backgroundColor: [number, number, number],
    frame: {
        color: number,
        type: FrameType,
    },
}

export const reducer = createReducer<Player, ActionType<SupportedActions>>({
    id: `Player-${Date.now().toString(34)}`,
    currentTime: 0,
    paused: true,
    scale: 2,
    padding: 32,
    backgroundColor: [0, 0, 255],
    frame: {
        color: 120,
        type: DefaultFrameType,
    },
})
.handleAction(setFrameColor, (state, action) => ({
    ...state,
    frame: {
        ...state.frame,
        color: action.payload,
    },
}))
.handleAction(setFrameType, (state, action) => ({
    ...state,
    frame: {
        ...state.frame,
        type: action.payload,
    },
}));
