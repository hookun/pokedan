import {createTypeChecker} from '../util/createTypeChecker';
import {MessageFragment} from '../types';
import {isArray} from './Array';
import {isMessageFragment} from './MessageFragment';

export const isMessageFragmentArray = createTypeChecker(
    'MessageFragmentArray',
    (
        input: any,
    ): input is Array<MessageFragment> => isArray(input) && input.every(isMessageFragment),
);
