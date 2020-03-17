import {createElement, Fragment, useCallback, ChangeEvent, ReactElement} from 'react';
import className from './style.css';
import {useMessage} from '../../use/Message';
import {MessageId} from '../../types';
import {useDispatch, useSelector} from 'react-redux';
import {updateMessage, deleteMessage, insertMessage} from '../../core/Message/action';
import {NumberInput} from '../NumberInput';
import {setFrame, setPause} from '../../core/Player/action';
import {classnames} from '../../util/classnames';
import {frameToSec} from '../../util/frameToSec';
import {Input} from '../Input';
import {selectPlayerPaused} from '../../core/Player/selector';

export const MessageControl = (
    {id}: {id: MessageId},
): ReactElement => {
    const message = useMessage(id);
    const paused = useSelector(selectPlayerPaused);
    const dispatch = useDispatch();
    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const frameColor = Number(event.currentTarget.value);
        dispatch(updateMessage({id, frameColor}));
    }, [id, dispatch]);
    const duration = message.end - message.start;
    return createElement(
        Fragment,
        null,
        createElement(
            'div',
            {className: className.buttons},
            createElement(
                'button',
                {
                    className: className.button,
                    onClick: () => {
                        dispatch(setPause(true));
                        dispatch(setFrame(message.start));
                        if (!paused) {
                            dispatch(setPause(false));
                        }
                    },
                },
                'ここに\n移動',
            ),
            createElement('div', null, '長さ'),
            createElement('div', null, `${duration}f (${frameToSec(duration)}s)`),
            createElement(
                'div',
                {className: className.rowButtons},
                createElement(
                    'button',
                    {
                        className: className.button,
                        onClick: () => dispatch(setPause(!paused)),
                    },
                    paused ? '再生' : '停止',
                ),
                createElement(
                    'button',
                    {
                        className: className.button,
                        onClick: () => dispatch(insertMessage({
                            index: id,
                            message: {
                                ...message,
                                start: message.end,
                                end: message.end + duration,
                            },
                        })),
                    },
                    '複製',
                ),
                createElement(
                    'button',
                    {
                        className: classnames(className.button, className.delete),
                        onClick: () => {
                            if (confirm('このメッセージを削除します')) {
                                dispatch(deleteMessage(id));
                            }
                        },
                    },
                    '削除',
                ),
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
                    onChange,
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
                onChange,
            },
        ),
        createElement(NumberInput, {
            title: '速度',
            value: message.speed,
            onChange: (speed) => dispatch(updateMessage({id, speed})),
        }),
        createElement(NumberInput, {
            title: '開始位置',
            value: message.from,
            onChange: (from) => dispatch(updateMessage({id, from})),
        }),
        createElement(NumberInput, {
            title: `開始 (${frameToSec(message.start)}s)`,
            value: message.start,
            onChange: (start) => dispatch(updateMessage({id, start})),
        }),
        createElement(NumberInput, {
            title: `終了 (${frameToSec(message.end)}s)`,
            value: message.end,
            onChange: (end) => dispatch(updateMessage({id, end})),
        }),
        createElement(NumberInput, {
            title: '行数',
            value: message.row,
            min: 1,
            onChange: (row) => dispatch(updateMessage({id, row})),
        }),
        createElement(NumberInput, {
            title: '文字/行',
            value: message.col,
            min: 1,
            step: 0.5,
            onChange: (col) => dispatch(updateMessage({id, col})),
        }),
        createElement(NumberInput, {
            title: '左端',
            value: message.x,
            onChange: (x) => dispatch(updateMessage({id, x})),
        }),
        createElement(NumberInput, {
            title: '上端',
            value: message.y,
            onChange: (y) => dispatch(updateMessage({id, y})),
        }),
    );
};
