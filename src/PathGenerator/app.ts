import {createElement} from 'react';
import {render} from 'react-dom';
import {AppError} from '../util/AppError';
import {Application} from './components/Application';
import className from './components/Application/style.css';

const targetElement = document.querySelector('#PathGenerator');
if (!targetElement) {
    throw new AppError('NoElement', 'No #PathGenerator found');
}
const appElement = document.createElement('div');
appElement.classList.add(className.app);
targetElement.replaceWith(appElement);
render(createElement(Application), appElement);
