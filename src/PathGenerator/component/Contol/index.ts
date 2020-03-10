import {createElement, MouseEvent, ChangeEvent} from 'react';
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
    selectExportType,
} from '../../selector';
import {
    SetWidth,
    SetHeight,
    ClearMatrix,
    SetCellNumber,
    SetPathDirection,
    SetExportType,
} from '../../action';
import {Checkbox} from '../Checkbox';
import {ExportTypes} from '../../constants';
import {ExportType} from '../../type';

export const Control = () => {
    const dispatch = useDispatch();
    const cellNumber = useSelector(selectCellNumber);
    const pathDirection = useSelector(selectPathDirection);
    const currentExportType = useSelector(selectExportType);
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
            createElement(
                'select',
                {
                    className: className.select,
                    value: currentExportType,
                    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
                        dispatch(SetExportType(event.currentTarget.value as ExportType));
                    },
                },
                ...ExportTypes.map((exportType) => createElement(
                    'option',
                    {value: exportType},
                    exportType,
                )),
            ),
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
