import {createElement, Fragment} from 'react';
import className from './style.css';
import {useMessage} from '../../use/Message';
import {MessageId} from '../../types';
import {useDispatch} from 'react-redux';
import {updateMessage} from '../../core/Message/action';

export const MessageControl = (
    {id}: {id: MessageId},
) => {
    const message = useMessage(id);
    const dispatch = useDispatch();
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
                    onChange: (event) => {
                        dispatch(updateMessage({
                            id,
                            frameColor: Number(event.currentTarget.value),
                        }));
                    },
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
                onChange: (event) => {
                    dispatch(updateMessage({
                        id,
                        frameColor: Number(event.currentTarget.value),
                    }));
                },
            },
        ),
        createElement(
            'label',
            {
                className: className.label,
                htmlFor: `${id}-Duration`,
                title: '継続時間 (ms)',
            },
        ),
        createElement(
            'input',
            {
                className: className.input,
                id: `${id}-Duration`,
                type: 'number',
                min: 0,
                step: 1,
                value: message.duration,
                onChange: (event) => {
                    dispatch(updateMessage({
                        id,
                        duration: Number(event.currentTarget.value),
                    }));
                },
            },
        ),
    );
};
