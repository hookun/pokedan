import {createElement, MouseEvent} from 'react';
import className from './style.css';
import {InputSize} from '../InputSize';
import {
    selectWidth,
    SetWidth,
    selectHeight,
    SetHeight,
    useDispatch,
    ClearMatrix,
} from '../../core';

export const Control = () => {
    const dispatch = useDispatch();
    return createElement(
        'div',
        null,
        createElement(InputSize, {label: '横', selector: selectWidth, action: SetWidth}),
        'x',
        createElement(InputSize, {label: '縦', selector: selectHeight, action: SetHeight}),
        createElement(
            'button',
            {
                className: className.reset,
                onClick: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    event.preventDefault();
                    dispatch(ClearMatrix());
                },
            },
            '全て消す',
        ),
    );
};
