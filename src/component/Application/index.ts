import {createElement, Fragment} from 'react';
import {MessageList} from '../MessageList';
import {PlayerDisplay} from '../PlayerDisplay';
import {PlayerControl} from '../PlayerControl';

export const Application = () => createElement(
    Fragment,
    null,
    createElement('h2', null, 'メッセージを再生'),
    createElement(PlayerDisplay),
    createElement(PlayerControl),
    createElement('h2', null, 'メッセージを編集'),
    createElement(MessageList),
);
