import {createTypeChecker} from '../util/createTypeChecker';
import {MessageFragment} from '../types';
import {isDictionary} from './Dictionary';
import {isNonEmptyString} from './NonEmptyString';
import {isTextColor} from './TextColor';

export const isMessageFragment = createTypeChecker(
    'MessageFragment',
    (
        input: any,
    ): input is MessageFragment => isDictionary(input)
    && isNonEmptyString(input.text)
    && isTextColor(input.color),
);
