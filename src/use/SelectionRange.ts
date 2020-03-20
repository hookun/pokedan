import {MutableRefObject, useEffect, useState} from 'react';
import {isSameRange} from '../util/isSameRange';

export const useSelectionRange = (): Range | null => {
    const [range, setRange] = useState<Range | null>(null);
    useEffect(() => {
        const onSelectionChange = (): void => {
            const selection = document.getSelection();
            if (selection.rangeCount === 1) {
                setRange(selection.getRangeAt(0).cloneRange());
            }
        };
        document.addEventListener('selectionchange', onSelectionChange);
        return (): void => document.removeEventListener('selectionchange', onSelectionChange);
    }, []);
    return range;
};

export const useSelectionRangeInElement = (
    ref: MutableRefObject<Element> | null,
): Range | null => {
    const [rangeInTargetElement, setRange] = useState<Range | null>();
    useEffect(() => {
        const onSelectionChange = (): void => {
            const selection = document.getSelection();
            if (selection.rangeCount === 1) {
                const range = selection.getRangeAt(0);
                const target = ref.current;
                const contained = range && target && target.contains(range.startContainer) && target.contains(range.endContainer);
                const newRange = contained ? range.cloneRange() : null;
                if (newRange && rangeInTargetElement) {
                    if (!isSameRange(newRange, rangeInTargetElement)) {
                        setRange(newRange);
                    }
                } else if (newRange !== rangeInTargetElement) {
                    setRange(newRange);
                }
            }
        };
        document.addEventListener('selectionchange', onSelectionChange);
        return (): void => document.removeEventListener('selectionchange', onSelectionChange);
    }, [ref, rangeInTargetElement]);
    return rangeInTargetElement;
};
