import {createTypeChecker} from '../util/createTypeChecker';

export const isArray = createTypeChecker(
    'Array',
    (
        input: any,
    ): input is Array<any> => Array.isArray(input),
);
