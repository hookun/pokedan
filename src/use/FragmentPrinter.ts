import {useMemo} from 'react';
import {printFragments} from '../util/printFragments';
import {Printee, MessageFragment} from '../types';

export const useFragmentPrinter = (
    fragments: Array<MessageFragment>,
    [characterfeed, lineFeed]: [number, number],
): Array<Printee> => useMemo(
    () => [...printFragments(fragments, [characterfeed, lineFeed])],
    [fragments, characterfeed, lineFeed],
);
