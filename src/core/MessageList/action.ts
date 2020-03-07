import {createAction} from 'typesafe-actions';
import {createTypeFilter} from '../../util/createTypeFilter';
import {isMessageAndIndex} from '../../is/MessageAndIndex';
import {isPositiveSafeInteger} from '../../is/PositiveSafeInteger';

export const insertMessage = createAction('insertMessage', createTypeFilter(isMessageAndIndex))();

export const updateMessage = createAction('updateMessage', createTypeFilter(isMessageAndIndex))();

export const deleteMessage = createAction('deleteMessage', createTypeFilter(isPositiveSafeInteger))();
