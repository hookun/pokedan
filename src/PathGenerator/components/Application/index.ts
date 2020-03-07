import {createElement, Fragment, useReducer, useState, useEffect} from 'react';
import {calculatePath} from '../../../util/calculatePath';
import {useStyleSheet} from '../../../util/useStyleSheet';
import {filledArray} from '../../../util/filledArray';
import {Control} from '../Contol/index';
import {Matrix} from '../Matrix/index';
import className from './style.css';
import {ぬ} from './ぬ';

const createInitialMatrix = (
    width: number,
    height: number,
): Array<boolean> => {
    const matrix = [];
    const length = height * width;
    for (let index = 0; index < length; index++) {
        matrix[index] = false;
    }
    for (const [x, y] of ぬ) {
        matrix[y * width + x] = true;
    }
    return matrix;
};

const matrixReducer = (
    matrix: Array<boolean>,
    props: Array<boolean> | {
        index: number,
        value: boolean,
    },
) => {
    if (Array.isArray(props)) {
        return props;
    }
    return [
        ...matrix.slice(0, props.index),
        props.value,
        ...matrix.slice(props.index + 1),
    ];
};

export const Application = () => {
    const [[width, height], setSize] = useState<[number, number]>([9, 9]);
    const [matrix, dispatch] = useReducer(matrixReducer, createInitialMatrix(width, height));
    const dotRadius = 0.2;
    const maxCellSize = 40;
    const d = calculatePath(matrix, width);
    useStyleSheet([
        `.${className.app}{--Size:calc((var(--BaseWidth)-${width + 1}px)/(${width} + ${dotRadius * 2}))}`,
        `@media(min-width:${((maxCellSize * width + width + 1) / 0.92).toFixed(0)}px){.${className.app}{--Size:${maxCellSize}px}}`,
    ]);
    useEffect(() => dispatch(createInitialMatrix(width, height)), [width, height]);
    return createElement(
        Fragment,
        null,
        createElement(Control, {
            width,
            height,
            setSize,
            reset: () => dispatch(filledArray(matrix.length, false)),
        }),
        createElement(Matrix, {
            matrix,
            width,
            height,
            dotRadius,
            d,
            set: (index: number, value: boolean) => dispatch({index, value}),
        }),
        createElement(
            'div',
            {className: className.result},
            d,
        ),
    );
};
