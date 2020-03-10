import {createElement, useMemo} from 'react';
import {useSelector, useDispatch} from '../../core';
import {selectPage} from '../../selector';
import {useCharacter} from '../../useCharacter';
import className from './style.css';
import {pages} from '../../constants';
import {SetCharacter} from '../../action';

export const CharacterPreview = (
    {character}: {character: string},
) => {
    const {d, width, height} = useCharacter(character);
    const dispatch = useDispatch();
    return character.trim() ? createElement(
        'svg',
        {
            viewBox: `-1 -1 ${width + 2} ${height + 2}`,
            onClick: () => dispatch(SetCharacter(character)),
        },
        createElement('path', {d}),
    ) : createElement('div');
};

export const Preview = () => {
    const page = useSelector(selectPage);
    const characters = useMemo(() => pages[page].join(''), [page]);
    return createElement(
        'div',
        {className: className.container},
        ...[...characters].map((character) => createElement(CharacterPreview, {character})),
    );
};
