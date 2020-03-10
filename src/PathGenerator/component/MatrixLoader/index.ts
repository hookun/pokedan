import {createElement, FormEvent} from 'react';
import {useDispatch} from '../../core';
import {LoadMatrixData} from '../../action';
import className from './style.css';

export const MetrixLoader = () => {
    const dispatch = useDispatch();
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
                placeholder: '9x9|91YplhCcxBJihE',
            },
        ),
        createElement(
            'button',
            {type: 'submit'},
            '読み込む',
        ),
    );
};
