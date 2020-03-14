import {put} from 'redux-saga/effects';
import {insertMessage} from '../action';
import {MessageId} from '../../../types';
import {generateId} from '../../../util/generateId';
import {textColors} from '../../../constants';

export const onRestart = function* () {
    yield put(insertMessage({
        index: 0,
        message: {
            id: generateId<MessageId>(),
            fragments: [
                {
                    text: 'ピカチュウ',
                    color: textColors[2],
                },
                {
                    text: '「ここは てんきがいいと\n いつも ',
                    color: textColors[0],
                },
                {
                    text: 'クラブ',
                    color: textColors[1],
                },
                {
                    text: 'たちが ゆうがたに\n あわを ふくんだけど……',
                    color: textColors[0],
                },
            ],
            duration: 5000,
            frameColor: 0,
        },
    }));
    yield put(insertMessage({
        index: 1,
        message: {
            id: generateId<MessageId>(),
            fragments: [
                {
                    text: 'ピカチュウ',
                    color: textColors[2],
                },
                {
                    text: '「ゆうひの うみに\n たくさんの あわが かさなって……',
                    color: textColors[0],
                },
            ],
            duration: 5000,
            frameColor: 120,
        },
    }));
    yield put(insertMessage({
        index: 2,
        message: {
            id: generateId<MessageId>(),
            fragments: [
                {
                    text: 'ピカチュウ',
                    color: textColors[2],
                },
                {
                    text: '「ホント いつみても\n きれいだよなあ。',
                    color: textColors[0],
                },
            ],
            duration: 5000,
            frameColor: 240,
        },
    }));
    yield put(insertMessage({
        index: 3,
        message: {
            id: generateId<MessageId>(),
            fragments: [
                {
                    text: '（……でも　どうしてだろう？\n　なにも　おもいだせない……。）',
                    color: textColors[0],
                },
            ],
            duration: 5000,
            frameColor: 240,
        },
    }));
};
