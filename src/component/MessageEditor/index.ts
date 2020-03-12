import {createElement} from 'react';
import {MessageId} from '../../types';
import className from './style.css';
import {MessagePreview} from '../MessagePreview';
import {useSelector} from 'react-redux';
import {selectCurrentMessageId} from '../../core/selector';
import {classnames} from '../../util/classnames';

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
    );
};
