import {createElement, Fragment} from 'react';
import {PlayerControl} from '../PlayerControl';
import {PlayerDisplay} from '../PlayerDisplay';

export const Player = () => createElement(
    Fragment,
    null,
    createElement(PlayerDisplay),
    createElement(PlayerControl),
);
