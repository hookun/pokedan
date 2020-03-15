import {useState, useEffect} from 'react';

export const useDebounce = <Value>(value: Value, timeInMs: number): Value => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timerId = setTimeout(() => setDebounced(value), timeInMs);
        return (): void => clearTimeout(timerId);
    }, [value, timeInMs]);
    return debounced;
};
