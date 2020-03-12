import {useMemo} from 'react';
import {printFragments} from '../util/printFragments';

export const useFragmentPrinter = (
    ...args: Parameters<typeof printFragments>
) => useMemo(() => [...printFragments(...args)], args);
