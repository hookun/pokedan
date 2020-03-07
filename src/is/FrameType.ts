import {createTypeChecker} from '../util/createTypeChecker';
import {FrameType} from '../types';
import {FrameTypes} from '../constants';

export const isFrameType = createTypeChecker(
    'FrameType',
    (
        input: any,
    ): input is FrameType => FrameTypes.has(input),
);
