import {createElement} from 'react';
import {classnames} from '../../util/classnames';
import {MessageId} from '../../types';
import {MessagePreview} from '../MessagePreview';
import {useSelector} from 'react-redux';
import {selectCurrentMessageId} from '../../core/selector';
import {MessageControl} from '../MessageControl';
import className from './style.css';
import {MessageTextEditor} from '../MessageTextEditor';

export const MessageEditor = ({id}: {id: MessageId}) => {
    const currentMessageId = useSelector(selectCurrentMessageId);
    return createElement(
        'div',
        {
            className: classnames(
                className.container,
                currentMessageId === id && className.current,
            ),
        },
        createElement(MessagePreview, {id}),
        createElement(MessageControl, {id}),
        createElement(MessageTextEditor, {
            id,
            className: className.text,
        }),
    );
};
