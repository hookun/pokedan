import {MessageFragment, Printee} from '../types';
import {destructFragments} from './destructFragments';

const leftMargin = {
    'し': -1,
    '（': -2,
    '）': -2,
    '?': -2,
    '？': -2,
};

const rightMargin = {
    'し': -1,
    'も': -1,
    '…': -1,
    '（': -2,
    '）': -2,
    '。': -3,
    '、': -3,
};

export const printFragments = function* (
    fragments: Array<MessageFragment>,
    [characterfeed, lineFeed]: [number, number],
): Generator<Printee> {
    let x = 0;
    let y = 0;
    for (const {text: character, color} of destructFragments(fragments)) {
        switch (character) {
            case '\n':
            case '\r':
                y += lineFeed;
                x = 0;
                break;
            case ' ':
            case '　':
                x += characterfeed / 2;
                break;
            default:
                x += leftMargin[character] || 0;
                yield {character, color, x, y};
                x += characterfeed + (rightMargin[character] || 0);
        }
    }
};
