import {createElement} from 'react';
import className from './style.css';

export const Checkbox = (
    props: {
        label: string,
        checked: boolean,
        onChange: (checked: boolean) => void,
    },
) => createElement(
    'div',
    {className: className.container},
    createElement(
        'input',
        {
            className: className.input,
            id: props.label,
            type: 'checkbox',
            checked: props.checked,
            onChange: ({currentTarget: {checked}}) => props.onChange(checked),
        },
    ),
    createElement(
        'svg',
        {
            className: className.check,
            viewBox: '-2 -2 14 14',
        },
        createElement('rect', {x: 0, y: 0, width: 10, height: 10}),
        props.checked && createElement('path', {d: 'M2 4L4 8L8 2'}),
    ),
    createElement(
        'label',
        {htmlFor: props.label},
        props.label,
    ),
);
