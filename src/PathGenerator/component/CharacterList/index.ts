import {createElement} from 'react';
import {
    useSelector,
    useDispatch,
} from '../../core';
import {classnames} from '../../../util/classnames';
import {pages} from '../../constants';
import {
    selectPage,
    selectCharacters,
    selectCharacter,
} from '../../selector';
import {CharacterPage} from '../../type';
import {
    SetPage,
    SetCharacter,
} from '../../action';
import className from './style.css';

export const CharacterList = () => {
    const currentPage = useSelector(selectPage);
    const characters = useSelector(selectCharacters);
    const currentCharacter = useSelector(selectCharacter);
    const dispatch = useDispatch();
    return createElement(
        'div',
        {className: className.container},
        ...Object.keys(pages).map((page: CharacterPage, index) => createElement(
            'button',
            {
                className: classnames(
                    className.toggle,
                    currentPage === page && className.selected,
                ),
                onClick: () => dispatch(SetPage(page)),
                style: {gridArea: `p${index}`},
            },
            page,
        )),
        ...characters.map((character, index) => {
            const columnSize = 13;
            const columnIndex = index % columnSize;
            const rowIndex = Math.floor(index / columnSize);
            const disabled = !character.trim();
            return createElement(
                'button',
                {
                    className: classnames(
                        className.character,
                        currentCharacter === character && className.selected,
                    ),
                    onClick: disabled ? null : () => dispatch(SetCharacter(character)),
                    style: {gridArea: `c${columnIndex}-${rowIndex}`},
                    disabled,
                },
                character,
            );
        }),
    );
};
