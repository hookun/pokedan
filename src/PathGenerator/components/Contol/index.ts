import {createElement, Dispatch, SetStateAction} from 'react';
import className from './style.css';

export const Control = (
    {
        width,
        height,
        setSize,
        reset,
        minWidth = 9,
        maxWidth = 255,
        minHeight = 9,
        maxHeight = 255,
    }: {
        width: number,
        height: number,
        setSize: Dispatch<SetStateAction<[number, number]>>,
        reset: () => void,
        minWidth?: number,
        maxWidth?: number,
        minHeight?: number,
        maxHeight?: number,
    },
) => createElement(
    'div',
    null,
    createElement(
        'input',
        {
            type: 'number',
            min: minWidth,
            max: maxWidth,
            defaultValue: width,
            onChange: (event) => {
                event.preventDefault();
                setSize([Number(event.target.value), height]);
            },
        },
    ),
    createElement(
        'input',
        {
            type: 'number',
            min: minHeight,
            max: maxHeight,
            defaultValue: height,
            onChange: (event) => {
                event.preventDefault();
                setSize([width, Number(event.target.value)]);
            },
        },
    ),
    createElement(
        'button',
        {
            className: className.reset,
            onClick: (event) => {
                event.preventDefault();
                reset();
            },
        },
        '全て消す',
    ),
);
