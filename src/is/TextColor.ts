import {createTypeChecker} from '../util/createTypeChecker';
import {TextColors} from '../constants';
import {TextColor} from '../types';

export const isTextColor = createTypeChecker(
    'TextColor',
    (
        input: any,
    ): input is TextColor => TextColors.has(input),
);
