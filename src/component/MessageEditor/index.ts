import {createElement} from 'react';
import {MessageId} from '../../types';
import {useMessage} from '../../use/Message';
import className from './style.css';

export const MessageEditor = (props: {id: MessageId}) => {
    const message = useMessage(props.id);
    return createElement(
        'div',
        {className: className.container},
        JSON.stringify(message, null, 2),
    );
};
