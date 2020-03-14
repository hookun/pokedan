import {createElement, Fragment, useCallback, ChangeEvent} from 'react';
import className from './style.css';
import {useMessage} from '../../use/Message';
import {MessageId} from '../../types';
import {useDispatch} from 'react-redux';
import {updateMessage} from '../../core/Message/action';
import {NumberInput} from '../NumberInput';

export const MessageControl = (
    {id}: {id: MessageId},
) => {
    const message = useMessage(id);
    const dispatch = useDispatch();
    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const frameColor = Number(event.currentTarget.value);
        dispatch(updateMessage({id, frameColor}));
    }, [id, dispatch]);
    return createElement(
        Fragment,
        null,
        createElement(
            'label',
            {
                className: className.label,
                htmlFor: `${id}-FrameColor`,
                title: '枠の色',
            },
            createElement(
                'input',
                {
                    className: className.input,
                    id: `${id}-FrameColor`,
                    type: 'number',
                    min: 0,
                    max: 359,
                    step: 1,
                    value: message.frameColor,
                    onChange,
                },
            ),
        ),
        createElement(
            'input',
            {
                className: className.input,
                id: `${id}-FrameColorRange`,
                type: 'range',
                min: 0,
                max: 359,
                step: 1,
                value: message.frameColor,
                onChange,
            },
        ),
        createElement(NumberInput, {
            title: '1文字あたりのフレーム数（0で即時表示）',
            value: message.speed,
            onChange: (start) => dispatch(updateMessage({id, start})),
        }),
        createElement(NumberInput, {
            title: '開始フレーム',
            value: message.start,
            onChange: (start) => dispatch(updateMessage({id, start})),
        }),
        createElement(NumberInput, {
            title: '終了フレーム',
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
            title: '1行の文字数',
            value: message.col,
            min: 1,
            step: 0.5,
            onChange: (col) => dispatch(updateMessage({id, col})),
        }),
        createElement(NumberInput, {
            title: '左端からの距離',
            value: message.x,
            onChange: (x) => dispatch(updateMessage({id, x})),
        }),
        createElement(NumberInput, {
            title: '上端からの距離',
            value: message.y,
            onChange: (y) => dispatch(updateMessage({id, y})),
        }),
    );
};
