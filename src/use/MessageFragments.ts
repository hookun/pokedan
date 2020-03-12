import {useMemo} from 'react';
import {MessageId} from '../types';
import {useMessage} from './Message';
import {destructFragments} from '../util/destructFragments';

export const useMessageCharacters = (id: MessageId) => {
    const message = useMessage(id);
    return useMemo(() => [...destructFragments(message.fragments)], [message]);
};
