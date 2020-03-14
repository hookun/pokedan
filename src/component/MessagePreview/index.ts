import {createElement, useMemo} from 'react';
import {MessageId} from '../../types';
import {useMessage} from '../../use/Message';
import {Type} from '../Type';
import {Frame} from '../Frame';
import {ColorFilter} from '../ColorFilter';
import {generateId} from '../../util/generateId';

export const MessagePreview = ({id}: {id: MessageId}) => {
    const message = useMessage(id);
    const filterId = useMemo(() => generateId(), [message.frameColor]);
    const width = 240;
    const height = 52;
    return createElement(
        'svg',
        {viewBox: `0 0 ${width} ${height}`},
        createElement(ColorFilter, {color: message.frameColor, id: filterId}),
        createElement(Frame, {width, height, filter: filterId}),
        createElement(Type, {
            fragments: message.fragments,
            feed: [10, 13],
            g: {
                transform: 'translate(13, 9)',
            },
        }),
    );
};
