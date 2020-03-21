import {createElement, useCallback, ChangeEvent, ReactElement, Fragment} from 'react';
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

export const PlayButton = (): ReactElement => {
    const dispatch = useDispatch();
    const paused = useSelector(selectPlayerPaused);
    return createElement(
        'button',
        {
            className: classnames(className.play, className.button),
            onClick: useCallback(() => dispatch(setPause(!paused)), [dispatch, paused]),
        },
        paused ? '再生する' : '停止する',
    );
};

export const ScaleController = (): ReactElement => {
    const dispatch = useDispatch();
    const scale = useSelector(selectPlayerScale);
    return createElement(
        Fragment,
        null,
        createElement(
            'svg',
            {
                className: classnames(className.scale, className.button),
                onClick: useCallback(
                    () => dispatch(setScale(scale - 0.1)),
                    [dispatch, scale],
                ),
                viewBox: '-1 -1 12 12',
            },
            createElement('path', {d: 'M0 5H10'}),
        ),
        `x${scale.toFixed(1)}`,
        createElement(
            'svg',
            {
                className: classnames(className.scale, className.button),
                onClick: useCallback(
                    () => dispatch(setScale(scale + 0.1)),
                    [dispatch, scale],
                ),
                viewBox: '-1 -1 12 12',
            },
            createElement('path', {d: 'M0 5H10M5 0V10'}),
        ),
    );
};

export const SeekBar = (): ReactElement => {
    const dispatch = useDispatch();
    const paused = useSelector(selectPlayerPaused);
    const frame = useSelector(selectPlayerFrame);
    const duration = useSelector(selectMessageListDuration);
    return createElement(
        Input,
        {
            className: className.seek,
            type: 'range',
            min: 0,
            max: duration,
            step: 1,
            defaultValue: frame,
            onChange: useCallback(
                (event: ChangeEvent<HTMLInputElement>) => {
                    const frame = Number(event.currentTarget.value);
                    if (!paused) {
                        dispatch(setPause(true));
                    }
                    dispatch(setFrame(frame));
                },
                [dispatch, paused],
            ),
        },
    );
};

export const PlayerDisplay = (): ReactElement => {
    const dispatch = useDispatch();
    const paused = useSelector(selectPlayerPaused);
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
        createElement(PlayButton),
        createElement(
            'div',
            {className: className.label},
            createElement(ScaleController),
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
        createElement(SeekBar),
    );
};
