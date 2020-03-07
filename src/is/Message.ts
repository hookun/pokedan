import {createTypeChecker} from '../util/createTypeChecker';
import {Message} from '../types';
import {isDictionary} from './Dictionary';
import {isMessageFragmentArray} from './MessageFragmentArray';
import {isPositiveSafeInteger} from './PositiveSafeInteger';

export const isMessage = createTypeChecker(
    'Message',
    (
        input: any,
    ): input is Message => isDictionary(input)
    && isMessageFragmentArray(input.fragments)
    && isPositiveSafeInteger(input.duration),
);
