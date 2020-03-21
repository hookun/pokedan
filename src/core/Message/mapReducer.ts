import {createReducer, ActionType} from 'typesafe-actions';
import {
    insertMessageFromSaga,
    deleteMessage,
    initializeMessages,
    setMessageFragments,
    setMessageStart,
    setMessageEnd,
    setMessageFrom,
    setMessageFrameColor,
    setMessageWidth,
    setMessageHeight,
    setMessageX,
    setMessageY,
    setMessageSpeed,
} from './action';
import {Message, MessageId} from '../../types';

export const PatchMessageActions = [
    setMessageStart,
    setMessageEnd,
    setMessageFrom,
    setMessageFrameColor,
    setMessageWidth,
    setMessageHeight,
    setMessageX,
    setMessageY,
    setMessageSpeed,
    setMessageFragments,
];

export type PatchMessageActions =
| typeof setMessageStart
| typeof setMessageEnd
| typeof setMessageFrom
| typeof setMessageFrameColor
| typeof setMessageWidth
| typeof setMessageHeight
| typeof setMessageX
| typeof setMessageY
| typeof setMessageSpeed
| typeof setMessageFragments;

export const MessageMapActions = [
    initializeMessages,
    insertMessageFromSaga,
    deleteMessage,
    ...PatchMessageActions,
];

export type MessageMapActions =
| typeof insertMessageFromSaga
| typeof deleteMessage
| typeof initializeMessages
| PatchMessageActions;

export const mapReducer = createReducer<Map<MessageId, Message>, ActionType<MessageMapActions>>(new Map())
.handleAction(insertMessageFromSaga, (map, {payload: {message}}) => {
    const newMap = new Map(map);
    newMap.set(message.id, message);
    return newMap;
})
.handleAction(deleteMessage, (map, {payload: deleted}) => {
    const newMap = new Map(map);
    newMap.delete(deleted);
    return newMap;
})
.handleAction(initializeMessages, (_, {payload: messages}) => {
    const newMap = new Map<MessageId, Message>();
    for (const message of messages) {
        newMap.set(message.id, message);
    }
    return newMap;
})
.handleAction(setMessageStart, (map, {payload: {id, start}}) => {
    const message = map.get(id);
    if (message.start === start) {
        return map;
    }
    const newMap = new Map(map);
    newMap.set(id, {...message, start});
    return newMap;
})
.handleAction(setMessageEnd, (map, {payload: {id, end}}) => {
    const message = map.get(id);
    if (message.end === end) {
        return map;
    }
    const newMap = new Map(map);
    newMap.set(id, {...message, end});
    return newMap;
})
.handleAction(setMessageFrom, (map, {payload: {id, from}}) => {
    const message = map.get(id);
    if (message.from === from) {
        return map;
    }
    const newMap = new Map(map);
    newMap.set(id, {...message, from});
    return newMap;
})
.handleAction(setMessageFrameColor, (map, {payload: {id, frameColor}}) => {
    const message = map.get(id);
    if (message.frameColor === frameColor) {
        return map;
    }
    const newMap = new Map(map);
    newMap.set(id, {...message, frameColor});
    return newMap;
})
.handleAction(setMessageWidth, (map, {payload: {id, width}}) => {
    const message = map.get(id);
    if (message.width === width) {
        return map;
    }
    const newMap = new Map(map);
    newMap.set(id, {...message, width});
    return newMap;
})
.handleAction(setMessageHeight, (map, {payload: {id, height}}) => {
    const message = map.get(id);
    if (message.height === height) {
        return map;
    }
    const newMap = new Map(map);
    newMap.set(id, {...message, height});
    return newMap;
})
.handleAction(setMessageX, (map, {payload: {id, x}}) => {
    const message = map.get(id);
    if (message.x === x) {
        return map;
    }
    const newMap = new Map(map);
    newMap.set(id, {...message, x});
    return newMap;
})
.handleAction(setMessageY, (map, {payload: {id, y}}) => {
    const message = map.get(id);
    if (message.y === y) {
        return map;
    }
    const newMap = new Map(map);
    newMap.set(id, {...message, y});
    return newMap;
})
.handleAction(setMessageSpeed, (map, {payload: {id, speed}}) => {
    const message = map.get(id);
    if (message.speed === speed) {
        return map;
    }
    const newMap = new Map(map);
    newMap.set(id, {...message, speed});
    return newMap;
})
.handleAction(setMessageFragments, (map, {payload: {id, fragments}}) => {
    const message = map.get(id);
    const unchanged = message.fragments.every((fragment, index) => {
        const newFragment = fragments[index];
        return fragment.text === newFragment.text && fragment.color === newFragment.color;
    });
    if (unchanged) {
        return map;
    }
    const newMap = new Map(map);
    newMap.set(id, {...message, fragments});
    return newMap;
});
