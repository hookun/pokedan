import {put} from 'redux-saga/effects';
import {insertMessage} from '../action';
import {TextColor} from '../../../types';
import {generateMessageId} from '../../../util/generateMessageId';
import {DefaultTextColor} from '../../../constants';

export const onRestart = function* () {
    yield put(insertMessage({
        index: 0,
        message: {
            id: generateMessageId(),
            fragments: [
                {
                    text: 'ピカチュウ',
                    color: 'Yellow' as unknown as TextColor,
                },
                {
                    text: '「ここは　てんきがいいと\nいつも　',
                    color: DefaultTextColor,
                },
                {
                    text: 'クラブ',
                    color: 'Blue' as unknown as TextColor,
                },
                {
                    text: 'たちが　ゆうがたに\nあわを　ふくんだけど……',
                    color: DefaultTextColor,
                },
            ],
            duration: 5000,
        },
    }));
    yield put(insertMessage({
        index: 1,
        message: {
            id: generateMessageId(),
            fragments: [
                {
                    text: 'ピカチュウ',
                    color: 'Yellow' as unknown as TextColor,
                },
                {
                    text: '「ゆうひの　うみに\nたくさんの　あわが　かさなって……',
                    color: DefaultTextColor,
                },
            ],
            duration: 5000,
        },
    }));
    yield put(insertMessage({
        index: 2,
        message: {
            id: generateMessageId(),
            fragments: [
                {
                    text: 'ピカチュウ',
                    color: 'Yellow' as unknown as TextColor,
                },
                {
                    text: '「ホント　いつみても\nきれいだよなあ。',
                    color: DefaultTextColor,
                },
            ],
            duration: 5000,
        },
    }));
};
