import {MessageFragment, Printee} from '../types';
import {destructFragments} from './destructFragments';

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
                yield {character, color, x, y};
                x += characterfeed;
        }
    }
};
