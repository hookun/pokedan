import {useSelector} from 'react-redux';
import {MessageId} from '../types';
import {selectMessageRange} from '../core/MessageRange/selector';

export const useMessageRange = (id: MessageId) => {
    const messageRange = useSelector(selectMessageRange);
    if (messageRange && messageRange.id === id) {
        return messageRange.range;
    }
    return null;
};
