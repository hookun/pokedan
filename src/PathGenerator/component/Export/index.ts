import {createElement} from 'react';
import {useSelector} from '../../core';
import {selectEditableCharacters, selectExportType} from '../../selector';
import className from './style.css';
import {useCharacter} from '../../useCharacter';

export const CharacterSVG = (
    {character}: {character: string},
) => {
    const {d} = useCharacter(character);
    const codePoint = character.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
    return createElement(
        'div',
        null,
        `        <path id="U${codePoint}" d="${d}"/>`,
    );
};

export const CharacterPathJSON = (
    props: {
        character: string,
        last: boolean,
    },
) => {
    const {d} = useCharacter(props.character);
    return createElement('div', null, `    "${props.character}": "${d}"${props.last ? '' : ','}`);
};

export const CharacterMatrixJSON = (
    props: {
        character: string,
        last: boolean,
    },
) => {
    const {matrixData} = useCharacter(props.character);
    return createElement('div', null, `    "${props.character}": "${matrixData}"${props.last ? '' : ','}`);
};

export const CharacterPathJS = (
    props: {character: string},
) => {
    const {d} = useCharacter(props.character);
    return createElement('div', null, `    '${props.character}': '${d}',`);
};

export const CharacterMatrixJS = (
    props: {character: string},
) => {
    const {matrixData} = useCharacter(props.character);
    return createElement('div', null, `    '${props.character}': '${matrixData}',`);
};

export const Export = () => {
    const editableCharacters = useSelector(selectEditableCharacters);
    const exportType = useSelector(selectExportType);
    switch (exportType) {
        case 'SVG':
            return createElement(
                'div',
                {className: className.container},
                '<svg style="height:0">\n    <defs>\n',
                ...[...editableCharacters].map((character) => createElement(CharacterSVG, {character})),
                '    </defs>\n</svg>\n',
            );
        case 'JSON (Path)':
            return createElement(
                'div',
                {className: className.container},
                '{\n',
                ...[...editableCharacters]
                .map((character, index) => createElement(
                    CharacterPathJSON,
                    {
                        character,
                        last: index === editableCharacters.size - 1,
                    },
                )),
                '}\n',
            );
        case 'JSON (Matrix)':
            return createElement(
                'div',
                {className: className.container},
                '{\n',
                ...[...editableCharacters]
                .map((character, index) => createElement(
                    CharacterMatrixJSON,
                    {
                        character,
                        last: index === editableCharacters.size - 1,
                    },
                )),
                '}\n',
            );
        case 'JS (Path)':
            return createElement(
                'div',
                {className: className.container},
                '{\n',
                ...[...editableCharacters]
                .map((character) => createElement(CharacterPathJS, {character})),
                '}\n',
            );
        case 'JS (Matrix)':
            return createElement(
                'div',
                {className: className.container},
                '{\n',
                ...[...editableCharacters]
                .map((character) => createElement(CharacterMatrixJS, {character})),
                '}\n',
            );
        default:
            return null;
    }
};
