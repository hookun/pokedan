import {useMemo} from 'react';
import {printFragments} from '../util/printFragments';
import {Printee} from '../types';

export const useFragmentPrinter = (
    ...args: Parameters<typeof printFragments>
): Array<Printee> => useMemo(() => [...printFragments(...args)], args);
