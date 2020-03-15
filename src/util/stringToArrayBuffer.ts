export const stringToArrayBuffer = (source: string) => {
    const {length} = source;
    const array = new Uint16Array(length);
    for (let index = 0; index < length; index++) {
        array[index] = source.charCodeAt(index);
    }
    return array.buffer;
};
