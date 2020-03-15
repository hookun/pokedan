import {createBase64Tool} from './createBase64Tool';

const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const Base64 = createBase64Tool(`${s}+/`, '=');
export const URLSafeBase64 = createBase64Tool(`${s}-_`, '$');
