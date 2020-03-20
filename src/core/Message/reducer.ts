import {combineReducers} from 'redux';
import {listReducer} from './listReducer';
import {mapReducer} from './mapReducer';

export const reducer = combineReducers({
    list: listReducer,
    map: mapReducer,
});
