import {createElement, Fragment} from 'react';
import {useSelector} from 'react-redux';
import {Control} from '../Control';
import {Display} from '../Display';
import {selectDisplayAreaStyle} from '../../core/Player/selector';

export const Player = () => {
    const style = useSelector(selectDisplayAreaStyle);
    return createElement(
        Fragment,
        null,
        createElement(
            'div',
            {style},
            createElement(Display),
        ),
        createElement(Control),
    );
};
