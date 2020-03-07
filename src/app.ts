import {createElement} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {setup} from './core/setup';
import {Application} from './component/Application';

let applicationContainerElement = document.querySelector('#App');
if (!applicationContainerElement) {
    applicationContainerElement = document.createElement('div');
    document.body.append(applicationContainerElement);
}

render(
    createElement(
        Provider,
        {store: setup()},
        createElement(Application),
    ),
    applicationContainerElement,
);
