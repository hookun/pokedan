import * as idb from 'idb-keyval';
import {useState, useEffect, useMemo} from 'react';
import {useSelector} from './core';
import {selectCharacter, selectMatrixData} from './selector';
import {DataPrefix} from './constants';
import {decodeMatrix} from './matrix';
import {calculatePath} from '../util/calculatePath';
import {filledArray} from '../util/filledArray';

export const useCharacter = (character: string) => {
    const currentCharacter = useSelector(selectCharacter);
    const currentMatrixData = useSelector(selectMatrixData);
    const [matrixData, setMatrixData] = useState<string>('');
    useEffect(() => {
        idb.get<string | undefined>(`${DataPrefix}${character}`)
        .then((matrixData) => {
            setMatrixData(matrixData || '');
        })
        .catch(console.error);
    }, [character]);
    useEffect(() => {
        if (character === currentCharacter) {
            setMatrixData(currentMatrixData);
        }
    }, [character, currentCharacter, currentMatrixData]);
    const decoded = useMemo(() => {
        return matrixData ? decodeMatrix(matrixData) : {
            matrix: filledArray(81, false),
            width: 9,
            height: 9,
        };
    }, [matrixData]);
    const d = useMemo(() => calculatePath(decoded.matrix, decoded.width), [decoded]);
    return {matrixData, ...decoded, d};
};
