import {createCounter} from '@hookun/util/createCounter';

const count = createCounter();
const SessionId = Date.now().toString(34);
export const generateId = <Type extends string = string>(): Type => `${SessionId}-${count().toString(34)}` as Type;
