import {createElement, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Type} from '../Type';
import {ColorFilter} from '../ColorFilter';
import {Frame} from '../Frame';
import {useMessage} from '../../use/Message';
import {generateId} from '../../util/generateId';
import {DefaultFeed} from '../../constants';
import {useMessageMetrics} from '../../use/MessageMetrics';
import {MessageId} from '../../types';
import {selectPlayerCurrentFrame} from '../../core/Player/selector';

export const MessageWindow = ({id}: {id: MessageId}) => {
    const message = useMessage(id);
    const filterId = useMemo(() => generateId(), [message.frameColor]);
    const feed = DefaultFeed;
    const {width, height, left, top} = useMessageMetrics(message, feed);
    const frame = useSelector(selectPlayerCurrentFrame);
    const length = useMemo(() => {
        return Math.floor(Math.max(0, (frame - message.start) / message.speed));
    }, [message, frame]);
    return createElement(
        'g',
        {transform: `translate(${left}, ${top})`},
        createElement(ColorFilter, {color: message.frameColor, id: filterId}),
        createElement(Frame, {width, height, filter: filterId}),
        createElement(Type, {
            fragments: message.fragments,
            feed,
            g: {transform: 'translate(13, 9)'},
            length,
        }),
    );
};
