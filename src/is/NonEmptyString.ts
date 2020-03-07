import {createTypeChecker} from '../util/createTypeChecker';

export const isNonEmptyString = createTypeChecker(
    'NonEmptyString',
    (
        input: any,
    ): input is string => typeof input === 'string' && 0 < input.length,
);
