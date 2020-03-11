import {createElement, Fragment} from 'react';
import {Player} from '../Player';
import {MessageList} from '../MessageList';

export const Application = () => createElement(
    Fragment,
    null,
    createElement('h2', null, 'メッセージを再生'),
    createElement(Player),
    createElement('h2', null, 'メッセージを編集'),
    createElement(MessageList),
);
