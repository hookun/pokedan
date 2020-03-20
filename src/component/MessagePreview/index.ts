import {createElement, useMemo, ReactElement} from 'react';
import {MessageId} from '../../types';
import {useMessage} from '../../use/Message';
import {Type} from '../Type';
import {Frame} from '../Frame';
import {ColorFilter} from '../ColorFilter';
import {generateId} from '../../util/generateId';
import {useMessageMetrics} from '../../use/MessageMetrics';
import {DefaultFeed} from '../../constants';

export const MessagePreview = ({id}: {id: MessageId}): ReactElement => {
    const message = useMessage(id);
    const filterId = useMemo(() => `${generateId()}-${message.frameColor}`, [message.frameColor]);
    const feed = DefaultFeed;
    const {width, height} = useMessageMetrics(message, feed);
    return createElement(
        'svg',
        {viewBox: `0 0 ${width} ${height}`},
        createElement(ColorFilter, {color: message.frameColor, id: filterId}),
        createElement(Frame, {width, height, filter: filterId}),
        createElement(Type, {
            fragments: message.fragments,
            feed,
            g: {transform: 'translate(13, 9)'},
        }),
    );
};
