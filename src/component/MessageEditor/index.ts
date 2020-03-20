import {createElement, ReactElement} from 'react';
import {classnames} from '@hookun/util/classnames';
import {MessageId} from '../../types';
import {MessagePreview} from '../MessagePreview';
import {useSelector} from 'react-redux';
import {MessageControl} from '../MessageControl';
import {MessageTextEditor} from '../MessageTextEditor';
import {selectCurrentMessageIdList} from '../../core/selector';
import {MessageTextTool} from '../MessageTextTool';
import className from './style.css';

export const MessageEditor = ({id}: {id: MessageId}): ReactElement => {
    const activeMessageIdList = useSelector(selectCurrentMessageIdList);
    const active = activeMessageIdList.includes(id);
    return createElement(
        'div',
        {
            id: `Editor-${id}`,
            'data-title': [
                `${id}`,
                active ? '（表示中）' : '',
            ].join(' '),
            className: classnames(
                className.container,
                active && className.current,
            ),
        },
        createElement(MessagePreview, {id}),
        createElement(MessageControl, {id}),
        createElement(MessageTextEditor, {id, className: className.text}),
        createElement(MessageTextTool, {id}),
    );
};
