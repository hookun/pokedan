import {createElement} from 'react';
import {useSelector} from 'react-redux';
import {selectCurrentMessageFragments} from '../../core/selector';
import {Type} from '../Type';

export const MessageWindow = () => {
    const fragments = useSelector(selectCurrentMessageFragments);
    return createElement(
        'g',
        null,
        createElement(Type, {
            fragments,
            feed: [10, 13],
        }),
    );
};
