import {combineReducers, applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import {restart} from './action';
import {reducer as MessageReducer} from './Message/reducer';
import {reducer as PlayerReducer} from './Player/reducer';
import {reducer as MessageRangeReducer} from './MessageRange/reducer';
import {list as listPlayerSagas} from './Player/saga';
import {list as storageSagas} from './storageSaga';

export const setup = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combineReducers({
            Message: MessageReducer,
            Player: PlayerReducer,
            MessageRange: MessageRangeReducer,
        }),
        applyMiddleware(sagaMiddleware),
    );
    sagaMiddleware.run((function* () {
        yield all([
            ...storageSagas(),
            ...listPlayerSagas(),
        ]);
    }));
    store.dispatch(restart());
    return store;
};
