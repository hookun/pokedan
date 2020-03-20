import {useEffect, MutableRefObject} from 'react';

export const useMutationObserver = (
    ref: MutableRefObject<Element>,
    onMutation: (records: Array<MutationRecord>) => void,
    init: MutationObserverInit,
): void => useEffect(() => {
    const container = ref.current;
    const observer = new MutationObserver(onMutation);
    observer.observe(container, init);
    return (): void => observer.disconnect();
}, [ref, onMutation, init]);
