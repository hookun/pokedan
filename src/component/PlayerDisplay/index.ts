import {createElement, useCallback, ChangeEvent, ReactElement} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {classnames} from '@hookun/util/classnames';
import {
    selectDisplayStyle,
    selectPlayerShadowFilterId,
    selectPlayerWidth,
    selectPlayerHeight,
    selectPlayerScale,
    selectPlayerFrame,
    selectPlayerPaused,
} from '../../core/Player/selector';
import {MessageWindow} from '../MessageWindow';
import {ShadowFilter} from '../ShadowFilter';
import {selectCurrentMessageIdList} from '../../core/selector';
import {selectMessageListDuration} from '../../core/Message/selector';
import {setFrame, setPause, setScale} from '../../core/Player/action';
import {frameToSec} from '../../util/frameToSec';
import {Input} from '../Input';
import className from './style.css';

export const PlayerDisplay = (): ReactElement => {
    const dispatch = useDispatch();
    const paused = useSelector(selectPlayerPaused);
    const scale = useSelector(selectPlayerScale);
    const frame = useSelector(selectPlayerFrame);
    const style = useSelector(selectDisplayStyle);
    const id = useSelector(selectPlayerShadowFilterId);
    const width = useSelector(selectPlayerWidth);
    const height = useSelector(selectPlayerHeight);
    const messageIdList = useSelector(selectCurrentMessageIdList);
    const duration = useSelector(selectMessageListDuration);
    const onChangeFrame = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const frame = Number(event.currentTarget.value);
            if (!paused) {
                dispatch(setPause(true));
            }
            dispatch(setFrame(frame));
        },
        [dispatch, paused],
    );
    return createElement(
        'div',
        {className: className.container},
        createElement(
            'svg',
            {
                className: className.svg,
                style,
                viewBox: `0 0 ${width} ${height}`,
            },
            createElement(ShadowFilter, {id}),
            ...messageIdList.map((id) => createElement(MessageWindow, {id})),
        ),
        createElement(
            'button',
            {
                className: classnames(className.play, className.button),
                onClick: () => dispatch(setPause(!paused)),
            },
            paused ? '再生する' : '停止する',
        ),
        createElement(
            'div',
            {className: className.label},
            createElement(
                'svg',
                {
                    className: classnames(className.scale, className.button),
                    onClick: () => dispatch(setScale(scale - 0.1)),
                    viewBox: '-1 -1 12 12',
                },
                createElement('path', {d: 'M0 5H10'}),
            ),
            `x${scale.toFixed(1)}`,
            createElement(
                'svg',
                {
                    className: classnames(className.scale, className.button),
                    onClick: () => dispatch(setScale(scale + 0.1)),
                    viewBox: '-1 -1 12 12',
                },
                createElement('path', {d: 'M0 5H10M5 0V10'}),
            ),
            createElement(
                Input,
                {
                    className: className.frame,
                    type: 'number',
                    min: 0,
                    max: duration,
                    step: 1,
                    defaultValue: frame,
                    onChange: onChangeFrame,
                },
            ),
            `(${frameToSec(frame)}s) /${duration} (${frameToSec(duration)}s)`,
        ),
        createElement(
            Input,
            {
                className: className.seek,
                type: 'range',
                min: 0,
                max: duration,
                step: 1,
                defaultValue: frame,
                onChange: onChangeFrame,
            },
        ),
    );
};
