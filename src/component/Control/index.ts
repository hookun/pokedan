import {createElement} from 'react';
import {useSelector} from 'react-redux';
import {selectPlayerCurrentTime} from '../../core/Player/selector';

export const Control = () => {
    const currentTime = useSelector(selectPlayerCurrentTime);
    return createElement(
        'div',
        null,
        createElement('div', null, `Time: ${currentTime}`),
    );
}
