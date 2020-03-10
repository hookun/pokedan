import {Reducer} from 'react';
import {createReducer} from 'typesafe-actions';
import {filledArray} from '../util/filledArray';
import {decodeMatrix} from './matrix';
import {PathGeneratorState} from './type';
import {
    PathGeneratorAction,
    SetWidth,
    SetHeight,
    SetCell,
    ClearMatrix,
    SetPage,
    SetCharacter,
    LoadMatrixData,
    SetCellNumber,
    SetPathDirection,
    SetExportType,
} from './action';
import {pages} from './constants';

const reducer = createReducer<PathGeneratorState, PathGeneratorAction>(null)
.handleAction(SetWidth, (state, {payload: width}) => {
    const {matrix: oldMatrix, width: oldWidth} = state;
    const matrix = filledArray(width * state.height, false);
    oldMatrix.forEach((filled, index) => {
        if (filled) {
            const x = index % oldWidth;
            if (x < width) {
                const y = Math.floor(index / oldWidth);
                matrix[x + y * width] = true;
            }
        }
    });
    return {...state, width, matrix};
})
.handleAction(SetHeight, (state, {payload: height}) => {
    const {matrix: oldMatrix, width} = state;
    const matrix = filledArray(state.width * height, false);
    oldMatrix.forEach((filled, index) => {
        if (filled) {
            const y = Math.floor(index / width);
            if (y < height) {
                const x = index % width;
                matrix[x + y * width] = true;
            }
        }
    });
    return {...state, height, matrix};
})
.handleAction(SetCell, (state, {payload: {index, value}}) => ({
    ...state,
    matrix: [
        ...state.matrix.slice(0, index),
        value,
        ...state.matrix.slice(index + 1),
    ],
}))
.handleAction(ClearMatrix, (state) => ({
    ...state,
    matrix: filledArray(state.width * state.height, false),
}))
.handleAction(SetPage, (state, {payload: page}) => {
    const index = pages[state.page].join('').indexOf(state.character);
    const character = index < 0 ? '' : pages[page].join('')[index];
    let {matrix} = state;
    if (character !== state.character) {
        matrix = filledArray(state.width * state.height, false);
    }
    return {...state, page, character, matrix};
})
.handleAction(SetCharacter, (state, {payload: character}) => {
    if (state.character === character) {
        return state;
    }
    return {
        ...state,
        character,
        matrix: filledArray(state.width * state.height, false),
    };
})
.handleAction(LoadMatrixData, (state, {payload}) => ({...state, ...decodeMatrix(payload)}))
.handleAction(SetCellNumber, (state, {payload: cellNumber}) => ({...state, cellNumber}))
.handleAction(SetPathDirection, (state, {payload: pathDirection}) => ({...state, pathDirection}))
.handleAction(SetExportType, (state, {payload: exportType}) => ({...state, exportType}));

export const applyConsumers = <State, Action>(
    reducer: Reducer<State, Action>,
    ...consumers: Array<(oldState: State, action: Action, newState: State) => void | Promise<void>>
): Reducer<State, Action> => {
    return (state, action) => {
        const newState = reducer(state, action);
        Promise.all(consumers.map(async (consume) => {
            await Promise.resolve(consume(state, action, newState));
        }))
        .catch(console.error);
        return newState;
    };
};

export const pathGeneratorReducer = applyConsumers(
    reducer,
    (_, action) => {
        const payload = 'payload' in action ? JSON.stringify(action.payload) : '';
        console.log(`${action.type}: ${payload}`);
    },
);
