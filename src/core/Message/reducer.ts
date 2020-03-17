import {createReducer, ActionType} from 'typesafe-actions';
import {insertMessage, updateMessage, deleteMessage, initializeMessages} from './action';
import {Message, MessageId} from '../../types';
import {reduceMessages, fillMessage} from '../../util/message';

type SupportedActions =
| typeof insertMessage
| typeof updateMessage
| typeof deleteMessage
| typeof initializeMessages;

export interface MessageState {
    map: Map<MessageId, Message>,
    list: Array<MessageId>,
}

export const reducer = createReducer<MessageState, ActionType<SupportedActions>>({
    map: new Map(),
    list: [],
})
.handleAction(insertMessage, ({map, list}, {payload: {index, message}}) => {
    const insertAt = typeof index === 'number' ? index : list.indexOf(index) + 1;
    const newMessage = fillMessage(message, {id: null});
    return {
        map: new Map([[newMessage.id, newMessage], ...map]),
        list: [
            ...list.slice(0, insertAt),
            newMessage.id,
            ...list.slice(insertAt),
        ],
    };
})
.handleAction(updateMessage, ({list: oldList, map: oldMap}, {payload: patch}) => {
    const {id} = patch;
    const currentMessage = oldMap.get(id);
    const patchedMessage = {...currentMessage, ...patch};
    const newMap = new Map(oldMap);
    newMap.set(patch.id, patchedMessage);
    return {list: oldList.slice(), map: newMap};
})
.handleAction(deleteMessage, ({list: oldList, map: oldMap}, {payload: deletedMessageId}) => {
    const map = new Map(oldMap);
    map.delete(deletedMessageId);
    const list = oldList.filter((id) => id !== deletedMessageId);
    return {map, list};
})
.handleAction(initializeMessages, (_, {payload: messages}) => reduceMessages(messages));
