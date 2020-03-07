import {createTypeChecker} from '../util/createTypeChecker';

export const isDictionary = createTypeChecker(
    'Dictionary',
    (
        input: any,
    ): input is {[value: string]: any} => input !== null && typeof input === 'object',
);
