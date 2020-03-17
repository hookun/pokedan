import {Message} from '../types';
import {useFrame} from './Frame';
import {useSelector} from 'react-redux';
import {selectPlayerFrameType} from '../core/Player/selector';

export interface MessageMetrics {
    left: number,
    right: number,
    top: number,
    bottom: number,
    width: number,
    height: number,
}

export const useMessageMetrics = (
    message: Message,
    feed: [number, number],
): MessageMetrics => {
    const frameType = useSelector(selectPlayerFrameType);
    const {TopRight, BottomRight} = useFrame(frameType);
    const left = message.x;
    const top = message.y;
    const width = TopRight.width * 2 + message.col * feed[0];
    const height = TopRight.height + BottomRight.height + 1 + message.row * feed[1];
    return {
        left,
        right: left + width,
        top,
        bottom: top + height,
        width,
        height,
    };
};
