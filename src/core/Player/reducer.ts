import {Store} from 'idb-keyval';
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
    setStore,
} from './action';

type SupportedActions =
| typeof setFile
| typeof setStore
| typeof setFrame
| typeof setPause
| typeof setScale
| typeof setWidth
| typeof setHeight;

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
.handleAction(setFrame, (state, {payload: frame}) => ({...state, frame}))
.handleAction(setPause, (state, {payload: paused}) => ({...state, paused}))
.handleAction(setScale, (state, {payload: scale}) => ({...state, scale}))
.handleAction(setFile, (state, {payload: file}) => ({...state, file}))
.handleAction(setStore, (state, {payload: store}) => ({...state, store}))
.handleAction(setWidth, (state, {payload: width}) => ({...state, width}))
.handleAction(setHeight, (state, {payload: height}) => ({...state, height}));
