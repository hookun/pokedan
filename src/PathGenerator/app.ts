import {createElement, useReducer} from 'react';
import {render} from 'react-dom';
import {AppError} from '../util/AppError';
import {createInitialState, StateContext} from './core';
import {pathGeneratorReducer} from './reducer';
import {Application} from './component/Application';
import {SideEffects} from './SideEffect';
import className from './style.css';

createInitialState()
.then((initialState) => {
    const targetElement = document.querySelector('#PathGenerator');
    if (!targetElement) {
        throw new AppError('NoElement', 'No #PathGenerator found');
    }
    const appElement = document.createElement('div');
    appElement.classList.add(className.app);
    targetElement.replaceWith(appElement);
    render(createElement(() => createElement(
        StateContext.Provider,
        {value: useReducer(pathGeneratorReducer, initialState)},
        createElement(Application),
        createElement(SideEffects),
    )), appElement);
})
.catch(console.error);
