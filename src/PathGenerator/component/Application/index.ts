import {createElement, Fragment} from 'react';
import {Control} from '../Contol';
import {Matrix} from '../Matrix';
import {MetrixLoader} from '../MatrixLoader';
import {CharacterList} from '../CharacterList';
import {Preview} from '../Preview';
import {Export} from '../Export';

export const Application = () => createElement(
    Fragment,
    null,
    createElement(Control),
    createElement(MetrixLoader),
    createElement(Matrix),
    createElement(CharacterList),
    createElement(Preview),
    createElement(Export),
);
