import {TypeFilter, TypeChecker} from '../types';
import {assure} from './assure';

export const createTypeFilter = <Type>(
    typeChecker: TypeChecker<Type>,
): TypeFilter<Type> => {
    const filter = (input: any) => assure(input, typeChecker);
    Object.defineProperty(
        filter,
        'type',
        {get: () => typeChecker.type},
    );
    return filter as TypeFilter<Type>;
};
