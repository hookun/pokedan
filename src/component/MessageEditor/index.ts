import {createElement} from 'react';
import {classnames} from '../../util/classnames';
import {MessageId} from '../../types';
import {MessagePreview} from '../MessagePreview';
import {useSelector} from 'react-redux';
import {MessageControl} from '../MessageControl';
import className from './style.css';
import {MessageTextEditor} from '../MessageTextEditor';
import {selectCurrentMessageIdList} from '../../core/selector';

export const MessageEditor = ({id}: {id: MessageId}) => {
    const activeMessageIdList = useSelector(selectCurrentMessageIdList);
    return createElement(
        'div',
        {
            className: classnames(
                className.container,
                activeMessageIdList.includes(id) && className.current,
            ),
        },
        createElement(MessagePreview, {id}),
        createElement(MessageControl, {id}),
        createElement(MessageTextEditor, {
            id,
            className: className.text,
        }),
    );
};
