import {useRef, createElement, useCallback, useEffect, ReactElement} from 'react';
import {useDispatch} from 'react-redux';
import {clearNode} from '@hookun/domutil/clearNode';
import {MessageId} from '../../types';
import {useMessage} from '../../use/Message';
import {useMutationObserver} from '../../use/MutationObserver';
import {useSelectionRangeInElement} from '../../use/SelectionRange';
import {getMessageFragments} from '../../util/getMessageFragments';
import {updateMessage} from '../../core/Message/action';
import {setMessageRange, clearMessageRange} from '../../core/MessageRange/action';
import {parseFragments} from '../../util/message';

export const MessageTextEditor = (
    {id, className}: {id: MessageId, className: string},
): ReactElement => {
    const ref = useRef<HTMLDivElement>();
    const dispatch = useDispatch();
    const range = useSelectionRangeInElement(ref);
    useEffect(() => {
        if (range) {
            dispatch(setMessageRange({id, range}));
        }
    }, [range, dispatch, id]);
    const message = useMessage(id);
    const onMutation = useCallback(() => {
        const fragments = [...getMessageFragments(ref.current)];
        dispatch(updateMessage({id, fragments}));
    }, [ref, id, dispatch]);
    useMutationObserver(
        ref,
        onMutation,
        {characterData: true, childList: true, subtree: true},
    );
    useEffect(() => {
        const editorElement = ref.current;
        if (editorElement && !range) {
            clearNode(editorElement);
            for (const element of parseFragments(message.fragments)) {
                editorElement.appendChild(element);
            }
        }
    }, [ref, id, message.fragments, range]);
    return createElement(
        'div',
        {
            'data-message': id,
            ref,
            className,
            contentEditable: true,
            suppressContentEditableWarning: true,
            onBlur: () => dispatch(clearMessageRange()),
        },
    );
};
