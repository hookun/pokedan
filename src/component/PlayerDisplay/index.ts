import {createElement, useCallback, ChangeEvent, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    selectDisplayStyle,
    selectPlayerShadowFilterId,
    selectPlayerWidth,
    selectPlayerHeight,
    selectPlayer,
} from '../../core/Player/selector';
import {MessageWindow} from '../MessageWindow';
import {ShadowFilter} from '../ShadowFilter';
import {selectCurrentMessageIdList} from '../../core/selector';
import {selectMessageListDuration} from '../../core/Message/selector';
import className from './style.css';
import {updatePlayer} from '../../core/Player/action';
import {classnames} from '../../util/classnames';

export const PlayerDisplay = () => {
    const dispatch = useDispatch();
    const player = useSelector(selectPlayer);
    const style = useSelector(selectDisplayStyle);
    const id = useSelector(selectPlayerShadowFilterId);
    const width = useSelector(selectPlayerWidth);
    const height = useSelector(selectPlayerHeight);
    const messageIdList = useSelector(selectCurrentMessageIdList);
    const duration = useSelector(selectMessageListDuration);
    const onChangeFrame = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const currentFrame = Number(event.currentTarget.value);
            dispatch(updatePlayer({currentFrame}));
        },
        [dispatch],
    );
    const digits = useMemo(() => ({
        frame: Math.floor(1 + Math.log10(duration)),
        sec: Math.floor(3 + Math.log10(duration / 60)),
    }), [duration]);
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
                onClick: () => dispatch(updatePlayer({paused: !player.paused})),
            },
            player.paused ? '再生する' : '停止する',
        ),
        createElement(
            'div',
            {className: className.label},
            'フレーム',
            createElement(
                'input',
                {
                    className: className.frame,
                    type: 'number',
                    min: 0,
                    max: duration,
                    step: 1,
                    value: player.currentFrame,
                    onChange: (event) => {
                        const currentFrame = Number(event.currentTarget.value);
                        dispatch(updatePlayer({currentFrame}));
                    },
                    style: {width: `${digits.frame.toFixed(1)}rem`},
                },
            ),
            `/${duration} `,
            (player.currentFrame / 60).toFixed(1).padStart(digits.sec, ' '),
            's ',
            createElement(
                'svg',
                {
                    className: classnames(className.scale, className.button),
                    onClick: () => dispatch(updatePlayer({scale: player.scale - 0.1})),
                    viewBox: '-1 -1 12 12',
                },
                createElement('path', {d: 'M0 5H10'}),
            ),
            `x${player.scale.toFixed(1)}`,
            createElement(
                'svg',
                {
                    className: classnames(className.scale, className.button),
                    onClick: () => dispatch(updatePlayer({scale: player.scale + 0.1})),
                    viewBox: '-1 -1 12 12',
                },
                createElement('path', {d: 'M0 5H10M5 0V10'}),
            ),
        ),
        createElement(
            'input',
            {
                className: className.seek,
                type: 'range',
                min: 0,
                max: duration,
                step: 1,
                value: player.currentFrame,
                onChange: onChangeFrame,
            },
        ),
    );
};
