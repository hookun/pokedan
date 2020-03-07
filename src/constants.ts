import {FrameColor, FrameType, TextColor, Message} from './types';

const createSet = <Type>(...values: Array<any>): [Set<Type>, ...Array<Type>] => [
    new Set<Type>(values),
    ...values as Array<Type>,
];

export const DisplayWidth = 256;
export const DisplayHeight = 192;

export const [FrameColors, DefaultFrameColor] = createSet<FrameColor>('Red', 'Blue');

export const [FrameTypes, DefaultFrameType] = createSet<FrameType>(1, 2, 3, 4, 5);

export const [TextColors, DefaultTextColor] = createSet<TextColor>('White', 'Blue', 'Yellow');

export const DefaultMessageList: Array<Message> = [
    {
        fragments: [
            {
                text: 'ピカチュウ',
                color: 'Yellow' as unknown as TextColor,
            },
            {
                text: '「ここは　てんきがいいと\nいつも　',
                color: DefaultTextColor,
            },
            {
                text: 'クラブ',
                color: 'Blue' as unknown as TextColor,
            },
            {
                text: 'たちが　ゆうがたに\nあわを　ふくんだけど……',
                color: DefaultTextColor,
            },
        ],
        duration: 5000,
    },
    {
        fragments: [
            {
                text: 'ピカチュウ',
                color: 'Yellow' as unknown as TextColor,
            },
            {
                text: '「ゆうひの　うみに\nたくさんの　あわが　かさなって……',
                color: DefaultTextColor,
            },
        ],
        duration: 5000,
    },
    {
        fragments: [
            {
                text: 'ピカチュウ',
                color: 'Yellow' as unknown as TextColor,
            },
            {
                text: '「ホント　いつみても\nきれいだよなあ。',
                color: DefaultTextColor,
            },
        ],
        duration: 5000,
    },
];
