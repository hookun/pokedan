import {createElement, SVGProps} from 'react';
import {useSelector} from 'react-redux';
import {MessageFragment} from '../../types';
import {useFragmentPrinter} from '../../use/FragmentPrinter';
import {selectPlayerShadowFilterId} from '../../core/Player/selector';

export const Type = (
    {fragments, feed, g = {}}: {
        fragments: Array<MessageFragment>,
        feed: [number, number],
        g?: SVGProps<SVGGElement>,
    },
) => {
    const printees = useFragmentPrinter(fragments, feed);
    const id = useSelector(selectPlayerShadowFilterId);
    return createElement(
        'g',
        {...g, filter: `url(#${id})`},
        ...printees.map(({character, x, y, color}) => createElement(
            'use',
            {
                href: `#U${character.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`,
                x,
                y,
                fill: `${color}`.toLowerCase(),
            },
        )),
    );
};
