import {createTypeChecker} from '../util/createTypeChecker';
import {FrameColors} from '../constants';
import {FrameColor} from '../types';

export const isFrameColor = createTypeChecker(
    'FrameColor',
    (
        input: any,
    ): input is FrameColor => FrameColors.has(input),
);
