import {createElement} from 'react';
import {TextColor} from '../../types';

export const Character = (
    props: {
        text: string,
        color: TextColor,
        x: number
    },
) => createElement(
    'use',
    {
        href: `#U${props.text.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`,
        x: (props.x + 1) * 10,
        y: 10,
        fill: `${props.color}`.toLowerCase(),
    },
);
