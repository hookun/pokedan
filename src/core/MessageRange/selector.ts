import {MessageRange} from '../../types';

export const selectMessageRange = (
    state: {MessageRange: MessageRange},
): MessageRange => state.MessageRange;
