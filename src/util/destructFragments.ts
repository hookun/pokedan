import {MessageFragment} from '../types';

export const destructFragments = function* (
    fragments: Array<MessageFragment>,
): Generator<MessageFragment> {
    for (const {text, color} of fragments) {
        for (const character of text) {
            yield {text: character, color};
        }
    }
};
