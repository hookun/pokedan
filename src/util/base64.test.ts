import test from 'ava';
import {base64} from './base64';

test('Empty', (t) => {
    const source = new Uint8Array([]);
    const expected = '';
    t.is(base64.encode(source.buffer), expected);
    t.deepEqual(
        new Uint8Array(base64.decode(expected)),
        source,
    );
});

test('00', (t) => {
    const source = new Uint8Array([0]);
    const expected = 'AA==';
    t.is(base64.encode(source.buffer), expected);
    t.deepEqual(
        new Uint8Array(base64.decode(expected)),
        source,
    );
});

test('00 01', (t) => {
    const source = new Uint8Array([0, 1]);
    const expected = 'AAE=';
    t.is(base64.encode(source.buffer), expected);
    t.deepEqual(
        new Uint8Array(base64.decode(expected)),
        source,
    );
});

test('00 01 02', (t) => {
    const source = new Uint8Array([0, 1, 2]);
    const expected = 'AAEC';
    t.is(base64.encode(source.buffer), expected);
    t.deepEqual(
        new Uint8Array(base64.decode(expected)),
        source,
    );
});
