import {combineReducers, applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import {restart} from './action';
import {reducer as MessageListReducer} from './MessageList/reducer';
import {reducer as PlayerReducer} from './Player/reducer';
import {list as listPlayerSagas} from './Player/saga';

export const setup = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combineReducers({
            MessageList: MessageListReducer,
            Player: PlayerReducer,
        }),
        applyMiddleware(sagaMiddleware),
    );
    sagaMiddleware.run((function* () {
        yield all([
            ...listPlayerSagas(),
        ]);
    }));
    store.dispatch(restart());
    return store;
};
