import {createReducer, ActionType} from 'typesafe-actions';
import {insertMessage, updateMessage, deleteMessage} from './action';
import {Message} from '../../types';
import {DefaultMessageList} from '../../constants';

type SupportedActions =
| typeof insertMessage
| typeof updateMessage
| typeof deleteMessage;

export type MessageList = Array<Message>;

export const reducer = createReducer<MessageList, ActionType<SupportedActions>>(DefaultMessageList)
.handleAction(
    insertMessage,
    (list, {payload: {index, message}}) => [
        ...list.slice(0, index),
        message,
        ...list.slice(index),
    ],
)
.handleAction(
    updateMessage,
    (list, {payload: {index, message}}) => [
        ...list.slice(0, index),
        message,
        ...list.slice(index + 1),
    ],
)
.handleAction(
    deleteMessage,
    (list, {payload: index}) => [
        ...list.slice(0, index),
        ...list.slice(index + 1),
    ],
);
