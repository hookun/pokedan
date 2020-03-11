import {useSelector} from 'react-redux';
import {selectMessageMap} from '../core/Message/selector';
import {MessageId} from '../types';

export const useMessage = (id: MessageId) => useSelector(selectMessageMap).get(id);
