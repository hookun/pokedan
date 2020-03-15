import {URLSafeBase64} from './base64';
import {stringToArrayBuffer} from './stringToArrayBuffer';

export const stringToURLSafeBase64 = (
    source: string,
): string => URLSafeBase64.encode(stringToArrayBuffer(source));
