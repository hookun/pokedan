import {createElement, Fragment, useCallback, ReactElement} from 'react';
import className from './style.css';
import {rgbToHexString} from '../../util/rgbToHexString';
import {Input} from '../Input';

export const RGBInput = (
    props: {
        title: string,
        value: [number, number, number],
        onChange: (value: [number, number, number]) => void,
    },
): ReactElement => {
    const onChange = useCallback((event, index) => {
        const newValue = props.value.slice() as [number, number, number];
        newValue[index] = Number(event.currentTarget.value);
        props.onChange(newValue);
    }, [props.onChange]);
    return createElement(
        Fragment,
        null,
        createElement(
            'label',
            {className: className.label},
            `${props.title} (`,
            createElement(
                'span',
                {className: className.hex},
                rgbToHexString(props.value),
            ),
            ')',
        ),
        createElement(
            'div',
            {className: className.rgb},
            ...props.value.map((defaultValue, index) => createElement(
                Input,
                {
                    className: className.input,
                    type: 'number',
                    min: 0,
                    max: 255,
                    step: 1,
                    defaultValue,
                    onChange: (event) => onChange(event, index),
                },
            )),
        ),
    );
}
