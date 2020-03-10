import {createElement, Fragment} from 'react';
import {useSelector} from '../../core';
import {selectPathD, selectMatrixData} from '../../selector';
import {Control} from '../Contol';
import {Matrix} from '../Matrix';
import {MetrixLoader} from '../MatrixLoader';
import {CharacterList} from '../CharacterList';
import {Preview} from '../Preview';
import {Export} from '../Export';
import className from './style.css';

export const Application = () => {
    const d = useSelector(selectPathD);
    const data = useSelector(selectMatrixData);
    return createElement(
        Fragment,
        null,
        createElement(Control),
        createElement(MetrixLoader),
        createElement(Matrix),
        createElement(CharacterList),
        createElement('div', {className: className.result, title: '現在のピクセル'}, data),
        createElement('div', {className: className.result, title: '現在のパス'}, d || '---'),
        createElement(Preview),
        createElement(Export),
    );
};
