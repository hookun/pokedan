export const rgbToHexString = (
    rgb: [number, number, number],
): string => [
    '#',
    ...rgb.map((value) => value.toString(16).toUpperCase().padStart(2, '0')),
].join('');
