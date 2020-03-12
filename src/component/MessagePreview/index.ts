import {createElement} from 'react';
import {MessageId} from '../../types';
import {useMessage} from '../../use/Message';
import {Type} from '../Type';
import className from './style.css';
import {Frame} from '../Frame';

export const MessagePreview = ({id}: {id: MessageId}) => {
    const message = useMessage(id);
    const width = 240;
    const height = 52;
    return createElement(
        'svg',
        {
            className: className.container,
            viewBox: `0 0 ${width} ${height}`,
        },
        createElement(Frame, {width, height}),
        createElement(Type, {
            fragments: message.fragments,
            feed: [10, 13],
            g: {
                transform: 'translate(13, 9)',
            },
        }),
    );
};
