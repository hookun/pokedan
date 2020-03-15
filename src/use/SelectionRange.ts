import {MutableRefObject, useEffect, useState} from 'react';

export const useSelectionRange = () => {
    const [range, setRange] = useState<Range | null>(null);
    useEffect(() => {
        const onSelectionChange = () => {
            const selection = document.getSelection();
            if (selection.rangeCount === 1) {
                setRange(selection.getRangeAt(0).cloneRange());
            }
        };
        document.addEventListener('selectionchange', onSelectionChange);
        return () => document.removeEventListener('selectionchange', onSelectionChange);
    }, []);
    return range;
};

export const useSelectionRangeInElement = (
    ref: MutableRefObject<Element> | null,
) => {
    const range = useSelectionRange();
    const [rangeInTargetElement, setRange] = useState<Range | null>();
    useEffect(() => {
        const target = ref.current;
        const contained = range && target && target.contains(range.startContainer) && target.contains(range.endContainer);
        setRange(contained ? range : null);
    }, [ref, range]);
    return rangeInTargetElement;
};
