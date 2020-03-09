import {createElement} from 'react';
import {Selector} from 'reselect';
import {PayloadActionCreator} from 'typesafe-actions';
import {
    useSelector,
    useDispatch,
    AppState,
} from '../../core';

export const InputSize = (
    props: {
        label: string,
        selector: Selector<AppState, number>,
        action: PayloadActionCreator<'SetWidth' | 'SetHeight', number>,
    },
) => {
    const defaultValue = useSelector(props.selector);
    const dispatch = useDispatch();
    return createElement(
        'div',
        null,
        props.label,
        createElement(
            'input',
            {
                type: 'number',
                defaultValue,
                onChange: (event) => {
                    event.preventDefault();
                    dispatch(props.action(Number(event.target.value)));
                },
            },
        ),
    );
};
