import {createElement, memo} from 'react';

export const ShadowFilter = memo((
    props: {id: string},
) => createElement(
    'defs',
    null,
    createElement(
        'filter',
        {...props, filterUnits: 'userSpaceOnUse'},
        createElement('feOffset', {dx: 1, dy: 0, in: 'SourceAlpha', result: 'Dx'}),
        createElement('feOffset', {dx: 0, dy: 1, in: 'SourceAlpha', result: 'Dy'}),
        createElement('feComposite', {in: 'Dx', in2: 'Dy', result: 'Merged'}),
        createElement(
            'feComponentTransfer',
            {in: 'Merged', result: 'Shadow'},
            createElement('feFuncA', {type: 'linear', slope: 0.5}),
        ),
        createElement('feComposite', {in: 'SourceGraphic', in2: 'Shadow'}),
    ),
));
