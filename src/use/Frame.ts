import {useMemo} from 'react';
import {Base64} from '@hookun/util/base64';
import {getPNGInfo, PNGInfo} from '@hookun/util/getPNGInfo';
import {FrameType} from '../types';
import {FrameData} from '../constants';

export interface CornerInfo extends PNGInfo {
    url: string,
}

export const useFrame = (
    frameType: FrameType,
): {TopRight: CornerInfo, BottomRight: CornerInfo} => {
    const {TopRight, BottomRight} = useMemo(() => FrameData.get(frameType), [frameType]);
    const TopRightPNGInfo = useMemo(() => getPNGInfo(Base64.decode(TopRight)), [TopRight]);
    const BottomRightPNGInfo = useMemo(() => getPNGInfo(Base64.decode(BottomRight)), [BottomRight]);
    return {
        TopRight: {
            ...TopRightPNGInfo,
            url: `data:image/png;base64,${TopRight}`,
        },
        BottomRight: {
            ...BottomRightPNGInfo,
            url: `data:image/png;base64,${BottomRight}`,
        },
    }; 
};
