import {createElement, useMemo, ReactElement} from 'react';
import {useSelector} from 'react-redux';
import {MessageId} from '../../types';
import {useMessage} from '../../use/Message';
import {Type} from '../Type';
import {Frame} from '../Frame';
import {ColorFilter} from '../ColorFilter';
import {generateId} from '../../util/generateId';
import {DefaultFeed} from '../../constants';
import {selectPlayerFrameType} from '../../core/Player/selector';

export const MessagePreview = ({id}: {id: MessageId}): ReactElement => {
    const frameType = useSelector(selectPlayerFrameType);
    const message = useMessage(id);
    const filterId = useMemo(() => `${generateId()}-${message.frameColor}`, [message.frameColor]);
    const feed = DefaultFeed;
    const {width, height} = message;
    return createElement(
        'svg',
        {viewBox: `0 0 ${width} ${height}`},
        createElement(ColorFilter, {color: message.frameColor, id: filterId}),
        createElement(Frame, {width, height, filter: filterId, frameType}),
        createElement(Type, {
            fragments: message.fragments,
            feed,
            g: {transform: 'translate(13, 9)'},
        }),
    );
};
