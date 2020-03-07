import {createTypeChecker} from '../util/createTypeChecker';

export const isPositiveSafeInteger = createTypeChecker(
    'PositiveSafeInteger',
    (
        input: any,
    ): input is number => 0 < input && Number.isSafeInteger(input),
);
