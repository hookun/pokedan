import {createElement, FormEvent} from 'react';
import {useDispatch, useSelector} from '../../core';
import {LoadMatrixData} from '../../action';
import className from './style.css';
import {selectMatrixData} from '../../selector';

export const MetrixLoader = () => {
    const dispatch = useDispatch();
    const matrixData = useSelector(selectMatrixData);
    return createElement(
        'form',
        {
            className: className.form,
            onSubmit: (event: FormEvent) => {
                event.preventDefault();
                const input = event.currentTarget.querySelector<HTMLInputElement>('[name=matrixData]');
                if (input) {
                    dispatch(LoadMatrixData(input.value));
                    input.value = '';
                }
            },
        },
        createElement(
            'input',
            {
                name: 'matrixData',
                type: 'text',
                placeholder: matrixData,
            },
        ),
        createElement(
            'button',
            {type: 'submit'},
            '読み込む',
        ),
    );
};
