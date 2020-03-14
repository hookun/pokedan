import {useEffect, MutableRefObject} from 'react';

export const useMutationObserver = (
    ref: MutableRefObject<Element>,
    onMutation: (records: Array<MutationRecord>) => void,
    init: MutationObserverInit,
) => useEffect(() => {
    const container = ref.current;
    const observer = new MutationObserver(onMutation);
    observer.observe(container, init);
    return () => observer.disconnect();
}, [ref, onMutation]);
