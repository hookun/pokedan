import {createElement, Fragment, useMemo, useCallback, ReactElement} from 'react';
import {generateId} from '../../util/generateId';
import className from './style.css';

export const NumberInput = (
    props: {
        title: string,
        value: number,
        onChange: (value: number) => void,
        type?: 'number' | 'range',
        min?: number,
        max?: number,
        step?: number,
    },
): ReactElement => {
    const id = useMemo(generateId, []);
    const onChange = useCallback((event) => {
        props.onChange(Number(event.currentTarget.value));
    }, [props.onChange]);
    return createElement(
        Fragment,
        null,
        createElement(
            'label',
            {className: className.label, htmlFor: id},
            props.title,
        ),
        createElement(
            'input',
            {
                className: className.input,
                id: id,
                type: props.type || 'number',
                min: props.min || 0,
                max: props.max || null,
                step: props.step || 1,
                value: props.value,
                onChange,
            },
        ),
    );
}
