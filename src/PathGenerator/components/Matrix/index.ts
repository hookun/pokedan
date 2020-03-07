import {createElement} from 'react';
import {classnames} from '../../../util/classnames';
import {useStyleSheet} from '../../../util/useStyleSheet';
import {filledArray} from '../../../util/filledArray';
import className from './style.css';

export const Matrix = (
    {matrix, width, height, dotRadius, d, set}: {
        matrix: Array<boolean>,
        width: number,
        height: number,
        dotRadius: number,
        d: string,
        set: (index: number, state: boolean) => void,
    },
) => {
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
                onClick: (event) => {
                    event.preventDefault();
                    set(index, !value);
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
