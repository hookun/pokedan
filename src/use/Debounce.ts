import {useState, useEffect} from 'react';

export const useDebounce = <Type>(value: Type, timeInMs: number) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timerId = setTimeout(() => setDebounced(value), timeInMs);
        return () => clearTimeout(timerId);
    }, [value, timeInMs]);
    return debounced;
};
