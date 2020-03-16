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
.handleAction(insertMessage, ({map, list}, {payload}) => {
    const index = typeof payload.index === 'number' ? payload.index : list.indexOf(payload.index) + 1;
    const message = fillMessage({...payload.message, id: null});
    return {
        map: new Map([[message.id, message], ...map]),
        list: [
            ...list.slice(0, index),
            message.id,
            ...list.slice(index),
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
