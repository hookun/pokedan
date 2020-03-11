import {createAction} from 'typesafe-actions';
import {MessageAndIndex, Message} from '../../types';

export const insertMessage = createAction('insertMessage')<MessageAndIndex>();

export const updateMessage = createAction('updateMessage')<Message>();

export const deleteMessage = createAction('deleteMessage')<number>();
