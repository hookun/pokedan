import {createElement, memo} from 'react';

export const ColorFilter = memo((
    {id, color}: {
        id: string,
        color: number,
    },
) => createElement(
    'defs',
    null,
    createElement(
        'filter',
        {id, filterUnits: 'userSpaceOnUse'},
        createElement('feColorMatrix', {
            in: 'SourceGraphic',
            type: 'hueRotate',
            values: color,
        }),
    ),
));
