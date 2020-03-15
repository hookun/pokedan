import {InputHTMLAttributes, createElement, ReactElement, useState} from 'react';

export const Input = (baseProps: InputHTMLAttributes<HTMLInputElement>): ReactElement => {
    const [focused, setFocused] = useState(false);
    const props: InputHTMLAttributes<HTMLInputElement> = {
        ...baseProps,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
    };
    const {value} = baseProps;
    if (focused) {
        props.defaultValue = value;
        delete props.value;
    }
    return createElement('input', props);
};
