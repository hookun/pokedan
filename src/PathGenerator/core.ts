import * as idb from 'idb-keyval';
import {useContext, createContext, Dispatch} from 'react';
import {Selector} from 'reselect';
import {filledArray} from '../util/filledArray';
import {ぬ} from './ぬ';
import {DataPrefix} from './constants';
import {decodeMatrix} from './matrix';
import {PathGeneratorState} from './type';
import {PathGeneratorAction} from './action';

export const createInitialState = async (): Promise<PathGeneratorState> => {
    let width = 9;
    let height = 9;
    let matrix = filledArray(width * height, false);
    const character = (await idb.get<string | undefined>(`${DataPrefix}character`)) || '';
    const matrixData = await idb.get<string | undefined>(`${DataPrefix}${character}`);
    if (matrixData) {
        const decoded = decodeMatrix(matrixData);
        width = decoded.width;
        height = decoded.height;
        matrix = decoded.matrix;
    }
    let pathDirection = false;
    if (!character) {
        for (const [x, y] of ぬ) {
            matrix[x + y * width] = true;
        }
        pathDirection = true;
    }
    return {
        arrowSize: 0.5,
        arrowLength: 1.5,
        maxCellSize: 40,
        width,
        height,
        matrix,
        page: 'かな',
        character,
        cellNumber: false,
        pathDirection,
    };
};

export const StateContext = createContext<[PathGeneratorState, Dispatch<PathGeneratorAction>]>(undefined);
export const useDispatch = () => useContext(StateContext)[1];
export const useSelector = <Type>(selector: Selector<PathGeneratorState, Type>) => {
    const [state] = useContext(StateContext);
    return selector(state);
};
