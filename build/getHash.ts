import * as crypto from 'crypto';

export const getHash = (
    data: string | Buffer,
    length = 16,
    algorithm = 'sha256',
    encoding = 'hex' as crypto.HexBase64Latin1Encoding,
) => {
    const hash = crypto.createHash(algorithm);
    hash.update(data);
    return hash.digest(encoding).slice(0, length);
};
