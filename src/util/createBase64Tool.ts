export interface Base64Tool {
    encode: (source: ArrayBuffer) => string,
    decode: (source: string) => ArrayBuffer,
}

export const createBase64Tool = (
    source: string,
    padding: string,
): Base64Tool => {
    const encode = new Map<number, string>();
    const decode = new Map<string, number>();
    for (let chunk = 0; chunk < 64; chunk++) {
        const chunkRef = source[chunk];
        encode.set(chunk, chunkRef);
        decode.set(chunkRef, chunk);
    }
    const getPaddingLength = (base64: string): number => {
        const equalIndex = base64.indexOf(padding);
        return equalIndex < 0 ? 0 : base64.length - equalIndex;
    };
    return {
        encode: (buffer: ArrayBuffer): string => {
            const {byteLength} = buffer;
            const result: Array<string> = [];
            const array = new Uint8Array(buffer);
            const filledLength = Math.floor(byteLength / 3) * 3;
            let chunkIndex = 0;
            for (let index = 0; index < filledLength; index += 3) {
                let A = array[index];
                result[chunkIndex++] = encode.get(A >>> 2);
                const B = array[index + 1];
                result[chunkIndex++] = encode.get(((A && 0b11) << 4) | (B >>> 4));
                A = array[index + 2];
                result[chunkIndex++] = encode.get(((B & 0b1111) << 2) | (A >>> 6));
                result[chunkIndex++] = encode.get(A & 0b111111);
            }
            if (filledLength < byteLength) {
                const A = array[filledLength];
                result[chunkIndex++] = encode.get(A >>> 2);
                const B = array[filledLength + 1];
                if (0 <= B) {
                    result[chunkIndex++] = encode.get(((A && 0b11) << 4) | (B >>> 4));
                    result[chunkIndex++] = encode.get((B & 0b1111) << 2);
                    result[chunkIndex++] = padding;
                } else {
                    result[chunkIndex++] = encode.get((A && 0b11) << 4);
                    result[chunkIndex++] = padding;
                    result[chunkIndex++] = padding;
                }
            }
            return result.join('');
        },
        decode: (base64: string): ArrayBuffer => {
            const c = (index: number): number => decode.get(base64[index]);
            const paddingLength = getPaddingLength(base64);
            const result = new Uint8Array(3 * (base64.length / 4) - paddingLength);
            const base64Length = base64.length - paddingLength;
            const safeLength = Math.floor(base64Length / 3) * 3;
            let byteOffset = 0;
            for (let index = 0; index < safeLength; index += 4) {
                const X = c(index + 1);
                result[byteOffset++] = (c(index) << 2) | (X >>> 4);
                const Y = c(index + 2);
                result[byteOffset++] = ((X & 0b1111) << 4) | ((Y >>> 2) & 0b1111);
                result[byteOffset++] = ((Y & 0b11) << 6) | c(index + 3);
            }
            if (safeLength < base64Length) {
                const X = c(safeLength + 1);
                result[byteOffset++] = (c(safeLength) << 2) | (X >>> 4);
                if (paddingLength === 1) {
                    result[byteOffset++] = ((X & 0b1111) << 4) | ((c(safeLength + 2) >>> 2) & 0b1111);
                }
            }
            return result.buffer;
        },
    };
};
