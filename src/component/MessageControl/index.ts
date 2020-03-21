import {createElement, Fragment, useCallback, ChangeEvent, ReactElement} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {classnames} from '@hookun/util/classnames';
import {useMessage} from '../../use/Message';
import {MessageId} from '../../types';
import {
    deleteMessage,
    insertMessage,
    setMessageFrameColor,
    setMessageSpeed,
    setMessageFrom,
    setMessageStart,
    setMessageEnd,
    setMessageHeight,
    setMessageWidth,
    setMessageX,
    setMessageY,
} from '../../core/Message/action';
import {NumberInput} from '../NumberInput';
import {setFrame, setPause} from '../../core/Player/action';
import {frameToSec} from '../../util/frameToSec';
import {Input} from '../Input';
import {selectPlayerPaused} from '../../core/Player/selector';
import className from './style.css';

export const CueButton = (
    {id}: {id: MessageId},
): ReactElement => {
    const {start} = useMessage(id);
    const paused = useSelector(selectPlayerPaused);
    const dispatch = useDispatch();
    const onClick = useCallback(
        () => {
            dispatch(setPause(true));
            dispatch(setFrame(start));
            if (!paused) {
                dispatch(setPause(false));
            }
        },
        [paused, start, dispatch],
    );
    return createElement(
        'button',
        {className: className.button, onClick},
        'ここに\n移動',
    );
};

export const PlayButton = (): ReactElement => {
    const paused = useSelector(selectPlayerPaused);
    const dispatch = useDispatch();
    const onClick = useCallback(
        () => dispatch(setPause(!paused)),
        [paused, dispatch],
    );
    return createElement(
        'button',
        {className: className.button, onClick},
        paused ? '再生' : '停止',
    );
};

export const DuplicateButton = (
    {id}: {id: MessageId},
): ReactElement => {
    const message = useMessage(id);
    const dispatch = useDispatch();
    const onClick = useCallback(
        () => dispatch(insertMessage({
            index: message.id,
            message: {
                ...message,
                start: message.end,
                end: message.end * 2 - message.start,
            },
        })),
        [message, dispatch],
    );
    return createElement(
        'button',
        {className: className.button, onClick},
        '複製',
    );
};

export const DeleteButton = (
    {id}: {id: MessageId},
): ReactElement => {
    const dispatch = useDispatch();
    const onClick = useCallback(
        () => {
            if (confirm('このメッセージを削除します')) {
                dispatch(deleteMessage(id));
            }
        },
        [id, dispatch],
    );
    return createElement(
        'button',
        {
            className: classnames(className.button, className.delete),
            onClick,
        },
        '削除',
    );
};

export const MessageControl = (
    {id}: {id: MessageId},
): ReactElement => {
    const message = useMessage(id);
    const dispatch = useDispatch();
    const onChangeFrameColor = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const frameColor = Number(event.currentTarget.value);
            dispatch(setMessageFrameColor({id, frameColor}));
        },
        [id, dispatch],
    );
    const duration = message.end - message.start;
    return createElement(
        Fragment,
        null,
        createElement(
            'div',
            {className: className.buttons},
            createElement(CueButton, {id}),
            createElement('div', null, '長さ'),
            createElement('div', null, `${duration}f (${frameToSec(duration)}s)`),
            createElement(
                'div',
                {className: className.rowButtons},
                createElement(PlayButton),
                createElement(DuplicateButton, {id}),
                createElement(DeleteButton, {id}),
            ),
        ),
        createElement(
            'label',
            {
                className: classnames(className.label, className.frameColor),
                htmlFor: `${id}-FrameColor`,
            },
            '枠の色',
            createElement(
                Input,
                {
                    className: className.input,
                    id: `${id}-FrameColor`,
                    type: 'number',
                    min: 0,
                    max: 359,
                    step: 1,
                    defaultValue: message.frameColor,
                    onChange: onChangeFrameColor,
                },
            ),
        ),
        createElement(
            Input,
            {
                className: classnames(className.input, className.frameColor),
                id: `${id}-FrameColorRange`,
                type: 'range',
                min: 0,
                max: 359,
                step: 1,
                defaultValue: message.frameColor,
                onChange: onChangeFrameColor,
            },
        ),
        createElement(NumberInput, {
            title: '速度',
            value: message.speed,
            onChange: useCallback(
                (speed: number) => dispatch(setMessageSpeed({id, speed})),
                [id, dispatch],
            ),
        }),
        createElement(NumberInput, {
            title: '開始位置',
            value: message.from,
            onChange: useCallback(
                (from: number) => dispatch(setMessageFrom({id, from})),
                [id, dispatch],
            ),
        }),
        createElement(NumberInput, {
            title: `開始 (${frameToSec(message.start)}s)`,
            value: message.start,
            onChange: useCallback(
                (start: number) => dispatch(setMessageStart({id, start})),
                [id, dispatch],
            ),
        }),
        createElement(NumberInput, {
            title: `終了 (${frameToSec(message.end)}s)`,
            value: message.end,
            onChange: useCallback(
                (end: number) => dispatch(setMessageEnd({id, end})),
                [id, dispatch],
            ),
        }),
        createElement(NumberInput, {
            title: '幅',
            value: message.width,
            min: 1,
            onChange: useCallback(
                (width: number) => dispatch(setMessageWidth({id, width})),
                [id, dispatch],
            ),
        }),
        createElement(NumberInput, {
            title: '高さ',
            value: message.height,
            min: 1,
            onChange: useCallback(
                (height: number) => dispatch(setMessageHeight({id, height})),
                [id, dispatch],
            ),
        }),
        createElement(NumberInput, {
            title: '左端',
            value: message.x,
            onChange: useCallback(
                (x: number) => dispatch(setMessageX({id, x})),
                [id, dispatch],
            ),
        }),
        createElement(NumberInput, {
            title: '上端',
            value: message.y,
            onChange: useCallback(
                (y: number) => dispatch(setMessageY({id, y})),
                [id, dispatch],
            ),
        }),
    );
};
