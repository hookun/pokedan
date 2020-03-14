import {put} from 'redux-saga/effects';
import {insertMessage} from '../action';
import {MessageId} from '../../../types';
import {generateId} from '../../../util/generateId';
import {textColors, DefaultColumnCount, DefaultRowCount, DefaultX, DefaultY, DefaultMessageSpeed} from '../../../constants';

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
            start: 0,
            end: 180,
            frameColor: 0,
            col: DefaultColumnCount,
            row: DefaultRowCount,
            x: DefaultX,
            y: DefaultY,
            speed: DefaultMessageSpeed,
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
            start: 180,
            end: 360,
            frameColor: 120,
            col: DefaultColumnCount,
            row: DefaultRowCount,
            x: DefaultX,
            y: DefaultY,
            speed: DefaultMessageSpeed,
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
            start: 360,
            end: 540,
            frameColor: 240,
            col: DefaultColumnCount,
            row: DefaultRowCount,
            x: DefaultX,
            y: DefaultY,
            speed: DefaultMessageSpeed,
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
            start: 540,
            end: 720,
            frameColor: 240,
            col: DefaultColumnCount,
            row: DefaultRowCount,
            x: DefaultX,
            y: DefaultY,
            speed: DefaultMessageSpeed,
        },
    }));
};
