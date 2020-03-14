import {createElement, Fragment} from 'react';
import {useSelector} from 'react-redux';
import {selectMessageList} from '../../core/Message/selector';
import {MessageEditor} from '../MessageEditor';

export const MessageList = () => {
    const messageList = useSelector(selectMessageList);
    return createElement(
        Fragment,
        null,
        ...messageList.map((id) => createElement(MessageEditor, {id})),
    );
};
