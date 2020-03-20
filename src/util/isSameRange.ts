export const isSameRange = (
    range1: Range,
    range2: Range,
): boolean => range1.startContainer === range2.startContainer
&& range1.startOffset === range2.startOffset
&& range1.endContainer === range2.endContainer
&& range1.endOffset === range2.endOffset;
