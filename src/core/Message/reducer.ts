import {createReducer, ActionType} from 'typesafe-actions';
import {insertMessage, updateMessage, deleteMessage} from './action';
import {Message, MessageId} from '../../types';

type SupportedActions =
| typeof insertMessage
| typeof updateMessage
| typeof deleteMessage;

export interface MessageState {
    map: Map<MessageId, Message>,
    list: Array<MessageId>,
}

export const reducer = createReducer<MessageState, ActionType<SupportedActions>>({
    map: new Map(),
    list: [],
})
.handleAction(
    insertMessage,
    (state, {payload: {index, message}}) => ({
        ...state,
        map: new Map([
            [message.id, message],
            ...state.map,
        ]),
        list: [
            ...state.list.slice(0, index),
            message.id,
            ...state.list.slice(index + 1),
        ],
    }),
)
.handleAction(
    updateMessage,
    (state, {payload: patch}) => {
        const map = new Map(state.map);
        map.set(patch.id, {...map.get(patch.id), ...patch});
        return {...state, map};
    },
)
.handleAction(
    deleteMessage,
    (state, {payload: index}) => {
        const map = new Map(state.map);
        const deleted = map.get(state.list[index]);
        map.delete(deleted.id);
        return {...state, map};
    },
);
