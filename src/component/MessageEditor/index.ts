import {createElement, ReactElement} from 'react';
import {classnames} from '../../util/classnames';
import {MessageId} from '../../types';
import {MessagePreview} from '../MessagePreview';
import {useSelector} from 'react-redux';
import {MessageControl} from '../MessageControl';
import className from './style.css';
import {MessageTextEditor} from '../MessageTextEditor';
import {selectCurrentMessageIdList} from '../../core/selector';
import {MessageTextTool} from '../MessageTextTool';

export const MessageEditor = ({id}: {id: MessageId}): ReactElement => {
    const activeMessageIdList = useSelector(selectCurrentMessageIdList);
    return createElement(
        'div',
        {
            id: `Editor-${id}`,
            className: classnames(
                className.container,
                activeMessageIdList.includes(id) && className.current,
            ),
        },
        createElement(MessagePreview, {id}),
        createElement(MessageControl, {id}),
        createElement(MessageTextEditor, {id, className: className.text}),
        createElement(MessageTextTool, {id}),
    );
};
