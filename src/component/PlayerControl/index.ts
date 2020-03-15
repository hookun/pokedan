import {createElement, ReactElement} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectPlayerWidth, selectPlayerHeight, selectPlayerScale} from '../../core/Player/selector';
import {setWidth, setHeight, setScale} from '../../core/Player/action';
import {DisplayWidth, DisplayHeight} from '../../constants';
import {NumberInput} from '../NumberInput';
import className from './style.css';

export const PlayerControl = (): ReactElement => {
    const dispatch = useDispatch();
    return createElement(
        'div',
        {className: className.container},
        createElement(NumberInput, {
            title: `画面の幅（初期値${DisplayWidth}）`,
            value: useSelector(selectPlayerWidth),
            onChange: (width: number) => dispatch(setWidth(width)),
        }),
        createElement(NumberInput, {
            title: `画面の高さ（初期値${DisplayHeight}）`,
            value: useSelector(selectPlayerHeight),
            onChange: (height: number) => dispatch(setHeight(height)),
        }),
        createElement(NumberInput, {
            title: 'スケール',
            value: useSelector(selectPlayerScale),
            onChange: (scale: number) => dispatch(setScale(scale)),
            min: 1,
            step: 0.1,
        }),
    );
}
