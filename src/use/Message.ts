import {useSelector} from 'react-redux';
import {selectMessageMap} from '../core/Message/selector';
import {MessageId, Message} from '../types';

export const useMessage = (id: MessageId): Message => useSelector(selectMessageMap).get(id);
