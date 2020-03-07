import {createTypeChecker} from '../util/createTypeChecker';
import {MessageAndIndex} from '../types';
import {isDictionary} from './Dictionary';
import {isPositiveSafeInteger} from './PositiveSafeInteger';
import {isMessage} from './Message';

export const isMessageAndIndex = createTypeChecker(
    'MessageAndIndex',
    (
        input: any,
    ): input is MessageAndIndex => isDictionary(input)
    && isMessage(input.message)
    && isPositiveSafeInteger(input.index),
);
