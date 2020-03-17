import {createReducer, ActionType} from 'typesafe-actions';
import {FrameType} from '../../types';
import {DefaultFrameType} from '../../constants';
import {
    setFrame,
    setPause,
    setWidth,
    setHeight,
    setScale,
    setFile,
    initializePlayer,
    setBackground,
} from './action';

type SupportedActions =
| typeof setFile
| typeof setFrame
| typeof setPause
| typeof setScale
| typeof setWidth
| typeof setHeight
| typeof setBackground
| typeof initializePlayer;

export interface Player {
    id: string,
    file: string,
    width: number,
    height: number,
    frame: number,
    paused: boolean,
    scale: number,
    background: [number, number, number],
    frameType: FrameType,
}

const initialPlayerState: Player = {
    id: `Player-${Date.now().toString(34)}`,
    file: `シーン-${new Date().toLocaleString().replace(/[\s/]+/g, '-')}`,
    width: 256,
    height: 192,
    frame: 0,
    paused: true,
    scale: 2,
    background: [255, 0, 255],
    frameType: DefaultFrameType,
};

export const reducer = createReducer<Player, ActionType<SupportedActions>>(initialPlayerState)
.handleAction(setFrame, (state, {payload: frame}) => ({...state, frame}))
.handleAction(setPause, (state, {payload: paused}) => ({...state, paused}))
.handleAction(setScale, (state, {payload: scale}) => ({...state, scale}))
.handleAction(setFile, (state, {payload: file}) => ({...state, file}))
.handleAction(setWidth, (state, {payload: width}) => ({...state, width}))
.handleAction(setHeight, (state, {payload: height}) => ({...state, height}))
.handleAction(setBackground, (state, {payload: background}) => ({...state, background}))
.handleAction(initializePlayer, (state, {payload}) => ({
    ...initialPlayerState,
    ...state,
    ...payload,
}));
