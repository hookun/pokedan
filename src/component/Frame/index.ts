import {createElement, Fragment} from 'react';
import {useFrame} from '../../use/Frame';
import {useSelector} from 'react-redux';
import {selectPlayerFrameType} from '../../core/Player/selector';

export const TopFrame = (
    {x, y, width}: {
        x: number,
        y: number,
        width: number,
    },
) => {
    const height = 2;
    return createElement(
        Fragment,
        null,
        createElement('rect', {x, y, width, height, fill: 'rgb(81,110,183)'}),
        createElement('rect', {x, y: y + 3, width, height, fill: 'rgb(43,44,137)'}),
        createElement('rect', {x, y: y + 2, width, height, fill: 'rgb(61,69,175)'}),
        createElement('rect', {x, y: y + 1, width, height, fill: 'rgb(180,196,218)'}),
    );
};

export const BottomFrame = (
    {x, y, width}: {
        x: number,
        y: number,
        width: number,
    },
) => createElement(
    Fragment,
    null,
    createElement('rect', {x, y, width, height: 2, fill: 'rgb(43,44,137)'}),
    createElement('rect', {x, y: y + 1, width, height: 4, fill: 'rgb(73,87,179)'}),
    createElement('rect', {x, y: y + 2, width, height: 2, fill: 'rgb(130,160,183)'}),
    createElement('rect', {x, y: y + 2, width, height: 1, fill: 'rgb(180,196,218)'}),
);

export const LeftFrame = (
    {x, y, height}: {
        x: number,
        y: number,
        height: number,
    },
) => createElement(
    Fragment,
    null,
    createElement('rect', {x, y, width: 2, height, fill: 'rgb(70,85,164)'}),
    createElement('rect', {x: x + 5, y, width: 2, height, fill: 'rgb(43,44,137)'}),
    createElement('rect', {x: x + 1, y, width: 2, height, fill: 'rgb(130,160,183)'}),
    createElement('rect', {x: x + 4, y, width: 2, height, fill: 'rgb(50,49,173)'}),
    createElement('rect', {x: x + 2, y, width: 3, height, fill: 'rgb(180,196,218)'}),
);

export const RightFrame = (
    {x, y, height}: {
        x: number,
        y: number,
        height: number,
    },
) => createElement(
    Fragment,
    null,
    createElement('rect', {x, y, width: 2, height, fill: 'rgb(43,44,137)'}),
    createElement('rect', {x: x + 5, y, width: 2, height, fill: 'rgb(39,40,137)'}),
    createElement('rect', {x: x + 1, y, width: 2, height, fill: 'rgb(68,81,176)'}),
    createElement('rect', {x: x + 4, y, width: 2, height, fill: 'rgb(137,168,191)'}),
    createElement('rect', {x: x + 2, y, width: 3, height, fill: 'rgb(180,196,218)'}),
);

export const Frame = (
    {width, height, filter}: {
        width: number,
        height: number,
        filter: string,
    },
) => {
    const frameType = useSelector(selectPlayerFrameType);
    const {TopRight, BottomRight} = useFrame(frameType);
    const hBarWidth = width - (TopRight.width - 1) * 2;
    const vBarHeight = height - TopRight.height - BottomRight.height + 2;
    const x = TopRight.width - 1;
    const y = TopRight.height - 1;
    return createElement(
        'g',
        {filter: `url(#${filter})`},
        createElement('rect', {
            x: TopRight.width - 2,
            y: TopRight.height - 2,
            width: hBarWidth + 2,
            height: vBarHeight + 2,
            fill: 'rgb(37,37,37)',
        }),
        createElement(TopFrame, {x, y: 0, width: hBarWidth}),
        createElement(BottomFrame, {x, y: height - 5, width: hBarWidth}),
        createElement(LeftFrame, {x: 0, y, height: vBarHeight}),
        createElement(RightFrame, {x: width - 7, y, height: vBarHeight}),
        createElement('image', {
            x: width - TopRight.width,
            y: 0,
            href: TopRight.url,
            width: TopRight.width,
            height: TopRight.height,
        }),
        createElement('image', {
            x: width - BottomRight.width,
            y: height - BottomRight.height,
            href: BottomRight.url,
            width: BottomRight.width,
            height: BottomRight.height,
        }),
        createElement('image', {
            x: -TopRight.width,
            y: 0,
            href: TopRight.url,
            width: TopRight.width,
            height: TopRight.height,
            transform: 'scale(-1, 1)',
        }),
        createElement('image', {
            x: -BottomRight.width,
            y: height - BottomRight.height,
            href: BottomRight.url,
            width: BottomRight.width,
            height: BottomRight.height,
            transform: 'scale(-1, 1)',
        }),
    );
};
