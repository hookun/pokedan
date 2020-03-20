import {
    InputHTMLAttributes,
    ReactElement,
    createElement,
    useState,
    useRef,
    useEffect,
    useCallback,
    memo,
} from 'react';

export const Input = memo((
    baseProps: InputHTMLAttributes<HTMLInputElement>,
): ReactElement => {
    const ref = useRef<HTMLInputElement>();
    const [focused, setFocused] = useState(false);
    useEffect(() => {
        const input = ref.current;
        if (!focused && input) {
            input.value = `${baseProps.defaultValue}`;
        }
    }, [ref, baseProps.defaultValue, focused]);
    const onFocus = useCallback(() => setFocused(true), [setFocused]);
    const onBlur = useCallback(() => setFocused(false), [setFocused]);
    return createElement('input', {
        ...baseProps,
        onFocus,
        onBlur,
        defaultValue: baseProps.value,
        ref,
    });
});
