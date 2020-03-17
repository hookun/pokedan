export const rgbToHex = (
    rgb: [number, number, number],
): string => [
    '#',
    ...rgb.map((value) => value.toString(16).toUpperCase().padStart(2, '0')),
].join('');

export const hexToRGB = (
    hex: string,
): [number, number, number] => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
];

export const isBright = (
    [r, g, b]: [number, number, number],
): boolean => {
    const gray = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return 0.6 < gray;
};
