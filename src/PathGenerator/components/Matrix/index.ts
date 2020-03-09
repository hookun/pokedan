import {createElement, MouseEvent} from 'react';
import {classnames} from '../../../util/classnames';
import {useStyleSheet} from '../../../util/useStyleSheet';
import {filledArray} from '../../../util/filledArray';
import {
    useSelector,
    selectWidth,
    selectHeight,
    selectDotRadius,
    selectMatrix,
    useDispatch,
    SetCell,
    selectD,
} from '../../core';
import className from './style.css';

export const Matrix = () => {
    const width = useSelector(selectWidth);
    const height = useSelector(selectHeight);
    const dotRadius = useSelector(selectDotRadius);
    const matrix = useSelector(selectMatrix);
    const d = useSelector(selectD);
    const dispatch = useDispatch();
    useStyleSheet([
        `.${className.table}{${[
            `grid-template-columns:${filledArray(width, 'var(--Size)').join(' ')}`,
            `grid-template-rows:${filledArray(height, 'var(--Size)').join(' ')}`,
            `padding:calc(var(--Size)*${dotRadius})`,
        ].join(';')}}`,
    ]);
    return createElement(
        'div',
        {className: className.table},
        ...matrix.map((value, index) => createElement(
            'button',
            {
                className: classnames(className.cell, value && className.filled),
                onClick: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    event.preventDefault();
                    dispatch(SetCell(index, !value));
                },
            }
        )),
        d && createElement(
            'svg',
            {
                viewBox: [
                    -dotRadius,
                    -dotRadius,
                    width + dotRadius * 2,
                    height + dotRadius * 2,
                ].join(' '),
                className: className.svg,
            },
            createElement('path', {className: className.path, d}),
            createElement(
                'circle',
                {className: className.dot, cx: 0, cy: 0, r: dotRadius},
                createElement(
                    'animateMotion',
                    {
                        path: d,
                        dur: `${(d.length / 10).toFixed(1)}s`,
                        repeatCount: 'indefinite',
                    },
                ),
            ),
        ),
    );
};
