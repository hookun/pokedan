import {put} from 'redux-saga/effects';
import {insertMessage} from '../action';
import {TextColor} from '../../../types';
import {generateMessageId} from '../../../util/generateMessageId';
import {DefaultTextColor, FrameColorBlue} from '../../../constants';

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
                    text: '「ここは てんきがいいと\n いつも ',
                    color: DefaultTextColor,
                },
                {
                    text: 'クラブ',
                    color: 'Blue' as unknown as TextColor,
                },
                {
                    text: 'たちが ゆうがたに\n あわを ふくんだけど……',
                    color: DefaultTextColor,
                },
            ],
            duration: 5000,
            frameColor: FrameColorBlue,
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
                    text: '「ゆうひの うみに\n たくさんの あわが かさなって……',
                    color: DefaultTextColor,
                },
            ],
            duration: 5000,
            frameColor: FrameColorBlue,
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
                    text: '「ホント いつみても\n きれいだよなあ。',
                    color: DefaultTextColor,
                },
            ],
            duration: 5000,
            frameColor: FrameColorBlue,
        },
    }));
};
