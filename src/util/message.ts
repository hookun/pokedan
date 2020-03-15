import {Message, MessageId} from '../types';
import {generateId} from './generateId';
import {DefaultColumnCount, DefaultRowCount, DefaultX, DefaultY, DefaultMessageSpeed} from '../constants';

export const fillMessage = (messageLike: Partial<Message>): Message => ({
    id: messageLike.id || generateId<MessageId>(),
    fragments: messageLike.fragments || [],
    start: messageLike.start ||  0,
    end: messageLike.end || 200,
    from: messageLike.from || 0,
    frameColor: messageLike.frameColor || 0,
    col: messageLike.col || DefaultColumnCount,
    row: messageLike.row || DefaultRowCount,
    x: messageLike.x || DefaultX,
    y: messageLike.y || DefaultY,
    speed: 0 <= messageLike.speed ? messageLike.speed : DefaultMessageSpeed,
});

export const reduceMessages = (
    messages: Array<Partial<Message>>,
): {list: Array<MessageId>, map: Map<MessageId, Message>} => {
    const list: Array<MessageId> = [];
    const map = new Map<MessageId, Message>();
    let lastFrame = 0;
    for (const messageLike of messages) {
        const message = fillMessage({
            start: lastFrame,
            end: lastFrame + 200,
            ...messageLike,
        });
        list.push(message.id);
        map.set(message.id, message);
        lastFrame = message.end;
    }
    return {list, map};
};
