import {useEffect, createElement, Fragment} from 'react';
import * as idb from 'idb-keyval';
import {DataPrefix} from './constants';
import {useSelector, useDispatch} from './core';
import {LoadMatrixData} from './action';
import {selectCharacter, selectMatrixData} from './selector';

export const LoadCharacter = () => {
    const character = useSelector(selectCharacter);
    const dispatch = useDispatch();
    useEffect(() => {
        if (character) {
            idb.get<string | undefined>(`${DataPrefix}${character}`)
            .then((matrixData) => {
                if (matrixData) {
                    dispatch(LoadMatrixData(matrixData));
                }
            })
            .catch(console.error);
        }
        idb.set(`${DataPrefix}character`, character).catch(console.error);
    }, [character]);
    return null;
};

export const SaveMatrix = () => {
    const character = useSelector(selectCharacter);
    const matrixData = useSelector(selectMatrixData);
    useEffect(() => {
        idb.set(`${DataPrefix}${character}`, matrixData).catch(console.error);
    }, [character, matrixData]);
    return null;
};

export const SideEffects = () => createElement(
    Fragment,
    null,
    createElement(LoadCharacter),
    createElement(SaveMatrix),
);
