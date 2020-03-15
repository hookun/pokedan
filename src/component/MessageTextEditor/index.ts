import {useRef, createElement, useCallback, useMemo, useEffect, ReactElement} from 'react';
import {useDispatch} from 'react-redux';
import {MessageId} from '../../types';
import {useMessage} from '../../use/Message';
import {useMutationObserver} from '../../use/MutationObserver';
import {useSelectionRangeInElement} from '../../use/SelectionRange';
import {getMessageFragments} from '../../util/getMessageFragments';
import {updateMessage} from '../../core/Message/action';
import {setMessageRange, clearMessageRange} from '../../core/MessageRange/action';

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
    const fragments = useMemo(() => message.fragments, [id]);
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
        ...fragments.map(({text, color}) => createElement('span', {style: {color}}, text)),
    );
};
