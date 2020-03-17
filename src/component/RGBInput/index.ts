import {createElement, Fragment, useCallback, ReactElement} from 'react';
import className from './style.css';
import {rgbToHex, hexToRGB, isBright} from '../../util/color';
import {Input} from '../Input';
import {classnames} from '../../util/classnames';

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
    const hex = rgbToHex(props.value);
    return createElement(
        Fragment,
        null,
        createElement(
            'div',
            {className: className.label},
            `${props.title} `,
            createElement(
                'span',
                {
                    className: classnames(
                        className.hex,
                        isBright(props.value) && className.bright,
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
                    onChange: (event) => props.onChange(hexToRGB(event.currentTarget.value)),
                },
            ),
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
