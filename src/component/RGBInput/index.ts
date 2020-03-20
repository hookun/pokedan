import {createElement, Fragment, useCallback, ReactElement} from 'react';
import {classnames} from '@hookun/util/classnames';
import {rgbToHex, hexToRGB, isBright} from '../../util/color';
import {Input} from '../Input';
import className from './style.css';

export const RGBInput = (
    {title, value, onChange}: {
        title: string,
        value: [number, number, number],
        onChange: (value: [number, number, number]) => void,
    },
): ReactElement => {
    const onChangeRGB = useCallback((event, index) => {
        const newValue = value.slice() as [number, number, number];
        newValue[index] = Number(event.currentTarget.value);
        onChange(newValue);
    }, [onChange, value]);
    const hex = rgbToHex(value);
    return createElement(
        Fragment,
        null,
        createElement(
            'div',
            {className: className.label},
            `${title} `,
            createElement(
                'span',
                {
                    className: classnames(
                        className.hex,
                        isBright(value) && className.bright,
                    ),
                    style: {backgroundColor: hex},
                },
                hex,
            ),
            createElement(
                'input',
                {
                    className: className.colorInput,
                    type: 'color',
                    value: hex.toLowerCase(),
                    onChange: (event) => onChange(hexToRGB(event.currentTarget.value)),
                },
            ),
        ),
        createElement(
            'div',
            {className: className.rgb},
            ...value.map((defaultValue, index) => createElement(
                Input,
                {
                    className: className.input,
                    type: 'number',
                    min: 0,
                    max: 255,
                    step: 1,
                    defaultValue,
                    onChange: (event) => onChangeRGB(event, index),
                },
            )),
        ),
    );
};
