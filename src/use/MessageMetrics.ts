import {Message} from '../types';

export const useMessageMetrics = (message: Message, feed: [number, number]) => {
    const left = message.x;
    const top = message.y;
    const width = 25 + message.col * feed[0];
    const height = 13 + message.row * feed[1];
    return {
        left,
        right: left + width,
        top,
        bottom: top + height,
        width,
        height,
    };
};
