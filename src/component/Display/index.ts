import {createElement} from 'react';
import {useSelector} from 'react-redux';
import {selectDisplayStyle, selectPlayerShadowFilterId} from '../../core/Player/selector';
import {MessageWindow} from '../MessageWindow';
import {ShadowFilter} from '../ShadowFilter';
import className from './style.css';

export const Display = () => {
    const style = useSelector(selectDisplayStyle);
    const id = useSelector(selectPlayerShadowFilterId);
    return createElement(
        'svg',
        {
            className: className.svg,
            style,
            viewBox: '0 0 256 192',
        },
        createElement(ShadowFilter, {id}),
        createElement(MessageWindow),
    );
};
