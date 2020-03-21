import {createElement, useMemo, ReactElement, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {Type} from '../Type';
import {ColorFilter} from '../ColorFilter';
import {Frame} from '../Frame';
import {useMessage} from '../../use/Message';
import {generateId} from '../../util/generateId';
import {DefaultFeed} from '../../constants';
import {useMessageMetrics} from '../../use/MessageMetrics';
import {MessageId} from '../../types';
import {selectPlayerFrame, selectPlayerFrameType} from '../../core/Player/selector';

export const MessageWindow = ({id}: {id: MessageId}): ReactElement => {
    const message = useMessage(id);
    const filterId = useMemo(() => `${generateId()}-${message.frameColor}`, [message.frameColor]);
    const feed = DefaultFeed;
    const {width, height, left, top} = useMessageMetrics(message, feed);
    const frame = useSelector(selectPlayerFrame);
    const frameType = useSelector(selectPlayerFrameType);
    const length = message.from + Math.floor(Math.max(0, (frame - message.start) / message.speed));
    const onClick = useCallback(
        () => {
            const editor = document.querySelector(`#Editor-${id}`);
            if (editor) {
                editor.scrollIntoView({behavior: 'smooth', block: 'end'});
            }
        },
        [id],
    );
    return createElement(
        'g',
        {transform: `translate(${left}, ${top})`, onClick},
        createElement(ColorFilter, {color: message.frameColor, id: filterId}),
        createElement(Frame, {width, height, filter: filterId, frameType}),
        createElement(Type, {
            fragments: message.fragments,
            feed,
            g: {transform: 'translate(13, 9)'},
            length,
        }),
    );
};
