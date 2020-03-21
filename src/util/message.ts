import {Message, MessageId, MessageFragment} from '../types';
import {generateId} from './generateId';
import {
    DefaultMessageWidth,
    DefaultMessageHeight,
    DefaultMessageX,
    DefaultMessageY,
    DefaultMessageSpeed,
} from '../constants';

export const cloneMessageFragment = ({text, color}: MessageFragment): MessageFragment => ({
    text,
    color,
});

export const fillMessage = (...patches: Array<Partial<Message>>): Message => {
    const messageLike: Partial<Message> = {};
    Object.assign(messageLike, ...patches);
    return {
        id: messageLike.id || generateId<MessageId>(),
        fragments: (messageLike.fragments || []).map(cloneMessageFragment),
        start: messageLike.start ||  0,
        end: messageLike.end || 200,
        from: messageLike.from || 0,
        frameColor: messageLike.frameColor || 0,
        width: messageLike.width || DefaultMessageWidth,
        height: messageLike.height || DefaultMessageHeight,
        x: messageLike.x || DefaultMessageX,
        y: messageLike.y || DefaultMessageY,
        speed: 0 <= messageLike.speed ? messageLike.speed : DefaultMessageSpeed,
    };
};

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

export const fragmentSpan = ({text, color}: MessageFragment): HTMLSpanElement => {
    const spanElement = document.createElement('span');
    spanElement.style.color = color;
    const textNode = document.createTextNode(text);
    spanElement.appendChild(textNode);
    return spanElement;
};

export const parseFragments = function* (fragments: Array<MessageFragment>): Generator<Node> {
    let lineElement = document.createElement('div');
    for (const {text, color} of fragments) {
        const lines = text.split(/[\r\n]+/);
        lineElement.appendChild(fragmentSpan({text: lines[0], color}));
        for (const line of lines.slice(1)) {
            yield lineElement;
            lineElement = document.createElement('div');
            lineElement.appendChild(fragmentSpan({text: line, color}));
        }
    }
    yield lineElement;
};
