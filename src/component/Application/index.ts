import {createElement, Fragment, ReactElement} from 'react';
import {PlayerDisplay} from '../PlayerDisplay';
import {PlayerControl} from '../PlayerControl';
import {selectMessageList} from '../../core/Message/selector';
import {useSelector} from 'react-redux';
import {MessageEditor} from '../MessageEditor';

export const Application = (): ReactElement => {
    const messageList = useSelector(selectMessageList);
    return createElement(
        Fragment,
        null,
        createElement('h2', null, 'メッセージを再生'),
        createElement(PlayerDisplay),
        createElement('h2', null, '画面の設定'),
        createElement(PlayerControl),
        createElement('h2', null, 'メッセージを編集'),
        ...messageList.map((id) => createElement(MessageEditor, {id})),
    );
};
