import test from 'ava';
import {encode, decode} from './number';

const testEncodeAndDecode = (
    decoded: number,
    encoded: string,
) => {
    test(`${decoded} → '${encoded}'`, (t) => {
        t.is(encode(decoded), encoded);
    });
    test(`'${encoded}' → ${decoded}`, (t) => {
        t.is(decode(encoded), decoded);
    });
};

testEncodeAndDecode(0, '0');
testEncodeAndDecode(1, '1');
testEncodeAndDecode(10, 'a');
testEncodeAndDecode(36, 'A');
testEncodeAndDecode(613837288, 'ABCDE');
const now = Date.now();
testEncodeAndDecode(now, encode(now));
testEncodeAndDecode(Number.MAX_SAFE_INTEGER, 'v++++++++');
