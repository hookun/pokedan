import {createAction} from 'typesafe-actions';
import {Message, MessageId, MessageFragment} from '../../types';

export const insertMessage = createAction('insertMessage')<{
    index: number | MessageId,
    message: Partial<Message>,
}>();
export const insertMessageFromSaga = createAction('insertMessageFromSaga')<{
    index: number,
    message: Message,
}>();
export const deleteMessage = createAction('deleteMessage')<MessageId>();
export const initializeMessages = createAction('initializeMessages')<Array<Message>>();
export const setMessageFragments = createAction('setMessageFragments')<{
    id: MessageId,
    fragments: Array<MessageFragment>,
}>();
export const setMessageStart = createAction('setMessageStart')<{
    id: MessageId,
    start: number,
}>();
export const setMessageEnd = createAction('setMessageEnd')<{
    id: MessageId,
    end: number,
}>();
export const setMessageFrom = createAction('setMessageFrom')<{
    id: MessageId,
    from: number,
}>();
export const setMessageFrameColor = createAction('setMessageFrameColor')<{
    id: MessageId,
    frameColor: number,
}>();
export const setMessageWidth = createAction('setMessageWidth')<{
    id: MessageId,
    width: number,
}>();
export const setMessageHeight = createAction('setMessageHeight')<{
    id: MessageId,
    height: number,
}>();
export const setMessageX = createAction('setMessageX')<{
    id: MessageId,
    x: number,
}>();
export const setMessageY = createAction('setMessageY')<{
    id: MessageId,
    y: number,
}>();
export const setMessageSpeed = createAction('setMessageSpeed')<{
    id: MessageId,
    speed: number,
}>();
