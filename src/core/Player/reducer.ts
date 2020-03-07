import {createReducer, ActionType} from 'typesafe-actions';
import {setFrameColor, setFrameType} from './action';
import {FrameType, FrameColor} from '../../types';
import {DefaultFrameType, DefaultFrameColor} from '../../constants';

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
        color: FrameColor,
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
        color: DefaultFrameColor,
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
