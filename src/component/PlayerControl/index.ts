import {createElement, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectPlayer} from '../../core/Player/selector';
import {updatePlayer} from '../../core/Player/action';
import {DisplayWidth, DisplayHeight} from '../../constants';
import {NumberInput} from '../NumberInput';
import className from './style.css';

export const PlayerControl = () => {
    const player = useSelector(selectPlayer);
    const dispatch = useDispatch();
    const onChangeWidth = useCallback((width: number) => dispatch(updatePlayer({width})), [dispatch]);
    const onChangeHeight = useCallback((height: number) => dispatch(updatePlayer({height})), [dispatch]);
    const onChangeScale = useCallback((scale: number) => dispatch(updatePlayer({scale})), [dispatch]);
    return createElement(
        'div',
        {className: className.container},
        createElement(NumberInput, {
            title: `画面の幅（初期値${DisplayWidth}）`,
            value: player.width,
            onChange: onChangeWidth,
        }),
        createElement(NumberInput, {
            title: `画面の高さ（初期値${DisplayHeight}）`,
            value: player.height,
            onChange: onChangeHeight,
        }),
        createElement(NumberInput, {
            title: 'スケール',
            value: player.scale,
            onChange: onChangeScale,
            min: 1,
            step: 0.1,
        }),
    );
}
