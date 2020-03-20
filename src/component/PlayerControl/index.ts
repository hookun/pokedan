import {createElement, ReactElement} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectPlayerWidth, selectPlayerHeight, selectPlayerScale, selectPlayerBackground} from '../../core/Player/selector';
import {setWidth, setHeight, setScale, setBackground} from '../../core/Player/action';
import {DisplayWidth, DisplayHeight} from '../../constants';
import {NumberInput} from '../NumberInput';
import className from './style.css';
import {RGBInput} from '../RGBInput';

export const PlayerControl = (): ReactElement => {
    const dispatch = useDispatch();
    return createElement(
        'div',
        {className: className.container},
        createElement(NumberInput, {
            title: '幅',
            placeholder: `${DisplayWidth}`,
            value: useSelector(selectPlayerWidth),
            onChange: (width) => dispatch(setWidth(width)),
        }),
        createElement(NumberInput, {
            title: '高さ',
            placeholder: `${DisplayHeight}`,
            value: useSelector(selectPlayerHeight),
            onChange: (height) => dispatch(setHeight(height)),
        }),
        createElement(NumberInput, {
            title: '拡大率',
            value: useSelector(selectPlayerScale),
            onChange: (scale) => dispatch(setScale(scale)),
            min: 1,
            step: 0.1,
        }),
        createElement(RGBInput, {
            title: '背景色',
            value: useSelector(selectPlayerBackground),
            onChange: (rgb) => dispatch(setBackground(rgb)),
        }),
    );
};
