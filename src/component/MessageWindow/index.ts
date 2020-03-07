import {createElement} from 'react';
import {useSelector} from 'react-redux';
import {selectCurrentMessageCharacters} from '../../core/selector';
import {selectPlayerShadowFilterId} from '../../core/Player/selector';
import {Character} from '../Character';

export const MessageWindow = () => {
    const characters = useSelector(selectCurrentMessageCharacters);
    const id = useSelector(selectPlayerShadowFilterId);
    return createElement(
        'g',
        null,
        createElement(
            'g',
            {filter: `url(#${id})`},
            ...characters.map((fragment, x) => createElement(Character, {...fragment, x})),
        ),
    );
};
