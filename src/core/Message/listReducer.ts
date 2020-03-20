import {createReducer, ActionType} from 'typesafe-actions';
import {
    insertMessageFromSaga,
    deleteMessage,
    initializeMessages,
} from './action';
import {MessageId} from '../../types';

export const MessageListActions = [
    insertMessageFromSaga,
    deleteMessage,
    initializeMessages,
];

export type MessageListActions =
| typeof insertMessageFromSaga
| typeof deleteMessage
| typeof initializeMessages;

export const listReducer = createReducer<Array<MessageId>, ActionType<MessageListActions>>([])
.handleAction(insertMessageFromSaga, (list, {payload: {index, message: {id}}}) => {
    return [...list.slice(0, index), id, ...list.slice(index)];
})
.handleAction(deleteMessage, (list, {payload: deleted}) => list.filter((id) => id !== deleted))
.handleAction(initializeMessages, (_, {payload: messages}) => messages.map(({id}) => id));
