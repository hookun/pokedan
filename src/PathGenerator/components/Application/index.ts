import {createElement, Fragment} from 'react';
import {useStyleSheet} from '../../../util/useStyleSheet';
import {Control} from '../Contol/index';
import {Matrix} from '../Matrix/index';
import className from './style.css';
import {
    useSelector,
    selectWidth,
    selectDotRadius,
    selectMaxCellSize,
    selectD,
} from '../../core';

export const Application = () => {
    const width = useSelector(selectWidth);
    const dotRadius = useSelector(selectDotRadius);
    const maxCellSize = useSelector(selectMaxCellSize);
    const d = useSelector(selectD);
    useStyleSheet([
        `.${className.app}{--Size:calc((var(--BaseWidth)-${width + 1}px)/(${width} + ${dotRadius * 2}))}`,
        `@media(min-width:${((maxCellSize * width + width + 1) / 0.92).toFixed(0)}px){.${className.app}{--Size:${maxCellSize}px}}`,
    ]);
    return createElement(
        Fragment,
        null,
        createElement(Control),
        createElement(Matrix),
        createElement('div', {className: className.result}, d),
    );
};
