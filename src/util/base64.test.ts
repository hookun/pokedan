import test from 'ava';
import {Base64} from './base64';

test('Empty', (t) => {
    const source = new Uint8Array([]);
    const expected = '';
    t.is(Base64.encode(source.buffer), expected);
    t.deepEqual(
        new Uint8Array(Base64.decode(expected)),
        source,
    );
});

test('00', (t) => {
    const source = new Uint8Array([0]);
    const expected = 'AA==';
    t.is(Base64.encode(source.buffer), expected);
    t.deepEqual(
        new Uint8Array(Base64.decode(expected)),
        source,
    );
});

test('00 01', (t) => {
    const source = new Uint8Array([0, 1]);
    const expected = 'AAE=';
    t.is(Base64.encode(source.buffer), expected);
    t.deepEqual(
        new Uint8Array(Base64.decode(expected)),
        source,
    );
});

test('00 01 02', (t) => {
    const source = new Uint8Array([0, 1, 2]);
    const expected = 'AAEC';
    t.is(Base64.encode(source.buffer), expected);
    t.deepEqual(
        new Uint8Array(Base64.decode(expected)),
        source,
    );
});
