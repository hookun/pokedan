import {FrameColor, FrameType, TextColor, Message} from './types';
import {generateMessageId} from './util/generateMessageId';

const createSet = <Type>(...values: Array<any>): [Set<Type>, ...Array<Type>] => [
    new Set<Type>(values),
    ...values as Array<Type>,
];

export const DisplayWidth = 256;
export const DisplayHeight = 192;

export const [FrameColors, DefaultFrameColor] = createSet<FrameColor>('Red', 'Blue');

export const [FrameTypes, DefaultFrameType] = createSet<FrameType>(1, 2, 3, 4, 5);

export const [TextColors, DefaultTextColor] = createSet<TextColor>('White', 'Blue', 'Yellow');
