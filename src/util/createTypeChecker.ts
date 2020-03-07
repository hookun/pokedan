import {TypeChecker} from '../types';

export const createTypeChecker = <Type>(
    type: string,
    checkerFunction: (
        input: any,
    ) => input is Type,
): TypeChecker<Type> => Object.assign(checkerFunction, {type});
