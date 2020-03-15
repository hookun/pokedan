import {put, takeEvery, call, select, debounce, all, take, cancel, delay, fork} from 'redux-saga/effects';
import {Task} from 'redux-saga';
import {getType, ActionType} from 'typesafe-actions';
import {Message, MessageId} from '../types';
import {restart} from './action';
import {setFile, initializePlayer, setPause} from './Player/action';
import {updateMessage, initializeMessages, deleteMessage, insertMessage} from './Message/action';
import {selectMessageMap, selectMessageList} from './Message/selector';
import {selectPlayerFile, selectPlayer} from './Player/selector';
import {Player} from './Player/reducer';
import {readDB, writeDB, Stores, deleteDB} from '../util/db';
import {textColors} from '../constants';

const playerKey = (file: string): string => `${file}/Player`;
const messageListKey = (file: string): string => `${file}/Messages`;
const lastFileKey = 'LastFile';

export const onRestart = function* () {
    let file: string | undefined = yield call(readDB, Stores.Root, lastFileKey);
    if (!file) {
        file = yield select(selectPlayerFile);
        const [map, messageList, player]: [
            Map<MessageId, Message>,
            Array<MessageId>,
            Player,
        ] = yield all([
            select(selectMessageMap),
            select(selectMessageList),
            select(selectPlayer),
        ]);
        yield all([
            call(writeDB, Stores.Root, playerKey(file), player),
            call(writeDB, Stores.Root, messageListKey(file), messageList),
            ...messageList.map((id) => call(writeDB, Stores.Message, id, map.get(id))),
        ]);
    }
    yield put(setFile(file));
};

export const onUpdateFile = function* ({payload: file}: ActionType<typeof setFile>) {
    const [player, messageList]: [
        Player | undefined,
        Array<MessageId> | undefined
    ] = yield all([
        call(readDB, Stores.Root, playerKey(file)),
        call(readDB, Stores.Root, messageListKey(file)),
        call(writeDB, Stores.Root, lastFileKey, file),
    ]);
    if (messageList) {
        const messages: Array<Message> = yield all(messageList.map((id) => call(readDB, Stores.Message, id)));
        yield put(initializeMessages(messages));
    }
    if (player) {
        yield put(initializePlayer(player));
        yield put(setPause(false));
    }
};

export const saveMessageToDB = function* (id: MessageId) {
    const map: Map<MessageId, Message> = yield select(selectMessageMap);
    const message = map.get(id);
    yield call(writeDB, Stores.Message, id, message);
};

export const checkEmpty = function* () {
    const list: Array<MessageId> = yield select(selectMessageList);
    if (list.length === 0) {
        yield put(insertMessage({
            index: 0,
            message: {
                fragments: [{text: 'あたらしいメッセージ', color: textColors[0]}],
                start: 0,
                end: 120,
            },
        }));
    }
};

export const saveMessageList = function* () {
    const [file, messageList]: [string, Array<MessageId>] = yield all([
        select(selectPlayerFile),
        select(selectMessageList),
    ]);
    const oldList: Array<MessageId> = yield call(readDB, Stores.Root, messageListKey(file));
    const newMessageId = new Set(messageList);
    for (const messageId of oldList) {
        newMessageId.delete(messageId);
    }
    yield all([
        call(writeDB, Stores.Root, messageListKey(file), messageList),
        ...[...newMessageId].map((id) => call(saveMessageToDB, id)),
    ]);
};

export const savePlayerData = function* () {
    const [file, player]: [string, Player] = yield all([
        select(selectPlayerFile),
        select(selectPlayer),
    ]);
    yield call(writeDB, Stores.Root, playerKey(file), player);
}

export const deleteMessageFromDB = function* ({payload: id}: ActionType<typeof deleteMessage>) {
    console.log({delete: id});
    yield call(deleteDB, Stores.Message, id);
};

export const saveMessageAfterDelay = function* (id: MessageId, delayInMs: number) {
    yield delay(delayInMs);
    yield* saveMessageToDB(id);
};

export const saveMessage = function* (delayInMs: number) {
    const tasks = new Map<MessageId, Task>();
    while (1) {
        const {payload: {id}}: ActionType<typeof updateMessage> = yield take(getType(updateMessage));
        const previousTask: Task = tasks.get(id);
        if (previousTask) {
            yield cancel(previousTask);
        }
        const task: Task = yield fork(saveMessageAfterDelay, id, delayInMs);
        tasks.set(id, task);
    }
};

export const list = () => [
    takeEvery(getType(restart), onRestart),
    takeEvery(getType(setFile), onUpdateFile),
    saveMessage(400),
    takeEvery(
        [
            getType(deleteMessage),
            getType(initializeMessages),
        ],
        checkEmpty,
    ),
    takeEvery(getType(deleteMessage), deleteMessageFromDB),
    debounce(
        400,
        [
            getType(initializeMessages),
            getType(insertMessage),
            getType(deleteMessage),
            getType(updateMessage),
        ],
        saveMessageList,
    ),
    debounce(
        400,
        [
            getType(initializePlayer),
            getType(insertMessage),
            getType(deleteMessage),
            getType(updateMessage),
        ],
        savePlayerData,
    ),
    // takeEvery('*', (action: {}) => {
    //     console.log(action);
    // }),
];
