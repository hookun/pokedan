import {createAction} from 'typesafe-actions';
import {MessageAndIndex, Message, MessageId} from '../../types';

export const insertMessage = createAction('insertMessage')<MessageAndIndex>();

export const updateMessage = createAction('updateMessage')<Partial<Message> & {id: MessageId}>();

export const deleteMessage = createAction('deleteMessage')<number>();
