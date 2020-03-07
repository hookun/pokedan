import {TypeChecker} from '../types';
import {AppError} from './AppError';

export const assure = <Type>(
    input: any,
    typeChecker: TypeChecker<Type>,
): Type => {
    if (typeChecker(input)) {
        return input;
    }
    throw new AppError(
        'UnexpectedValue',
        `ExpectedType: ${typeChecker.type}, ActualValue: ${input}`,
    );
};
