import {useContext, createContext, Dispatch, createElement, useReducer} from 'react';
import {createReducer, createAction, ActionType} from 'typesafe-actions';
import {Selector, createSelector} from 'reselect';
import {createTypeFilter} from '../util/createTypeFilter';
import {filledArray} from '../util/filledArray';
import {isPositiveSafeInteger} from '../is/PositiveSafeInteger';
import {Application} from './components/Application';
import {ぬ} from './ぬ';
import {calculatePath} from '../util/calculatePath';

export interface AppState {
    dotRadius: number,
    maxCellSize: number,
    width: number,
    height: number,
    matrix: Array<boolean>,
}

export const selectWidth = (state: AppState): number => state.width;
export const selectHeight = (state: AppState): number => state.height;
export const selectDotRadius = (state: AppState): number => state.dotRadius;
export const selectMaxCellSize = (state: AppState): number => state.maxCellSize;
export const selectMatrix = (state: AppState): Array<boolean> => state.matrix;
export const selectD = createSelector(
    [selectMatrix, selectWidth],
    (matrix, width) => calculatePath(matrix, width),
);

export const SetWidth = createAction('SetWidth', createTypeFilter(isPositiveSafeInteger))();
export const SetHeight = createAction('SetHeight', createTypeFilter(isPositiveSafeInteger))();
export const SetCell = createAction('SetCell', (index: number, value: boolean) => {
    return {index, value};
})();
export const ClearMatrix = createAction('ClearMatrix')();

export const createInitialState = (): AppState => {
    const width = 9;
    const height = 9;
    const matrix = filledArray(width * height, false);
    for (const [x, y] of ぬ) {
        matrix[x + y * width] = true;
    }
    return {
        dotRadius: 0.2,
        maxCellSize: 40,
        width,
        height,
        matrix,
    };
};

type PathGeneratorActionCreators =
| typeof SetWidth
| typeof SetHeight
| typeof SetCell
| typeof ClearMatrix;

type PathGeneratorAction = ActionType<PathGeneratorActionCreators>;

const StateContext = createContext<[AppState, Dispatch<PathGeneratorAction>]>(undefined);

export const useDispatch = () => useContext(StateContext)[1];
export const useSelector = <Type>(selector: Selector<AppState, Type>) => {
    const [state] = useContext(StateContext);
    return selector(state);
};

const reducer = createReducer<AppState, PathGeneratorAction>(createInitialState())
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
}));

export const RootComponent = () => createElement(
    StateContext.Provider,
    {value: useReducer(reducer, createInitialState())},
    createElement(Application),
);
