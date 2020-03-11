import {encode} from './number';
import {createCounter} from './createCounter';
import {MessageId} from '../types';

const count = createCounter();
const SessionId = encode(Date.now());
export const generateMessageId = (): MessageId => `${SessionId}-${count()}` as MessageId;
