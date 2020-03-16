import {useRef, createElement, useCallback, useEffect, ReactElement} from 'react';
import {useDispatch} from 'react-redux';
import {MessageId} from '../../types';
import {useMessage} from '../../use/Message';
import {useMutationObserver} from '../../use/MutationObserver';
import {useSelectionRangeInElement} from '../../use/SelectionRange';
import {getMessageFragments} from '../../util/getMessageFragments';
import {updateMessage} from '../../core/Message/action';
import {setMessageRange, clearMessageRange} from '../../core/MessageRange/action';
import {clearNode} from '../../util/clearNode';
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
    }, [range]);
    const message = useMessage(id);
    const onMutation = useCallback(() => {
        const fragments = [...getMessageFragments(ref.current)];
        dispatch(updateMessage({id, fragments}));
    }, [ref, id]);
    useMutationObserver(
        ref,
        onMutation,
        {characterData: true, childList: true, subtree: true},
    );
    useEffect(() => {
        const {fragments} = message;
        const editorElement = ref.current;
        if (editorElement && !range) {
            clearNode(editorElement);
            for (const element of parseFragments(fragments)) {
                editorElement.appendChild(element);
            }
        }
    }, [ref, id]);
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
