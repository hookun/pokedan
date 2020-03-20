import {createElement, Fragment, useMemo, ReactElement, useCallback, ChangeEvent} from 'react';
import {generateId} from '../../util/generateId';
import className from './style.css';
import {Input} from '../Input';

export const NumberInput = (
    {
        title,
        value,
        onChange: onChangeValue,
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
    const onChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onChangeValue(Number(event.currentTarget.value));
        },
        [onChangeValue],
    );
    return createElement(
        Fragment,
        null,
        createElement('label', {className: className.label, htmlFor: id}, title),
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
                onChange,
            },
        ),
    );
};
