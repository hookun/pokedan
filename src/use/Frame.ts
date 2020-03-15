import {FrameType} from '../types';
import {useMemo} from 'react';
import {FrameData} from '../constants';
import {getPNGInfo, PNGInfo} from '../util/getPNGInfo';
import {Base64} from '../util/base64';
import {dataURI} from '../util/dataURI';

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
            url: dataURI('image/png', TopRight),
        },
        BottomRight: {
            ...BottomRightPNGInfo,
            url: dataURI('image/png', BottomRight),
        },
    }; 
};
