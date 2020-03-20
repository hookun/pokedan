import {createElement, Fragment, useMemo, ReactElement, useCallback, ChangeEvent, memo} from 'react';
import {generateId} from '../../util/generateId';
import className from './style.css';
import {Input} from '../Input';

export const NumberInput = memo((
    {
        title,
        value,
        onChange,
        type = 'number',
        min = 0,
        max = null,
        step = 1,
        placeholder,
    }: {
        title: string,
        value: number,
        onChange: (value: number) => void,
        type?: 'number' | 'range',
        min?: number,
        max?: number,
        step?: number,
        placeholder?: string,
    },
): ReactElement => {
    const id = useMemo(generateId, []);
    return createElement(
        Fragment,
        null,
        createElement(
            'label',
            {className: className.label, htmlFor: id},
            title,
        ),
        createElement(
            Input,
            {
                className: className.input,
                id,
                type,
                min,
                max,
                step,
                defaultValue: Math.round(value / step) * step,
                placeholder,
                onChange: useCallback(
                    (event: ChangeEvent<HTMLInputElement>) => {
                        const value = Number(event.currentTarget.value);
                        onChange(value);
                    },
                    [onChange],
                ),
            },
        ),
    );
});
