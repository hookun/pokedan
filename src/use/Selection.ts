import {MutableRefObject, useEffect, useCallback} from 'react';

export const useSelection = (
    ref: MutableRefObject<Element>,
    listener: (
        range: Range,
        contained: boolean,
    ) => void,
) => {
    const onSelectionChange = useCallback((event) => {
        const selection = document.getSelection();
        if (selection.rangeCount === 1) {
            const targetElement = ref.current;
            const range = selection.getRangeAt(0);
            listener(
                range,
                targetElement.contains(range.startContainer) && targetElement.contains(range.endContainer),
            );
        }
    }, [listener]);
    useEffect(() => {
        document.addEventListener('selectionchange', onSelectionChange);
        return () => document.removeEventListener('selectionchange', onSelectionChange);
    }, []);
};
