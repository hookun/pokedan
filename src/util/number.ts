const s = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_+';
const chunkSize = 6;

export const encode = (input: number): string => {
    const chunks: Array<string> = [];
    const bin = input.toString(2);
    const binLength = bin.length;
    for (let index = 0; index < binLength; index += chunkSize) {
        chunks.unshift(s[parseInt(
            bin.slice(
                Math.max(binLength - index - chunkSize, 0),
                binLength - index,
            ),
            2,
        )]);
    }
    return chunks.join('');
};

export const decode = (input: string): number => {
    let result = 0;
    const shift = 1 << chunkSize;
    for (const character of input) {
        const chunk = s.indexOf(character);
        if (chunk < 0) {
            throw new Error(`InvalidChunk: ${character}`);
        }
        result = (result * shift) + chunk;
    }
    return result;
};
