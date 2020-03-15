import {createAction} from 'typesafe-actions';
import {Message, MessageId} from '../../types';

export const insertMessage = createAction('insertMessage')<{
    index: number | MessageId,
    message: Partial<Message>,
}>();
export const updateMessage = createAction('updateMessage')<Partial<Message> & {id: MessageId}>();
export const deleteMessage = createAction('deleteMessage')<MessageId>();
export const initializeMessages = createAction('initializeMessages')<Array<Message>>();
