export const frameToSec = (
    frame: number,
    framePerSecond = 60,
): string => (frame / framePerSecond).toFixed(1);
