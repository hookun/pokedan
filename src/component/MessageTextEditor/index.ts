import {useRef, createElement, useCallback, useState, Fragment, useEffect, useMemo, KeyboardEvent} from 'react';
import {MessageId, MessageFragment} from '../../types';
import {useMessage} from '../../use/Message';
import {useMutationObserver} from '../../use/MutationObserver';
import {useSelection} from '../../use/Selection';
import className from './style.css';
import {classnames} from '../../util/classnames';
import {textColors} from '../../constants';
import {getMessageFragments} from '../../util/getMessageFragments';
import {useDispatch} from 'react-redux';
import {updateMessage} from '../../core/Message/action';

export const MessageTextEditor = (
    {id, className: editorClassName}: {
        id: MessageId,
        className: string,
    },
) => {
    const message = useMessage(id);
    const fragments = useMemo(() => message.fragments, []);
    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>();
    const [range, setRange] = useState<{range: Range, top: number} | null>(null);
    const onMutation = useCallback(() => {
        for (const fragment of getMessageFragments(ref.current)) {
            console.log(fragment);
        }
        dispatch(updateMessage({
            id,
            fragments: [...getMessageFragments(ref.current)],
        }));
    }, [ref]);
    const onChangeSelection = useCallback((newRange: Range, contained) => {
        if (contained) {
            const element = ref.current;
            const parent = element.parentElement;
            if (element && parent) {
                const rect = element.getBoundingClientRect();
                const parentRect = parent.getBoundingClientRect();
                const top = rect.top + rect.height - parentRect.top;
                if (!range || range.top !== top) {
                    setRange({range: newRange, top});
                }
                return;
            }
        }
        setRange(null);
    }, []);
    useMutationObserver(ref, onMutation, {
        characterData: true,
        childList: true,
        subtree: true,
    });
    useSelection(ref, onChangeSelection);
    return createElement(
        Fragment,
        null,
        createElement(
            'div',
            {
                ref,
                className: editorClassName,
                contentEditable: true,
                suppressContentEditableWarning: true,
            },
            ...fragments.map(({text, color}) => createElement(
                'span',
                {style: {color}},
                text,
            )),
        ),
        range && createElement(
            'div',
            {
                className: classnames(
                    className.colors,
                    !range.range.collapsed && className.available,
                ),
                style: {top: `${range.top}px`},
            },
            range.range.collapsed ? '文字色を変えるには範囲を選択してください。' : createElement(
                Fragment,
                null,
                ...textColors.map((color) => createElement(
                    'button',
                    {
                        className: className.color,
                        style: {backgroundColor: color},
                        onClick: () => {
                            const currentRange = range.range;
                            const wrap = document.createElement('span');
                            wrap.style.color = color;
                            wrap.textContent = currentRange.extractContents().textContent;
                            currentRange.insertNode(wrap);
                        },
                    },
                )),
            ),
        ),
    );
};
