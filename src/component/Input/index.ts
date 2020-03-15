import {
    InputHTMLAttributes,
    ReactElement,
    createElement,
    useState,
    useRef,
    useEffect,
} from 'react';

export const Input = (baseProps: InputHTMLAttributes<HTMLInputElement>): ReactElement => {
    const ref = useRef<HTMLInputElement>();
    const [focused, setFocused] = useState(false);
    useEffect(() => {
        const input = ref.current;
        if (!focused && input) {
            input.value = `${baseProps.defaultValue}`;
        }
    }, [ref, baseProps.defaultValue]);
    return createElement('input', {
        ...baseProps,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        defaultValue: baseProps.value,
        ref,
    });
};
