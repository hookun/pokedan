import {createElement, MouseEvent} from 'react';
import className from './style.css';
import {InputSize} from '../InputSize';
import {
    useDispatch,
    useSelector,
} from '../../core';
import {
    selectCellNumber,
    selectPathDirection,
    selectWidth,
    selectHeight,
} from '../../selector';
import {
    SetWidth,
    SetHeight,
    ClearMatrix,
    SetCellNumber,
    SetPathDirection,
} from '../../action';
import {Checkbox} from '../Checkbox';

export const Control = () => {
    const dispatch = useDispatch();
    const cellNumber = useSelector(selectCellNumber);
    const pathDirection = useSelector(selectPathDirection);
    return createElement(
        'div',
        {className: className.container},
        createElement(InputSize, {label: '横', selector: selectWidth, action: SetWidth}),
        createElement(InputSize, {label: '縦', selector: selectHeight, action: SetHeight}),
        createElement(
            'div',
            {className: className.options},
            createElement(Checkbox, {
                checked: cellNumber,
                label: 'マスの番号',
                onChange: (checked) => dispatch(SetCellNumber(checked)),
            }),
            createElement(Checkbox, {
                checked: pathDirection,
                label: 'パスの方向',
                onChange: (checked) => dispatch(SetPathDirection(checked)),
            }),
        ),
        createElement(
            'button',
            {
                className: className.reset,
                onClick: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    event.preventDefault();
                    dispatch(ClearMatrix());
                },
            },
            'ぜんぶ消す',
        ),
    );
};
