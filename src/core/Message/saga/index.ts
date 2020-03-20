import {takeEvery, select, put} from 'redux-saga/effects';
import {getType, ActionType} from 'typesafe-actions';
import {insertMessage, insertMessageFromSaga} from '../action';
import {fillMessage} from '../../../util/message';
import {generateId} from '../../../util/generateId';
import {selectMessageList} from '../selector';
import {MessageId} from '../../../types';

const findIndexToInsert = function* (id: MessageId) {
    const list: Array<MessageId> = yield select(selectMessageList);
    return list.indexOf(id);
};

const insertFilledMessage = function* (
    {
        payload: {
            index: indexOrId,
            message: messageLike,
        },
    }: ActionType<typeof insertMessage>,
) {
    const message = fillMessage(messageLike, {id: generateId()});
    if (typeof indexOrId === 'number') {
        yield put(insertMessageFromSaga({
            index: indexOrId,
            message,
        }));
    } else {
        const index: number = yield* findIndexToInsert(indexOrId);
        yield put(insertMessageFromSaga({index, message}));
    }
};

export const list = () => [
    takeEvery(getType(insertMessage), insertFilledMessage),
];
