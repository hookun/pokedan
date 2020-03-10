import {createElement} from 'react';
import {useSelector} from '../../core';
import {selectEditableCharacters} from '../../selector';
import className from './style.css';
import {useCharacter} from '../../useCharacter';

export const CharacterHTML = (
    {character}: {character: string},
) => {
    const {d} = useCharacter(character);
    const codePoint = character.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
    return character.trim() ?createElement(
        'div',
        null,
        `        <path id="U${codePoint}" d="${d}"/>`,
    ) : null;
};

export const Export = () => {
    const editableCharacters = useSelector(selectEditableCharacters);
    return createElement(
        'div',
        {className: className.container},
        '<svg style="height:0">\n    <defs>\n',
        ...[...editableCharacters].map((character) => createElement(CharacterHTML, {character})),
        '    </defs>\n</svg>\n',
    );
};
