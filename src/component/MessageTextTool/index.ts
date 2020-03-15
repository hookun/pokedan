import {createElement, Fragment, useMemo, CSSProperties} from 'react';
import {MessageId} from '../../types';
import {classnames} from '../../util/classnames';
import {textColors} from '../../constants';
import {useMessageRange} from '../../use/MessageRange';
import className from './style.css';

export const MessageTextTool = ({id}: {id: MessageId}) => {
    const range = useMessageRange(id);
    const style = useMemo<null | CSSProperties>(() => {
        if (range) {
            const target = document.querySelector(`[data-message=${id}]`);
            if (target) {
                const {parentElement: parent} = target;
                if (parent) {
                    const rangeRect = range.getBoundingClientRect();
                    const targetRect = target.getBoundingClientRect();
                    const parentRect = parent.getBoundingClientRect();
                    const left = `${targetRect.left - parentRect.left}px`;
                    const right = `${parentRect.right - targetRect.right}px`;
                    if (range.collapsed) {
                        return {
                            top: `${targetRect.top + targetRect.height - parentRect.top}px`,
                            left,
                            right,
                        };
                    } else {
                        return {
                            bottom: `${parentRect.bottom - rangeRect.top}px`,
                            left,
                            right,
                        };
                    }
                }
            }
        }
        return null;
    }, [range]);
    if (!range) {
        return null;
    }
    return createElement(
        'div',
        {
            className: classnames(
                className.colors,
                !range.collapsed && className.available,
            ),
            style,
        },
        range.collapsed ? '文字色を変えるには範囲を選択してください。' : createElement(
            Fragment,
            null,
            ...textColors.map((color) => createElement(
                'button',
                {
                    className: className.color,
                    style: {backgroundColor: color},
                    onMouseDown: (event) => event.preventDefault(),
                    onTouchStart: (event) => event.preventDefault(),
                    onClick: (event) => {
                        event.preventDefault();
                        const wrap = document.createElement('span');
                        wrap.style.color = color;
                        const fragment = range.extractContents();
                        wrap.textContent = fragment.textContent;
                        range.insertNode(wrap);
                    },
                },
            )),
        ),
    );
};
