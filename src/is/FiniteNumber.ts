import {createTypeChecker} from '../util/createTypeChecker';

export const isFiniteNumber = createTypeChecker(
    'FiniteNumber',
    (
        input: any,
    ): input is number => Number.isFinite(input),
);
